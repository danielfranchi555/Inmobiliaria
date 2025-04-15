import { prisma } from "@/lib/prisma/prisma";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const properties = await prisma.property.findMany();
    if (!properties || properties.length === 0) {
      return new Response("No properties found", { status: 404 });
    }
    return new Response(
      JSON.stringify({
        data: properties,
        success: true,
        message: "data fetched successfully",
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error fetching properties:", error);
    return new Response(
      JSON.stringify({
        data: null,
        success: false,
        message: "Error fetching properties",
      }),
      { status: 500 }
    );
  }
}
