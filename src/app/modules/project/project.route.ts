import { Router } from "express";
import { ProjectController } from "./project.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { createProjectSchema, updateProjectSchema } from "./project.validation";
import authGuard from "../../middlewares/authGuard";
import { UserRole } from "../../interfaces/userRole";


const router = Router();

router.post(
  "/",
  authGuard(UserRole.ORG_ADMIN),
  validateRequest(createProjectSchema),
  ProjectController.createProject,
);
router.get(
  "/my-organization",
  authGuard(UserRole.ORG_ADMIN),
  ProjectController.getMyOrganizationProjects,
);
router.patch(
  "/:projectId",
  authGuard(UserRole.ORG_ADMIN),
  validateRequest(updateProjectSchema),
  ProjectController.updateProject,
);
router.delete(
  "/:projectId",
  authGuard(UserRole.ORG_ADMIN),
  ProjectController.deleteProject,
);

export const ProjectRoutes=router;
