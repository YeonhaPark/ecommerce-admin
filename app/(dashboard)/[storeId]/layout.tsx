import Navbar from "@/components/navbar";
import { getStoreByUserIdAndStoreId } from "@/data/store";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const { storeId } = await params;
  // 사용자 인증 확인
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const store = await getStoreByUserIdAndStoreId(userId, storeId);

  if (!store) {
    redirect("/");
  }
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
