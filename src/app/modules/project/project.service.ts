

import { Project } from "@prisma/client";
import AppError from "../../errorHelpers/AppError";
import httpStatus from "http-status-codes";
import { prisma } from "../../config/prisma";
import { UserRole } from "../../interfaces/userRole";
import { JwtPayload } from "jsonwebtoken";

const createProject = async (payload: { name: string }, user: JwtPayload) => {
  if (user.role !== UserRole.ORG_ADMIN) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "Only Organization Admin can create projects",
    );
  }

  const project = await prisma.project.findFirst({
    where: {
      name: payload.name,
      organizationId: user.organizationId,
    },
  });

  if (project) {
    throw new AppError(
      httpStatus.CONFLICT,
      "Project already exists in your organization",
    );
  }

  return prisma.project.create({
    data: {
      name: payload.name,
      organizationId: user.organizationId,
    },
  });
};


const getMyOrganizationProjects = async (user:JwtPayload) => {
  if (user.role !== UserRole.ORG_ADMIN) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "Only Organization Admin can view projects",
    );
  }

  return prisma.project.findMany({
    where: { organizationId: user.organizationId },
    include: { tasks: true },
  });
};

const updateProject = async (projectId: string, payload: Partial<Project>, user:JwtPayload) => {
  const project = await prisma.project.findUnique({ where: { id: projectId } });
  if (!project || project.organizationId !== user.organizationId) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Project not found in your organization",
    );
  }

  return prisma.project.update({ where: { id: projectId }, data: payload });
};

const deleteProject = async (projectId: string, user:JwtPayload) => {
  const project = await prisma.project.findUnique({ where: { id: projectId } });
  if (!project || project.organizationId !== user.organizationId) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Project not found in your organization",
    );
  }

  await prisma.project.delete({ where: { id: projectId } });
  return null;
};

export const ProjectService = {
  createProject,
  getMyOrganizationProjects,
  updateProject,
  deleteProject,
};
