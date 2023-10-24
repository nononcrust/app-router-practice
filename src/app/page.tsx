import { Button } from "@/components/ui/button";
import { ROUTE } from "@/constants/route";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center gap-4">
      <Button asChild>
        <Link href={ROUTE.POST.LIST}>게시글 목록</Link>
      </Button>
    </main>
  );
}
