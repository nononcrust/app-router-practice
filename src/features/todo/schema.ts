import { z } from "zod";

export const todoSchema = z.object({
  id: z.number(),
  title: z.string(),
  completed: z.boolean(),
  userId: z.number(),
});

export const todoListSchema = z.array(todoSchema);
