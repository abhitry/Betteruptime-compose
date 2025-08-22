import { xAckBulk, xReadGroup } from "redisstream/client";
import axios from "axios";
import { prismaClient } from "store/client";

const REGION_ID = process.env.REGION_ID!;
const WORKER_ID = process.env.WORKER_ID!;

if (!REGION_ID) throw new Error("REGION_ID environment variable not provided");
if (!WORKER_ID) throw new Error("WORKER_ID environment variable not provided");

console.log(`Starting worker with REGION_ID: ${REGION_ID}, WORKER_ID: ${WORKER_ID}`);

async function main() {
  console.log("Worker started, waiting for messages...");
  
  while (true) {
    try {
      // Read from the stream
      const response = await xReadGroup(REGION_ID, WORKER_ID);
      
      if (!response || response.length === 0) {
        continue;
      }

      console.log(`Processing ${response.length} messages`);

      // Process websites in parallel
      const promises = response.map(({ message }) =>
        fetchWebsite(message.url, message.id)
      );
      
      await Promise.all(promises);

      // Acknowledge processed messages
      await xAckBulk(
        REGION_ID,
        response.map(({ id }) => id)
      );
      
      console.log(`Processed and acknowledged ${response.length} messages`);
    } catch (error) {
      console.error("Error in main worker loop:", error);
      // Wait a bit before retrying
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
}

async function fetchWebsite(url: string, websiteId: string): Promise<void> {
  return new Promise<void>((resolve) => {
    const startTime = Date.now();
    
    // Set a timeout for the request
    const timeout = setTimeout(() => {
      console.log(`Timeout for ${url}`);
      recordResult(websiteId, Date.now() - startTime, "Down");
      resolve();
    }, 30000); // 30 second timeout

    axios
      .get(url, {
        timeout: 25000, // 25 second axios timeout
        headers: {
          'User-Agent': 'UpGuard-Monitor/1.0'
        }
      })
      .then(async (response) => {
        clearTimeout(timeout);
        const endTime = Date.now();
        const responseTime = endTime - startTime;
        
        console.log(`✅ ${url} - ${response.status} - ${responseTime}ms`);
        await recordResult(websiteId, responseTime, "Up");
        resolve();
      })
      .catch(async (error) => {
        clearTimeout(timeout);
        const endTime = Date.now();
        const responseTime = endTime - startTime;
        
        console.log(`❌ ${url} - Error: ${error.message} - ${responseTime}ms`);
        await recordResult(websiteId, responseTime, "Down");
        resolve();
      });
  });
}

async function recordResult(websiteId: string, responseTime: number, status: "Up" | "Down") {
  try {
    await prismaClient.websiteTick.create({
      data: {
        response_time_ms: responseTime,
        status: status,
        region_id: REGION_ID,
        website_id: websiteId,
      },
    });
  } catch (error) {
    console.error(`Error recording result for website ${websiteId}:`, error);
  }
}

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('Received SIGTERM, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('Received SIGINT, shutting down gracefully');
  process.exit(0);
});

main().catch((error) => {
  console.error("Fatal error in worker:", error);
  process.exit(1);
});