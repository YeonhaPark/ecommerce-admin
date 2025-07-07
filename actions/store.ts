"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { StoreSchema } from "@/schemas";

export type FormValues = z.infer<typeof StoreSchema>;

export type State = {
  success?: boolean;
  message?: string;
  errors?: z.ZodIssue[];
} | null;

export async function createStore(
  prevState: State,
  formData: FormData
): Promise<State> {
  try {
    // FormData에서 값 추출
    const rawData = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
    };

    console.log({ rawData });

    // 스키마 검증
    const validatedData = StoreSchema.parse(rawData);

    // 여기서 실제 데이터베이스 저장 로직을 구현
    // 예시: await db.store.create({ data: validatedData });

    console.log("Creating store:", validatedData);

    // TODO: 실제 데이터베이스에 저장하는 로직 추가
    // 임시로 시뮬레이션
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // 관련 페이지 재검증
    revalidatePath("/");

    return { success: true, message: "Store created successfully!" };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: "Validation failed",
        errors: error.errors,
      };
    }

    console.error("Error creating store:", error);
    return {
      success: false,
      message: "Failed to create store. Please try again.",
    };
  }
}
