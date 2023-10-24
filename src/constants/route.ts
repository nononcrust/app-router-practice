export const ROUTE = {
  POST: {
    LIST: "/post",
    DETAIL: (postId: number) => `/post/${postId}`,
  },
  TODO: {
    LIST: "/todo",
    DETAIL: (todoId: number) => `/todo/${todoId}`,
  },
};
