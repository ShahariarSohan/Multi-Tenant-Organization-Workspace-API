import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import sendResponse from "../../shared/sendResponse";
import { ProjectService } from "./project.service";
import { JwtPayload } from "jsonwebtoken";

const createProject = async (req: Request & { user?: JwtPayload}, res: Response) => {
  const result = await ProjectService.createProject(req.body, req.user as JwtPayload);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Project created successfully",
    data: result,
  });
};

const getMyOrganizationProjects = async (
  req: Request & { user?: JwtPayload},
  res: Response,
) => {
  const result = await ProjectService.getMyOrganizationProjects(req.user as JwtPayload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Projects retrieved successfully",
    data: result,
  });
};

const updateProject = async (req: Request & { user?: JwtPayload}, res: Response) => {
  const result = await ProjectService.updateProject(
    req.params.projectId,
    req.body,
    req.user as JwtPayload,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Project updated successfully",
    data: result,
  });
};

const deleteProject = async (req: Request & { user?: JwtPayload}, res: Response) => {
  const result = await ProjectService.deleteProject(
    req.params.projectId,
    req.user as JwtPayload,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Project deleted successfully",
    data: result,
  });
};

export const ProjectController = {
  createProject,
  getMyOrganizationProjects,
  updateProject,
  deleteProject,
};
