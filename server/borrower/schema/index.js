import { z } from "zod";

export const registerBorrowerSchema=z.object({
    name: z.string().min(1),
    email: z.email("Invalid Email Format"),
});

export const updateBorrowerSchema= z.object({
    id: z.string().min(1),
    name: z.string().min(1).optional(),
    email: z.email("Invalid Email Format").optional(),
});