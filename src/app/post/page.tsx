import { PostList } from "@/components/post-list";
import { PostListFetcher } from "@/features/post";

export default function PostListPage() {
  return (
    <main className="container min-h-screen">
      <PostListFetcher>
        <PostList />
      </PostListFetcher>
    </main>
  );
}
