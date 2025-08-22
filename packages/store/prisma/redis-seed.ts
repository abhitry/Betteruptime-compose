import { createClient } from "redis";

const client = createClient({ url: "redis://redis:6379" });

async function seed() {
  await client.connect();
  await client.xGroupCreate("betteruptime:website", "f5a13f6c-8e91-42b8-9c0e-07b4567a98e0", "$", { MKSTREAM: true });
  await client.xGroupCreate("betteruptime:website", "32c9087b-7c53-4d84-8b63-32517cbd17c3", "$", { MKSTREAM: true });
  console.log("✅ Redis Groups Created");
  await client.quit();
}
seed().catch(console.error);