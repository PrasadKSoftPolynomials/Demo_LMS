require("dotenv").config();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("DATABASE_URL exists:", !!process.env.DATABASE_URL);

  const columns = await prisma.$queryRawUnsafe(`
    SELECT column_name
    FROM information_schema.columns
    WHERE table_name = 'User'
    ORDER BY ordinal_position;
  `);

  console.log(columns);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });