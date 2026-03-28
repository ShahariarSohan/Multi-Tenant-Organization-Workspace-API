import { PrismaClient } from "../../generated/prisma/client";
import { envVariables } from "./env";


import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: envVariables.DATABASE_URL,
});
export const prisma = new PrismaClient({ adapter });
