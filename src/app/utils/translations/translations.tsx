import {
  CurrencyType,
  PropertyListingType,
  PropertyType,
} from "@prisma/client";

const propertyTypeLabels: Record<PropertyType, string> = {
  APARTMENT: "Departamento",
  HOUSE: "Casa",
  COMMERCIAL: "Local comercial",
  LAND: "Terreno",
};

const contractTypeLabels: Record<PropertyListingType, string> = {
  RENT: "Alquiler",
  SALE: "Venta",
};

const currencyTypeLables: Record<CurrencyType, string> = {
  USD: "USD",
  ARS: "ARS",
};

// Generar automáticamente los arrays con `value` y `label`
export const propertyTypeOptions = Object.values(PropertyType).map((value) => ({
  value,
  label: propertyTypeLabels[value] ?? value, // fallback al value si no hay traducción
}));

export const contractTypeOptions = Object.values(PropertyListingType).map(
  (value) => ({
    value,
    label: contractTypeLabels[value] ?? value,
  })
);

export const currencyTypeLablesOptions = Object.values(CurrencyType).map(
  (value) => ({
    value,
    label: currencyTypeLables[value] ?? value,
  })
);
