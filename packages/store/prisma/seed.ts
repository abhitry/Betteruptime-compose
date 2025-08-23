
import 'dotenv/config';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function log(msg: string) {
  process.stdout.write(msg + "\n");
}

async function main() {
  log("🔥 Starting database seeding...");
  log("Using DB URL: " + process.env.DATABASE_URL);

  try {
    await prisma.$connect();
    log("✅ Connected to database");

    const regions = await prisma.region.createMany({
      data: [
        { id: "32c9087b-7c53-4d84-8b63-32517cbd17c3", name: "india" },
        { id: "f5a13f6c-8e91-42b8-9c0e-07b4567a98e0", name: "usa" }
      ],
      skipDuplicates: true
    });
    log(`✅ Regions seeded (${regions.count} created)`);

    const regionCount = await prisma.region.count();
    log(`✅ Total regions: ${regionCount}`);

    const allRegions = await prisma.region.findMany();
    log("✅ All regions: " + JSON.stringify(allRegions));

  } catch (err) {
    log("❌ Error seeding database: " + err);
    if (err instanceof Error) log(err.stack || "");
  } finally {
    await prisma.$disconnect();
    log("✅ Database connection closed");
  }
}

(async () => {
  await main();
})();