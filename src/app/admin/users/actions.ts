"use server";
import { prisma } from "@/lib/prisma/prisma";
import { UserRole } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const userSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(1, { message: "Phone is required" }),
  password: z.string().min(1, { message: "Password is required" }),
  role: z.string().min(1, { message: "Role is required" }),
});

export async function getUsers() {
  try {
    const buyersFound = await prisma.user.findMany({
      where: {
        role: "BUYER",
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return {
      message: "get users successfully",
      data: buyersFound,
      error: null,
    };
  } catch (error) {
    return {
      message: "Error get users",
      data: null,
      error: error,
    };
  }
}
