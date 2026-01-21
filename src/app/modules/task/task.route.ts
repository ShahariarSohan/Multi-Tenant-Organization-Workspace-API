import { Router } from "express";
import { TaskController } from "./task.controller";
import { validateRequest } from "../../middlewares/validateRequest";

import authGuard from "../../middlewares/authGuard";
import { UserRole } from "../../interfaces/userRole";
import { createTaskZodSchema, updateTaskZodSchema } from "./task.validataion";


const router = Router();

router.post(
  "/",
  authGuard(UserRole.ORG_ADMIN),
  validateRequest(createTaskZodSchema),
  TaskController.createTask,
);
router.get(
  "/assigned-tasks",
  authGuard(UserRole.ORG_ADMIN),
  TaskController.getAssignedTasks,
);
router.get(
  "/my-tasks",
  authGuard(UserRole.ORG_MEMBER),
  TaskController.getMyTasks,
);
router.patch(
  "/:taskId",
  authGuard(UserRole.ORG_ADMIN),
  validateRequest(updateTaskZodSchema),
  TaskController.updateTask,
);
router.delete(
  "/:taskId",
  authGuard(UserRole.ORG_ADMIN),
  TaskController.deleteTask,
);

export const TaskRoutes=router;
