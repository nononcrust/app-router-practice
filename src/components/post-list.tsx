"use client";

import { ROUTE } from "@/constants/route";
import { useCreatePost, usePostList } from "@/features/post";
import Link from "next/link";
import { Button } from "./ui/button";

const DUMMY_POST_BODY = {
  title: "새로운 게시글",
  body: "새로운 게시글 내용",
  userId: 1,
};

export const PostList = () => {
  const { data } = usePostList();

  const { mutate, isPending } = useCreatePost();

  const onCreateButtonClick = () => {
    mutate(DUMMY_POST_BODY);
  };

  return (
    <div className="mt-12 flex flex-col gap-2">
      <div className="flex">
        <Button className="mb-8" onClick={onCreateButtonClick} disabled={isPending}>
          추가하기
        </Button>
      </div>
      {data.map((item, index) => (
        <Link href={ROUTE.POST.DETAIL(item.id)} key={index}>
          {item.title}
        </Link>
      ))}
    </div>
  );
};
