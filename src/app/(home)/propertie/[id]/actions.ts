"use server";

import { getSession } from "@/app/auth/sessionActions";
import { contactSellerSchema } from "@/app/schemas/contactSeller";

type FormStateSeller =
  | {
      success: true;
      message: string;
      errors?: undefined;
    }
  | {
      success: false;
      message: string;
      errors?: {
        email?: string[];
        name?: string[];
        message?: string[];
        telefono?: string[];
      };
    }
  | undefined;
export async function contactSeller(
  prevState: FormStateSeller,
  formData: FormData
): Promise<FormStateSeller> {
  const session = await getSession();
  if (!session) {
    return {
      success: false,
      message: "Debes iniciar sesión para contactar al vendedor",
    };
  }
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const dataForm = Object.fromEntries(formData.entries());

  const validatedFields = contactSellerSchema.safeParse(dataForm);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Error de validacion",
    };
  }

  return {
    success: true,
    message: "Mensaje enviado exitosamente!",
  };
}
