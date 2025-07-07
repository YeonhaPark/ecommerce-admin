import { StoreSchema } from "@/schemas";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { userId } = await auth();

    const formData = await request.formData();
    const rawData = {
      name: formData.get("name") as string,
    };

    // 스키마 검증
    const validatedData = StoreSchema.parse(rawData);

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
  } catch (error) {
    console.log("[STORES_POST]", error);
    return new NextResponse("internal server error", {
      status: 500,
    });
  }
}
