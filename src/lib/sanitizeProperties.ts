import { Property } from "@prisma/client";

export function sanitizeProperty(property: Property) {
  return {
    ...property,
    createdAt: property.createdAt.toISOString(),
    updatedAt: property.updatedAt.toISOString(),
  };
}

export function sanitizeProperties(properties: Property[]) {
  return properties.map(sanitizeProperty);
}
