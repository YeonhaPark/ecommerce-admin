import * as z from "zod";

export const StoreSchema = z.object({
  name: z.string().min(1, "Store name is required"),
  description: z.string().optional(),
});
