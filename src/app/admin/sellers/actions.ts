"use server";
import { userSchema } from "@/app/schemas/createSeller";
import { prisma } from "@/lib/prisma/prisma";
import { UserRole } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function getUserSeller() {
  try {
    const usersSellers = await prisma.user.findMany({
      where: {
        role: "SELLER",
      },
      select: {
        id: true,
        name: true,
        email: true,
        lastName: true,
        phone: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return {
      success: true,
      message: "get user successfully",
      data: usersSellers,
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      message: "error get users",
      data: null,
      error: error,
    };
  }
}

export const createSeller = async (dataForm: z.infer<typeof userSchema>) => {
  console.log(dataForm);

  const validatedFields = userSchema.safeParse(dataForm);

  if (!validatedFields.success) {
    return { success: false, message: "Invalid fields" };
  }
  const { email, lastname, name, password, phone, role } = dataForm;
  console.log(dataForm);

  const sellerAlreadyExist = await prisma.user.findUnique({
    where: {
      email: email,
      role: "SELLER",
    },
  });

  if (sellerAlreadyExist) {
    return { success: false, message: "User Already Exist" };
  }

  await prisma.user.create({
    data: {
      email: email,
      name: name,
      lastName: lastname,
      password: password,
      phone: phone,
      role: role as UserRole,
    },
  });

  revalidatePath("/admin/sellers");
  revalidatePath("/admin/properties/add-property");

  return { success: true, message: "User created successfully" };
};

export async function deleteUserSeller(id: string) {
  try {
    const userFound = await prisma.user.findMany({
      where: {
        id: id,
      },
    });

    if (!userFound) {
      return {
        success: false,
        message: "User not found",
        error: null,
      };
    }
    await prisma.user.delete({
      where: {
        id: id,
      },
    });
    revalidatePath("/admin/sellers");

    return {
      success: true,
      message: "User deleted successfully",
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      message: "error get users",
      data: null,
      error: error,
    };
  }
}
