import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import sendResponse from "../../shared/sendResponse";
import { TaskService } from "./task.service";
import { JwtPayload } from "jsonwebtoken";

const createTask = async (req: Request & { user?:JwtPayload }, res: Response) => {
  const result = await TaskService.createTask(req.body, req.user as JwtPayload);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Task created successfully",
    data: result,
  });
};

const getAssignedTasks = async (
  req: Request & { user?: JwtPayload },
  res: Response,
) => {
  const result = await TaskService.getAssignedTasks(req.user as JwtPayload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Tasks retrieved successfully",
    data: result,
  });
};

const getMyTasks = async (req: Request & { user?: JwtPayload }, res: Response) => {
  const result = await TaskService.getMyTasks(req.user as JwtPayload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "My tasks retrieved successfully",
    data: result,
  });
};

const updateTask = async (req: Request & { user?:JwtPayload }, res: Response) => {
  const result = await TaskService.updateTask(
    req.params.taskId,
    req.body,
    req.user as JwtPayload,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Task updated successfully",
    data: result,
  });
};

const deleteTask = async (req: Request & { user?: JwtPayload }, res: Response) => {
  const result = await TaskService.deleteTask(req.params.taskId, req.user as JwtPayload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Task deleted successfully",
    data: result,
  });
};

export const TaskController = {
  createTask,
  getAssignedTasks,
  getMyTasks,
  updateTask,
  deleteTask,
};
