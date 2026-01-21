import { z } from "zod";

export const createProjectSchema = z.object({
  name: z.string().min(3, "Project name is required"),
});

export const updateProjectSchema = z.object({
  name: z.string().min(3, "Project name is required").optional(),
});
