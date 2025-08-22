import { createClient } from "redis";

const STREAM_NAME = "betteruptime:website";
const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

let client: any = null;

async function getClient() {
  if (!client) {
    client = createClient({ url: REDIS_URL });
    client.on("error", (err: any) => console.log("Redis Client Error", err));
    await client.connect();
  }
  return client;
}

type WebsiteEvent = { url: string; id: string };
type MessageType = {
  id: string;
  message: {
    url: string;
    id: string;
  };
};

async function xAdd({ url, id }: WebsiteEvent) {
  const redisClient = await getClient();
  await redisClient.xAdd(STREAM_NAME, "*", {
    url,
    id,
  });
}

export async function xAddBulk(websites: WebsiteEvent[]) {
  if (websites.length === 0) return;
  
  for (let i = 0; i < websites.length; i++) {
    await xAdd({
      url: websites[i].url,
      id: websites[i].id,
    });
  }
}

export async function xReadGroup(
  consumerGroup: string,
  workerId: string
): Promise<MessageType[] | undefined> {
  const redisClient = await getClient();
  
  try {
    const res = await redisClient.xReadGroup(
      consumerGroup,
      workerId,
      [
        {
          key: STREAM_NAME,
          id: ">",
        },
      ],
      {
        COUNT: 10,
        BLOCK: 5000,
      }
    );

    if (!res || res.length === 0) {
      return undefined;
    }

    const messages: MessageType[] = res[0]?.messages || [];
    return messages;
  } catch (error) {
    console.error("Error reading from Redis stream:", error);
    return undefined;
  }
}

async function xAck(consumerGroup: string, eventId: string) {
  const redisClient = await getClient();
  await redisClient.xAck(STREAM_NAME, consumerGroup, eventId);
}

export async function xAckBulk(consumerGroup: string, eventIds: string[]) {
  if (eventIds.length === 0) return;
  
  for (const eventId of eventIds) {
    await xAck(consumerGroup, eventId);
  }
}