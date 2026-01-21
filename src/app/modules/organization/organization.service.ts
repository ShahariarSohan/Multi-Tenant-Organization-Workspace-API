import { prisma } from "../../config/prisma";

const createOrganization = async (payload: { name: string }) => {
  return prisma.organization.create({
    data: payload,
  });
};

const getAllOrganizations = async () => {
  return prisma.organization.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const OrganizationService = {
  createOrganization,
  getAllOrganizations,
};
