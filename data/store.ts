import { db } from "@/lib/db";

export const getStoreByUserId = async (userId: string) => {
  try {
    const store = await db.store.findFirst({
      where: {
        userId,
      },
    });

    return store; // null이면 store가 없거나 권한이 없음
  } catch (error) {
    console.error("Error fetching store:", error);
    return null; // 에러 발생 시 null 반환
  }
};

export const getStoreById = async (storeId: string) => {
  try {
    const store = await db.store.findUnique({
      where: {
        id: storeId,
      },
    });
    return store;
  } catch (error) {
    console.error("Error fetching store by ID:", error);
  }
};

export const getStoreByUserIdAndStoreId = async (
  userId: string,
  storeId: string
) => {
  try {
    const store = await db.store.findFirst({
      where: {
        userId,
        id: storeId,
      },
    });

    return store; // null이면 store가 없거나 권한이 없음
  } catch (error) {
    console.error("Error fetching store:", error);
    return null; // 에러 발생 시 null 반환
  }
};
