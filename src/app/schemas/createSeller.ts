import { z } from "zod";
export const userSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  lastname: z.string().min(1, { message: "Lastname is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(1, { message: "Phone is required" }),
  password: z.string().min(1, { message: "Password is required" }),
  role: z.string().min(1, { message: "Role is required" }),
});
