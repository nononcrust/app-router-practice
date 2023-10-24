import { api } from "@/configs/axios";
import { todoListSchema, todoSchema } from "./schema";
import { Todo } from "./type";

export const ENDPOINT = "/todos";

export const todoApi = {
  getTodoList: async () => {
    const response = await api.get(ENDPOINT);
    return todoListSchema.parse(response.data);
  },
  getTodoById: async (todoId: number) => {
    const response = await api.get(`${ENDPOINT}/${todoId}`);
    return todoSchema.parse(response.data);
  },
  createTodo: async (body: Todo) => {
    const response = await api.post(ENDPOINT, body);
    return todoSchema.parse(response.data);
  },
  updateTodoById: async (data: { todoId: number; body: Partial<Todo> }) => {
    const response = await api.put(`${ENDPOINT}/${data.todoId}`, data.body);
    return todoSchema.parse(response.data);
  },
  deleteTodoById: async (todoId: number) => {
    const response = await api.delete(`${ENDPOINT}/${todoId}`);
    return todoSchema.parse(response.data);
  },
};
