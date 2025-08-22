import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting database seeding...");

  // Insert regions
  try {
    await prisma.region.createMany({
      data: [
        { id: "32c9087b-7c53-4d84-8b63-32517cbd17c3", name: "india" },
        { id: "f5a13f6c-8e91-42b8-9c0e-07b4567a98e0", name: "usa" }
      ],
      skipDuplicates: true
    });
    console.log("✅ Regions seeded successfully");
  } catch (error) {
    console.error("❌ Error seeding regions:", error);
    throw error;
  }
}

main()
  .then(() => {
    console.log("✅ Database seeding completed successfully");
  })
  .catch((e) => {
    console.error("❌ Database seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });