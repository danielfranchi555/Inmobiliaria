import { z } from "zod";

export const schemaCreateProperty = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  price: z.preprocess(
    (val) => Number(val),
    z.number().min(1, { message: "Price is required" })
  ),
  listingType: z.enum(["SALE", "RENT"], {
    message: "Invalid listing type",
  }),
  status: z.enum(["AVAILABLE", "SOLD", "RENTED", "PENDING"], {
    message: "Invalid status value",
  }),
  address: z.string().min(1, { message: "Address is required" }),
  city: z.string().min(1, { message: "City is required" }),
  neighborhood: z.string().min(1, { message: "Neighborhood is required" }),
  propertyType: z.enum(["APARTMENT", "HOUSE", "LAND", "COMMERCIAL"], {
    message: "Invalid property type",
  }),
  bedrooms: z
    .preprocess(
      (val) => {
        if (typeof val === "string" && val.trim() === "") return undefined;
        return Number(val);
      },
      z.number({ message: "Bedrooms is required" }).min(0)
    )
    .optional(),

  studio: z.boolean().optional(),

  bathrooms: z.preprocess(
    (val) => Number(val),
    z.number().min(1, { message: "Bathrooms is required" })
  ),
  squareMeters: z.preprocess(
    (val) => Number(val),
    z.number().min(1, { message: "Square Meters is required" })
  ),
  parkingSpaces: z.preprocess(
    (val) => Number(val),
    z.number().min(1, { message: "Parking Spaces is required" })
  ),
  furnished: z.boolean().default(false),
  description: z.string().min(1, { message: "Description is required" }),
  images: z.array(z.string()).min(1, { message: "Images are required" }),
  userSellerId: z.string().optional(),
});
