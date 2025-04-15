"use server";

import { prisma } from "@/lib/prisma/prisma";
import { PropertyType } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function filterProperties(
  prevState: { success: boolean; data: any; error: any },
  formdata: FormData
) {
  const typeProperty = formdata.get("propertyType");

  try {
    const findByType = await prisma.property.findMany({
      where: {
        propertyType: typeProperty as PropertyType,
      },
    });
    if (!findByType) {
      return {
        success: false,
        data: null,
        error: " Not found properties",
      };
    }
    console.log({ findByType });
    revalidatePath("/");

    return { success: true, error: null, data: findByType };
  } catch (error) {
    console.log("Error in filterProperties:", error);
    return {
      success: false,
      error: error,
      data: null,
    };
  }
}

export async function getSimilarProperties(
  typeProperty: string,
  currentPropertyId: string
) {
  try {
    const data = await prisma.property.findMany({
      where: {
        propertyType: typeProperty as PropertyType,
        id: {
          not: currentPropertyId,
        },
      },
    });

    if (data.length === 0) {
      return {
        success: true,
        error: null,
        data: null,
        message: "No similar properties",
      };
    }

    return {
      success: true,
      error: null,
      data,
      message: "Get Properties successfully",
    };
  } catch (error) {
    return {
      success: false,
      error: error,
      data: null,
      message: "Erro get Properties",
    };
  }
}
