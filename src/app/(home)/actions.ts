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

export async function getPriceRangeUSD() {
  try {
    const pricesProperties = await prisma.property.findMany({
      select: {
        price: true,
        currency: true,
      },
    });

    const filter = pricesProperties.map((property) => {
      return property.currency === "USD"
        ? property.price
        : property.price / 1000;
    });

    const minPriceUSD = Math.min(...filter);
    const maxPriceUSD = Math.max(...filter);

    const data = [minPriceUSD, maxPriceUSD];

    return { success: true, error: null, data };
  } catch (error) {
    return { success: false, data: null, error: error };
  }
}

export async function getProperties(
  searchParams: Promise<{
    Type: string;
    Contract: string;
    Minprice: string;
    Maxprice: string;
    Currency: string;
    page?: string;
    pageSize?: string;
  }>
) {
  const params = await searchParams;
  const where: any = {};

  if (params.Type) {
    where.propertyType = params.Type;
  }

  if (params.Contract) {
    where.listingType = params.Contract;
  }

  if (params.Currency) {
    where.currency = params.Currency;
  }

  if (params.Minprice) {
    where.price = {
      ...where.price,
      gte: parseInt(params.Minprice),
    };
  }

  if (params.Maxprice) {
    where.price = {
      ...where.price,
      lte: parseInt(params.Maxprice),
    };
  }

  // Parámetros para paginación
  const page = params.page ? Math.max(parseInt(params.page), 1) : 1; // obtener page
  const pageSize = 3; // cantidad de elementos que queremos que se muestre por page

  const skip = (page - 1) * pageSize; // = 5
  const take = skip + pageSize;

  try {
    const properties = await prisma.property.findMany({
      where,
      skip,
      take,
      orderBy: {
        createdAt: "desc", // opcional: ordena por fecha
      },
    });

    const totalProperties = await prisma.property.count({ where });

    const totalPages = Math.ceil(totalProperties / pageSize);
    console.log({ totalPages });

    return {
      success: true,
      data: properties,
      error: null,
      message: "properties fetched",
      pagination: {
        page,
        pageSize,
        totalPages,
        totalProperties,
      },
    };
  } catch (error) {
    return {
      success: false,
      message: "Error fetching properties",
      error,
      data: null,
    };
  }
}
