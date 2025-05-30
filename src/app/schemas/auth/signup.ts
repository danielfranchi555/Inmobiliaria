import { z } from "zod";

export const SignUpSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  lastname: z.string().min(2, { message: "Lastname is required" }),
  phone: z.string().min(1, { message: "Phone is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres." }),
});
