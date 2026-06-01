import dotenv from "dotenv";
dotenv.config();
import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

async function checkUsers() {
  const url = process.env.DATABASE_URL;
  console.log("URL defined:", !!url);
  try {
    const adapter = new PrismaNeon({ connectionString: url });
    const prisma = new PrismaClient({ adapter });
    
    const count = await prisma.user.count();
    console.log(`Total users in DB: ${count}`);
    
    if (count > 0) {
      const users = await prisma.user.findMany({
        take: 5,
        select: {
          email: true,
          role: true,
        }
      });
      console.log("Existing users (max 5):");
      console.table(users);
    } else {
      console.log("No users found in database.");
    }
  } catch (error) {
    console.error("Error checking users:", error);
  } finally {
    process.exit();
  }
}

checkUsers();
