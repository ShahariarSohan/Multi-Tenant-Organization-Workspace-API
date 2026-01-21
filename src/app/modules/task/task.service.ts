

import { Task } from "@prisma/client";
import AppError from "../../errorHelpers/AppError";
import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { UserRole } from "../../interfaces/userRole";
import { prisma } from "../../config/prisma";

const createTask = async (payload: Task, creator: JwtPayload) => {
  if (creator.role !== UserRole.ORG_ADMIN) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "Only Organization Admin can create tasks",
    );
  }

  const project = await prisma.project.findUnique({
    where: { id: payload.projectId },
  });
  if (!project) throw new AppError(httpStatus.NOT_FOUND, "Project not found");
  if (project.organizationId !== creator.organizationId) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "Cannot create tasks outside your organization",
    );
  }

  return prisma.task.create({
    data: {
      title: payload.title,
      description: payload.description,
      projectId: payload.projectId,
      assignedToId: payload.assignedToId || null,
      status: payload.status,
    },
    include: {
      project: true,
      assignedTo: true,
    },
  });
};

const getAssignedTasks = async (user: JwtPayload) => {
  if (user.role !== UserRole.ORG_ADMIN) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "Only Organization Admin can view tasks",
    );
  }

  return prisma.task.findMany({
    where: { project: { organizationId: user.organizationId } },
    include: { project: true, assignedTo: true },
  });
};

const getMyTasks = async (user: JwtPayload) => {
  if (user.role !== UserRole.ORG_MEMBER) {
    throw new AppError(httpStatus.FORBIDDEN, "Only Org Member can view tasks");
  }

  return prisma.task.findMany({
    where: {
      assignedToId: user.userId,
      project: { organizationId: user.organizationId },
    },
    include: { project: true, assignedTo: true },
  });
};

const updateTask = async (taskId: string, payload: Partial<Task>, user: JwtPayload) => {
  if (user.role !== UserRole.ORG_ADMIN) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "Only Organization Admin can update tasks",
    );
  }

  const task = await prisma.task.findUnique({
    where: { id: taskId },
    include: { project: true },
  });
  if (!task || task.project.organizationId !== user.organizationId) {
    throw new AppError(httpStatus.NOT_FOUND, "Task not found");
  }

  return prisma.task.update({
    where: { id: taskId },
    data: payload,
    include: { project: true, assignedTo: true },
  });
};

const deleteTask = async (taskId: string, user: JwtPayload) => {
  if (user.role !== UserRole.ORG_ADMIN) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "Only Organization Admin can delete tasks",
    );
  }

  const task = await prisma.task.findUnique({
    where: { id: taskId },
    include: { project: true },
  });
  if (!task || task.project.organizationId !== user.organizationId) {
    throw new AppError(httpStatus.NOT_FOUND, "Task not found");
  }

  return prisma.task.delete({
    where: { id: taskId },
    include: { project: true, assignedTo: true },
  });
};

export const TaskService = {
  createTask,
  getAssignedTasks,
  getMyTasks,
  updateTask,
  deleteTask,
};
