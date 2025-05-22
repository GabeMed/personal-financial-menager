import { z } from "zod";

export const NewTransactionSchema = z
  .object({
    description: z.string().min(1, "Must have a description"),
    amount: z.number().positive("Must be a positive number"),
    type: z.enum(["income", "expense"]),
    categoryId: z.number().int().nullable(),
    newCategoryName: z.string().optional(),
  })
  .refine((v) => v.categoryId !== null || v.newCategoryName?.length, {
    message: "Select a category or create a new one",
  });
export type NewTransactionDTO = z.infer<typeof NewTransactionSchema>;
