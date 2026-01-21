import bcrypt from "bcrypt";
import { prisma } from "../config/prisma";
import { envVariables } from "../config/env";
import { UserRole } from "../interfaces/userRole";

const seedSuperAdmin = async () => {
  try {
   
    const isSuperAdminExist = await prisma.user.findFirst({
      where: {
        role: UserRole.SUPER_ADMIN, 
      },
    });

    if (isSuperAdminExist) {
      console.log("Super Admin already exists!");
      return;
    }

  
    const hashedPassword = await bcrypt.hash(
      envVariables.SUPER_ADMIN_PASSWORD as string,
      Number(envVariables.BCRYPT_SALT_ROUND) || 10,
    );

   
    const superAdmin = await prisma.user.create({
      data: {
        name: envVariables.SUPER_ADMIN_NAME as string,
        email: envVariables.SUPER_ADMIN_EMAIL as string,
        password: hashedPassword,
        role: UserRole.SUPER_ADMIN, 
        organizationId: null, 
      },
    });

    console.log("Super Admin Created Successfully!", superAdmin);
  } catch (err) {
    console.error("Error seeding Super Admin:", err);
  } finally {
    await prisma.$disconnect();
  }
};

export default seedSuperAdmin;
