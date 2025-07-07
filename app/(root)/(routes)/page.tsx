import { getStoreByUserId } from "@/data/store";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SetupPageClient } from "@/components/setup-page-client";

export default async function SetupPage() {
  // 사용자 인증 확인
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  // 사용자의 첫 번째 store 확인 (data layer에서 직접 조회)
  const store = await getStoreByUserId(userId);

  if (store) {
    // Store가 있으면 해당 store의 대시보드로 리디렉션
    redirect(`/${store.id}`);
  }

  // Store가 없으면 생성 모달을 표시하는 클라이언트 컴포넌트 렌더링
  return <SetupPageClient />;
}
