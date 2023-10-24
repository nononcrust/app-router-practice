import { z } from "zod";
import { todoListSchema, todoSchema } from "./schema";

export type Todo = z.infer<typeof todoSchema>;

export type TodoList = z.infer<typeof todoListSchema>;
