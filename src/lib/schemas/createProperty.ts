import { z } from "zod";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "image/gif",
  "image/webp",
];

const fileSchema = z
  .instanceof(File)
  .refine((file) => file.size <= MAX_FILE_SIZE, {
    message: "Each file must be 2MB or less",
  })
  .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
    message: "Only .jpg, .jpeg, .png and .gif files are accepted",
  });

export const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  price: z.preprocess(
    (val) => {
      const num =
        typeof val === "string" ? Number(val.replace(/\D/g, "")) : val;
      return Number.isNaN(num) || num === 0 ? undefined : num;
    },
    z
      .number({ required_error: "Price is required" })
      .min(1, { message: "Price must be at least 1" })
  ),
  listingType: z.enum(["SALE", "RENT"], {
    message: "Invalid listing type",
  }),
  status: z.enum(["AVAILABLE", "SOLD", "RENTED", "PENDING"], {
    message: "Invalid status value",
  }),
  currency: z.enum(["USD", "ARG"], {
    message: "Invalid currency",
  }),
  address: z.string().min(1, { message: "Address is required" }),
  city: z.string().min(1, { message: "City is required" }),
  neighborhood: z.string().min(1, { message: "Neighborhood is required" }),
  propertyType: z.enum(["HOUSE", "APARTMENT", "LAND", "COMMERCIAL"], {
    message: "Invalid property type",
  }),
  bedrooms: z
    .number({ message: "Bedrooms is required" })
    .min(1, { message: "Bedrooms must be at least 1" })
    .nullable(),
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
  furnished: z.boolean().default(false).optional(),
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .max(120, { message: "Description must be less than 120 characters" }),
  images: z.union([
    z.array(fileSchema), // Permite un array de Files con validación
    z.array(z.string().min(1, { message: "images is required" })), // Permite un array de strings
  ]),
  userSellerId: z.string().min(1, { message: "Seller is required" }),
});
