"use server";

import { getSession } from "@/app/auth/sessionActions";
import { contactSellerSchema } from "@/app/schemas/contactSeller";

type FormStateSeller =
  | {
      success: boolean;
      message: string;
      errors?: {
        email?: string[];
        name?: string[];
        message?: string[];
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
      message: "You must be logged in to contact the seller",
    };
  }
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const dataForm = Object.fromEntries(formData.entries());
  // const { email, name, message } = dataForm;

  const validatedFields = contactSellerSchema.safeParse(dataForm);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation error",
    };
  }

  return {
    success: true,
    message: "Message sent successfully",
  };
}
