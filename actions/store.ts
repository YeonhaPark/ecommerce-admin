"use server";

import { z } from "zod";
import { StoreSchema } from "@/schemas";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export type FormValues = z.infer<typeof StoreSchema>;

export type State = {
  success?: boolean;
  message?: string;
  errors?: z.ZodIssue[];
  store?: {
    id: string;
    name: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
  };
} | null;

export async function storeAction(
  _: State,
  formData: FormData
): Promise<State> {
  try {
    const values = {
      name: formData.get("name"),
    };

    const parsed = StoreSchema.safeParse(values);
    if (!parsed.success) {
      return {
        success: false,
        errors: parsed.error.errors,
        message: "Validation failed",
      };
    }

    const { userId } = await auth();
    if (!userId) {
      return { success: false, message: "Unauthorized" };
    }

    const store = await db.store.create({
      data: {
        name: values.name as string,
        userId,
      },
    });

    return { success: true, store, message: "Store created successfully!" };
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
