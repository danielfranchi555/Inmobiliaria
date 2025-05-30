import { z } from "zod";

export const contactSellerSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1, { message: "Nombre es requerido" }),
  telefono: z
    .string()
    .min(8, { message: "El teléfono debe tener al menos 8 caracteres" })
    .max(20, { message: "El teléfono es demasiado largo" })
    .regex(/^(\+54)?[ -]*([0-9]{2,4})[ -]*[0-9]{6,8}$/, {
      message: "Número de teléfono argentino inválido",
    }),
  message: z.string().min(1, { message: "Mensaje es requerido" }),
});
