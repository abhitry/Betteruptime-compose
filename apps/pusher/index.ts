import { prismaClient } from "store/client";
import { xAddBulk } from "redisstream/client";

console.log("Starting Pusher service...");

async function main() {
  try {
    console.log("Fetching websites to monitor...");
    
    const websites = await prismaClient.website.findMany({
      select: {
        url: true,
        id: true,
      },
    });

    console.log(`Found ${websites.length} websites to monitor`);

    if (websites.length > 0) {
      await xAddBulk(
        websites.map((w) => ({
          url: w.url,
          id: w.id,
        }))
      );
      console.log(`Queued ${websites.length} monitoring jobs`);
    }
  } catch (error) {
    console.error("Error in pusher main function:", error);
  }
}

// Run immediately
main();

// Then run every 30 seconds
setInterval(() => {
  main();
}, 30 * 1000);

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('Received SIGTERM, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('Received SIGINT, shutting down gracefully');
  process.exit(0);
});