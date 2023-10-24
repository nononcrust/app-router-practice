import { getQueryClient } from "@/lib/react-query";
import { dehydrate, useSuspenseQuery } from "@tanstack/react-query";
import { ENDPOINT, todoApi } from "./api";

export const queryKeys = {
  all: () => [ENDPOINT] as const,
  list: () => [ENDPOINT, "list"] as const,
  detail: (todoId?: number) => [ENDPOINT, todoId] as const,
};

export const useTodoList = () => {
  return useSuspenseQuery({
    queryKey: queryKeys.list(),
    queryFn: todoApi.getTodoList,
  });
};

export const useTodo = (todoId?: number) => {
  return useSuspenseQuery({
    queryKey: queryKeys.detail(todoId),
    queryFn: () => (todoId ? todoApi.getTodoById(todoId) : null),
  });
};

export const prefetchTodoList = async () => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: queryKeys.list(),
    queryFn: todoApi.getTodoList,
  });

  const dehydratedState = dehydrate(queryClient);

  return { dehydratedState };
};

export const prefetchTodoDetail = async (todoId: number) => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: queryKeys.detail(todoId),
    queryFn: () => todoApi.getTodoById(todoId),
  });

  const dehydratedState = dehydrate(queryClient);

  return { dehydratedState };
};
