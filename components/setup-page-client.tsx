"use client";

import { useStoreModal } from "@/hooks/use-store-modal";
import { useEffect } from "react";

export function SetupPageClient() {
  const { onOpen } = useStoreModal();

  useEffect(() => {
    // 컴포넌트가 마운트되면 즉시 모달 열기
    onOpen();
  }, [onOpen]);

  return null; // UI를 렌더링하지 않고 모달만 트리거
}
