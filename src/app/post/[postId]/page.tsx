import { PostDetail } from "@/components/post-detail";
import { ROUTE } from "@/constants/route";
import { PostDetailFetcher } from "@/features/post";
import { redirect } from "next/navigation";

interface PostDetailPageProps {
  params: { postId: string };
}

export default function PostDetailPage({ params }: PostDetailPageProps) {
  return (
    <main className="container flex min-h-screen items-center justify-center">
      <PostDetailFetcher postId={Number(params.postId)} fallback={<Redirect />}>
        <PostDetail />
      </PostDetailFetcher>
    </main>
  );
}

const Redirect = () => {
  return redirect(ROUTE.POST.LIST);
};
