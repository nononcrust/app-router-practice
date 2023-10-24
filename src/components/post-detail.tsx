"use client";

import { ROUTE } from "@/constants/route";
import { useDeletePost, usePost, useUpdatePost } from "@/features/post";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Button } from "./ui/button";

const DUMMY_UPDATE_BODY = {
  title: "수정된 게시글",
  body: "수정된 게시글 내용",
  userId: 1,
};

export const PostDetail = () => {
  const params = useParams<{ postId: string }>();

  const router = useRouter();

  const { data } = usePost(Number(params.postId));

  const updatePostMutation = useUpdatePost();

  const deletePostMutation = useDeletePost();

  const onUpdateButtonClick = () => {
    updatePostMutation.mutate(
      {
        postId: Number(params.postId),
        body: DUMMY_UPDATE_BODY,
      },
      { onSuccess: () => router.push(ROUTE.POST.LIST) },
    );
  };

  const onDeleteButtonClick = () => {
    deletePostMutation.mutate(Number(params.postId), {
      onSuccess: () => router.replace(ROUTE.POST.LIST),
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <p>{data?.title}</p>
      <div className="flex justify-center gap-4">
        <Button variant="destructive" onClick={onDeleteButtonClick}>
          삭제
        </Button>
        <Button onClick={onUpdateButtonClick}>수정</Button>
        <Button variant="secondary" asChild>
          <Link href={ROUTE.POST.LIST}>목록으로</Link>
        </Button>
      </div>
    </div>
  );
};
