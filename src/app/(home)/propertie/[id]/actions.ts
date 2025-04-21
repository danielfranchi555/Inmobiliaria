"use server";
export async function contactSeller(
  prevState: { success: boolean },
  formData: FormData
) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return {
    success: true,
  };
}
