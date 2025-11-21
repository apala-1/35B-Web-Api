import { z } from "zod";
import { BookSchema } from "../types/book.type";

// DTO - Data Transfer Object
export const CreateBookDTO = BookSchema.pick({ id: true, title: true }); // what client sends to server
export type CreateBookDTO = z.infer<typeof CreateBookDTO>;
