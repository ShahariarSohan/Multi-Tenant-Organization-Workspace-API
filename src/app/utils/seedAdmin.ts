import bcrypt from "bcrypt";
import { prisma } from "../config/prisma";
import { envVariables } from "../config/env";
import { UserRole } from "../interfaces/userRole";

const seedPlatformAdmin = async () => {
  try {
    const isPlatformAdminExist = await prisma.user.findFirst({
      where: {
        role: UserRole.PLATFORM_ADMIN,
      },
    });

    if (isPlatformAdminExist) {
      console.log("Platform Admin already exists!");
      return;
    }

    const hashedPassword = await bcrypt.hash(
      envVariables.PLATFORM_ADMIN_PASSWORD as string,
      Number(envVariables.BCRYPT_SALT_ROUND) || 10,
    );

    const platformAdmin = await prisma.user.create({
      data: {
        name: envVariables.PLATFORM_ADMIN_NAME as string,
        email: envVariables.PLATFORM_ADMIN_EMAIL as string,
        password: hashedPassword,
        role: UserRole.PLATFORM_ADMIN,
        organizationId: null,
      },
    });

    console.log("Platform Admin Created Successfully!", platformAdmin);
  } catch (err) {
    console.error("Error seeding Platform Admin:", err);
  } finally {
    await prisma.$disconnect();
  }
};

export default seedPlatformAdmin;
