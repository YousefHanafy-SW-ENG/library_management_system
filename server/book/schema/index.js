import { z } from "zod";

export const createBookSchema=z.object({
    title: z.string().min(1),
    author: z.string().min(1),
    isbn: z.string().min(1),
    availableQuantity: z.number().int().min(0),
    shelfLocation: z.string().min(1)
});

export const updateBookSchema= z.object({
    id: z.string().min(1),
    title: z.string().min(1).optional(),
    author: z.string().min(1).optional(),
    isbn: z.string().min(1).optional(),
    availableQuantity: z.number().int().min(0).optional(),
    shelfLocation: z.string().min(1).optional()
});

export const searchBookSchema= z.object({
    title: z.string().min(1).optional(),
    author: z.string().min(1).optional(),
    isbn: z.string().min(1).optional(),
}).strict();