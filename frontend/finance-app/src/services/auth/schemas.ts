import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(3, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginCredentials = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  username: z.string().min(3, "Username is required"),
  email: z.string().email("Invalid e-mail"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type RegisterCredentials = z.infer<typeof registerSchema>;

export interface User {
  id: number;
  username: string;
  email: string;
}
