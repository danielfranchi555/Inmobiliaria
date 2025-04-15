import { prisma } from "@/lib/prisma/prisma";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { type, contract, price } = body;

  const filters: any = {};

  if (type) {
    filters.propertyType = type;
  }

  if (contract) {
    filters.listingType = contract;
  }

  if (price) {
    filters.price = {
      lte: price,
    };
  }

  try {
    const typeProperty = await prisma.property.findMany({
      where: {
        ...filters,
      },
    });

    if (!typeProperty || typeProperty.length === 0) {
      return new Response("No properties found", { status: 404 });
    }

    return new Response(JSON.stringify(typeProperty), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching properties:", error);
    return new Response("Error fetching properties", { status: 500 });
  }
}
