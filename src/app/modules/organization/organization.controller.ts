import { Request, Response } from "express";
import httpStatus from "http-status";
import sendResponse from "../../shared/sendResponse";
import { OrganizationService } from "./organization.service";


const createOrganization = async (req: Request, res: Response) => {
  const result = await OrganizationService.createOrganization(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Organization created successfully",
    data: result,
  });
};

const getAllOrganizations = async (_req: Request, res: Response) => {
  const result = await OrganizationService.getAllOrganizations();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Organizations retrieved successfully",
    data: result,
  });
};

export const OrganizationController = {
  createOrganization,
  getAllOrganizations,
};
