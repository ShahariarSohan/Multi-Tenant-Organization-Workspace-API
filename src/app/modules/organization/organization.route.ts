import express from "express";
import { OrganizationController } from "./organization.controller";

import { validateRequest } from "../../middlewares/validateRequest";

import { UserRole } from "../../interfaces/userRole";
import authGuard from "../../middlewares/authGuard";
import { createOrganizationSchema } from "./organization.validation";

const router = express.Router();

router.post(
  "/",
  authGuard(UserRole.SUPER_ADMIN),
  validateRequest(createOrganizationSchema),
  OrganizationController.createOrganization,
);

router.get(
  "/",
  authGuard(UserRole.SUPER_ADMIN),
  OrganizationController.getAllOrganizations,
);

export const OrganizationRoutes = router;
