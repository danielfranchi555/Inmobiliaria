import { z } from "zod";

export const contactSellerSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1, { message: "Name is required" }),
  message: z.string().min(1, { message: "Message is required" }),
});
