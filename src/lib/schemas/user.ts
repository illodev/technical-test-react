import * as z from "zod";

export const userCreateInputSchema = z.object({
  name: z.string().optional(),
  email: z.string().email(),
  password: z.string().min(8),
  image: z.string().url().optional(),
});

export const userUpdateInputSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  image: z.string().url().optional(),
});

export const userOutputSchema = userCreateInputSchema.merge(
  z.object({
    id: z.string(),
    emailVerified: z.date().optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
  }),
);

export type UserCreateInput = z.infer<typeof userCreateInputSchema>;
export type UserUpdateInput = z.infer<typeof userUpdateInputSchema>;
export type UserOutput = z.infer<typeof userOutputSchema>;
