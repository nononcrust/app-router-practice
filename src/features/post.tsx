import { api } from "@/configs/axios";
import { getQueryClient } from "@/lib/react-query";
import {
  HydrationBoundary,
  dehydrate,
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { z } from "zod";

const ENDPOINT = "/posts";

export const postApi = {
  getPostList: async () => {
    const response = await api.get<PostList>(ENDPOINT);
    return postListSchema.parse(response.data);
  },
  getPostById: async (postId: number) => {
    const response = await api.get<Post>(`${ENDPOINT}/${postId}`);
    return postSchema.parse(response.data);
  },
  createPost: async (body: PostBody) => {
    const response = await api.post<Post>(ENDPOINT, body);
    return postSchema.parse(response.data);
  },
  updatePostById: async (data: { postId: number; body: Partial<Post> }) => {
    const response = await api.put<Post>(`${ENDPOINT}/${data.postId}`, data.body);
    return postSchema.parse(response.data);
  },
  deletePostById: async (postId: number) => {
    const response = await api.delete<Post>(`${ENDPOINT}/${postId}`);
    return response.data;
  },
};

// https://tkdodo.eu/blog/effective-react-query-keys#use-query-key-factories
export const queryKeys = {
  all: () => [ENDPOINT] as const,
  list: () => [ENDPOINT, "list"] as const,
  detail: (postId?: number) => [ENDPOINT, "detail", postId] as const,
};

export const usePostList = () => {
  return useSuspenseQuery({
    queryKey: queryKeys.list(),
    queryFn: postApi.getPostList,
  });
};

export const usePost = (postId?: number) => {
  return useSuspenseQuery({
    queryKey: queryKeys.detail(postId),
    queryFn: () => (postId ? postApi.getPostById(postId) : null),
  });
};

// https://tanstack.com/query/latest/docs/react/guides/updates-from-mutation-responses
export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postApi.createPost,
    onSuccess: (data) =>
      queryClient.setQueryData(queryKeys.list(), (prev: PostList) => [...prev, data]),
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postApi.updatePostById,
    onSuccess: (data) =>
      queryClient.setQueryData(queryKeys.list(), (prev: PostList) =>
        prev.map((item) => (item.id === data.id ? data : item)),
      ),
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postApi.deletePostById,
    onSuccess: (_, variables) =>
      queryClient.setQueryData(queryKeys.list(), (prev: PostList) =>
        prev.filter((item) => item.id !== variables),
      ),
  });
};

export const prefetchPostList = async () => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: queryKeys.list(),
    queryFn: postApi.getPostList,
  });

  const dehydratedState = dehydrate(queryClient);

  return { dehydratedState };
};

export const prefetchPostDetail = async (postId: number) => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: queryKeys.detail(postId),
    queryFn: () => postApi.getPostById(postId),
  });

  const dehydratedState = dehydrate(queryClient);

  return { dehydratedState };
};

// https://tkdodo.eu/blog/type-safe-react-query#validation-in-the-queryfn
const postRequestSchema = z.object({
  title: z.string(),
  body: z.string(),
  userId: z.number(),
});

const postSchema = z.object({
  id: z.number(),
  title: z.string(),
  body: z.string(),
  userId: z.number(),
});

const postListSchema = z.array(postSchema);

type PostBody = z.infer<typeof postRequestSchema>;

type Post = z.infer<typeof postSchema>;

type PostList = z.infer<typeof postListSchema>;

// https://tanstack.com/query/latest/docs/react/guides/advanced-ssr#prefetching-and-dehydrating-data
export const PostListFetcher = async ({ children }: PropsWithChildren) => {
  const { dehydratedState } = await prefetchPostList();

  return <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>;
};

interface PostDetailFetcherProps {
  postId: number;
  children: React.ReactNode;
  fallback: React.ReactNode;
}

export const PostDetailFetcher = async ({ postId, children, fallback }: PostDetailFetcherProps) => {
  const { dehydratedState } = await prefetchPostDetail(postId);

  if (dehydratedState.queries.length === 0) {
    return <>{fallback}</>;
  }

  return <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>;
};
