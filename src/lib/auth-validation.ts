import { z } from "zod";

export const emailSchema = z
  .string()
  .trim()
  .min(1, { message: "Email is required" })
  .max(255, { message: "Email must be less than 255 characters" })
  .email({ message: "Enter a valid email address" });

export const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters" })
  .max(72, { message: "Password must be less than 72 characters" });

export const signInSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, { message: "Password is required" }).max(72),
});

export const createAccountSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, { message: "Name is required" })
      .max(100, { message: "Name must be less than 100 characters" }),
    email: emailSchema,
    password: passwordSchema,
    confirm: z.string().min(1, { message: "Please confirm your password" }),
    phone: z
      .string()
      .trim()
      .max(20, { message: "Phone number is too long" })
      .regex(/^[+\d\s().-]*$/, { message: "Phone may only contain digits and + ( ) - ." })
      .optional()
      .or(z.literal("")),
    agreed: z.literal(true, {
      errorMap: () => ({ message: "You must accept the Terms and Privacy Policy" }),
    }),
  })
  .refine((d) => d.password === d.confirm, {
    path: ["confirm"],
    message: "Passwords do not match",
  });

export type SignInInput = z.infer<typeof signInSchema>;
export type CreateAccountInput = z.infer<typeof createAccountSchema>;
