import { z } from "zod";

export const NewCategorySchema = z.object({
  name: z.string().min(1, "Must have a name"),
});
export type NewCategoryDTO = z.infer<typeof NewCategorySchema>;
