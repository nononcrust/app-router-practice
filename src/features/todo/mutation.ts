import { useMutation, useQueryClient } from "@tanstack/react-query";
import { todoApi } from "./api";
import { queryKeys } from "./query";

export const useCreateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: todoApi.createTodo,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: queryKeys.all(),
      }),
  });
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: todoApi.updateTodoById,
    onSuccess: (data, variables) =>
      queryClient.setQueryData([queryKeys.list(), { id: variables.todoId }], data),
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: todoApi.deleteTodoById,
    onSuccess: () => queryClient.invalidateQueries(),
  });
};
