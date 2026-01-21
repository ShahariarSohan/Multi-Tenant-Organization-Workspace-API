import { z } from "zod";

export const createTaskZodSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  projectId: z.uuid("Project ID must be valid UUID"),
  assignedToId: z
    .uuid("Assigned user ID must be valid UUID")
    .optional(),
  status: z.enum(["PENDING", "IN_PROGRESS", "DONE"]).optional(),
});

export const updateTaskZodSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  assignedToId: z.uuid().optional(),
  status: z.enum(["PENDING", "IN_PROGRESS", "DONE"]).optional(),
});
