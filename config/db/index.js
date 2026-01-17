import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import * as Prisma from "@prisma/client";
import { DATABASE_URL } from "../env/index.js";

const { PrismaClient } = Prisma;

const pool = new Pool({
  connectionString: DATABASE_URL, 
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({
  adapter,
  log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
});

const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("DB Connected via Prisma (adapter-pg)");
  } catch (error) {
    console.log("Database connection error: " + error.message);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  try {
    await prisma.$disconnect();
  } catch (error) {
    console.error("Error disconnecting Prisma:", error);
  }

  try {
    await pool.end();
  } catch (error) {
    console.error("Error closing pg pool:", error);
  }
};


export { prisma, connectDB, disconnectDB };
