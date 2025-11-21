import { z } from "zod";

export const BookSchema = z.object({
    id: z.string().min(1, { message: "Book ID is required" }),
    title: z.string().min(1, { message: "Book Title is required" }),
    date: z.string().optional()
});
export type Book = z.infer<typeof BookSchema>; // TypeScript type from Zod schema