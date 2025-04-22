"use server";
import { schemaCreateProperty } from "@/app/schemas/createProperty";
import { prisma } from "@/lib/prisma/prisma";
import { PropertyStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

type Inputs = {
  title: string;
  price: number;
  currency: string;
  status: PropertyStatus; // Asegúrate de que `PropertyStatus` esté definido
  address: string;
  city: string;
  neighborhood: string;
  bedrooms: number | null;
  studio: boolean;
  squareMeters: number;
  bathrooms: number | null;
  parkingSpaces: number | null;
  furnished: boolean;
  description: string;
  images: File[] | string[];
  listingType: "SALE" | "RENT"; // Nueva propiedad
  userSellerId: string | null; // Nueva propiedad
  propertyType: "HOUSE" | "APARTMENT" | "COMMERCIAL" | "LAND"; // Added missing property
};

export async function createProperty(data: Inputs) {
  const validate = schemaCreateProperty.safeParse(data);

  if (!validate.success) {
    return {
      success: false,
      message: "Invalid fields",
      errors: validate.error.flatten().fieldErrors,
    };
  }
  try {
    await prisma.property.create({
      data: {
        title: data.title,
        description: data.description,
        price: data.price,
        currency: data.currency as "USD" | "ARG",
        listingType: data.listingType,
        status: data.status,
        address: data.address,
        city: data.city,
        bathrooms: data.bathrooms,
        bedrooms: data.bedrooms,
        squareMeters: data.squareMeters,
        neighborhood: data.neighborhood,
        images: data.images as string[],
        parkingSpaces: data.parkingSpaces,
        userSellerId: data.userSellerId,
        propertyType: data.propertyType,
        studio: data.studio,
        furnished: data.furnished,
      },
    });
    revalidatePath("/admin/properties");
    revalidatePath("/");

    return {
      success: true,
      message: "Property created successfully",
      error: null,
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: "Error creating property",
      error: error,
    };
  }
}

export async function getPropertiesByAdmin() {
  try {
    const properties = await prisma.property.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        price: true,
        listingType: true,
        status: true,
        propertyType: true,
        address: true,
        currency: true,
        city: true,
        bedrooms: true,
        bathrooms: true,
        squareMeters: true,
        parkingSpaces: true,
        furnished: true,
        neighborhood: true,
        studio: true,
        userSellerId: true,
        views: true,
        images: true,
        // Excluimos las imágenes y cualquier campo problemático
      },
    });

    return {
      success: true,
      data: properties, // <-- ✅ Esto soluciona el error
      error: null,
      message: "properties fetched",
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

export async function getPropertieId(id: string) {
  try {
    const propertieFound = await prisma.property.findUnique({
      where: {
        id: id,
      },
      include: {
        User: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            lastName: true,
          },
        },
      },
    });

    return {
      success: true,
      data: propertieFound,
      error: null,
      message: "propertie fetched",
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

export const updateProperty = async (data: Inputs, id_property: string) => {
  //obtener el id de la propertie y verificar su existencia
  const propertyFound = await prisma.property.findUnique({
    where: {
      id: id_property,
    },
  });
  if (!propertyFound) {
    return { success: false, message: "property not found" };
  }

  try {
    await prisma.property.update({
      where: {
        id: id_property,
      },
      data: {
        title: data.title,
        price: data.price,
        status: data.status,
        listingType: data.listingType,
        address: data.address,
        city: data.city,
        neighborhood: data.neighborhood,
        propertyType: data.propertyType,
        bedrooms: data.bedrooms,
        studio: data.studio,
        bathrooms: data.bathrooms,
        squareMeters: data.squareMeters,
        parkingSpaces: data.parkingSpaces,
        userSellerId: data.userSellerId,
        furnished: data.furnished,
        description: data.description,
        images: data.images as string[],
      },
    });
    revalidatePath("/admin/properties");
    return { success: true, message: "property updated" };
  } catch (error) {
    return { success: false, message: "Error updating property", error: error };
  }
};

export const deleteProperty = async (id_property: string) => {
  try {
    await prisma.property.delete({
      where: {
        id: id_property,
      },
    });
    revalidatePath("/admin/properties");
    return { success: true, message: "Property deleted successfully" };
  } catch (error) {
    return { success: false, message: "Error Property deleted", error: error };
  }
};
