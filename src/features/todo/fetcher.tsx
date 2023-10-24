import { HydrationBoundary } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { prefetchTodoDetail, prefetchTodoList } from "./query";

export const TodoListFetcher = async ({ children }: PropsWithChildren) => {
  const { dehydratedState } = await prefetchTodoList();

  return <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>;
};

interface TodoDetailFetcherProps {
  todoId: number;
  children: React.ReactNode;
}

export const TodoDetailFetcher = async ({ todoId, children }: TodoDetailFetcherProps) => {
  const { dehydratedState } = await prefetchTodoDetail(todoId);

  return <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>;
};
