"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Resolver, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "@/lib/schemas/createProperty";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createProperty } from "@/app/admin/properties/actions";
import { PropertyListingType, PropertyStatus } from "@prisma/client";
import { useState, useTransition } from "react";
import uploadCloudinary from "@/app/utils/uploadCloudinary";
import ImageUploader from "../ImageUploader/ImageUploader";
import { useRouter } from "next/navigation";
import { UseSelect } from "../UseSelect/UseSelect";
import Link from "next/link";

const OPTIONS = {
  status: ["AVAILABLE", "SOLD", "RENTED", "PENDING"],
  propertyType: ["HOUSE", "APARTMENT", "COMMERCIAL", "LAND"],
  listingType: ["SALE", "RENT"],
  currency: ["USD", "ARG"],
};

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
  listingType: PropertyListingType; // Nueva propiedad
  userSellerId: string | null; // Nueva propiedad
  propertyType: "HOUSE" | "APARTMENT" | "COMMERCIAL" | "LAND"; // Added missing property
};

type SellersProps = {
  data: {
    id: string;
    name: string;
    lastName: string;
  }[];
};

export default function AddPropertyForm({ data }: SellersProps) {
  const [isPending, startTransition] = useTransition();
  const [formattedPrice, setFormattedPrice] = useState("");

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema) as unknown as Resolver<Inputs>,
  });

  const sellersOptions = data;

  const watchStudio = watch("studio");
  const watchImages = watch("images");
  const watchListingType = watch("listingType");
  const watchPropertyType = watch("propertyType");
  const watchStatus = watch("status");
  const watchSeller = watch("userSellerId");
  const watchCurrency = watch("currency");

  const uploadImages = async (images: Array<File>) => {
    const { message, success, urls } = await uploadCloudinary(images);

    if (!success || !urls || urls.length === 0) {
      toast.error("Error uploading images", {
        description: message,
        duration: 3000,
        icon: "❌",
        style: {
          backgroundColor: "#fff",
          color: "#000",
        },
      });
      throw new Error(message);
    }

    return urls;
  };

  const createNewProperty = async (data: Inputs) => {
    const { message, success, error } = await createProperty(data);
    if (!success || error) {
      throw new Error(message);
    }
    return message;
  };

  const formatPrice = (val: string) => {
    const numeric = val.replace(/\D/g, ""); // quita todo lo que no sea número
    const number = parseInt(numeric || "0", 10);
    return number.toLocaleString("en-US");
  };

  const handlePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const numeric = raw.replace(/\D/g, ""); // solo dígitos
    const formatted = formatPrice(raw);

    setFormattedPrice(formatted);
    setValue("price", parseInt(numeric || "0")); // guarda valor real en el form

    trigger("price");
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    startTransition(async () => {
      try {
        const urls = await uploadImages(data.images as Array<File>);
        const dataWithUrls = {
          ...data,
          images: urls,
        };
        const message = await createNewProperty(dataWithUrls);
        reset();
        router.push("/admin/properties");
        toast.success(message, {
          description: "Property created successfully",
          duration: 3000,
          icon: "✅",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        });
      } catch (error) {
        console.log({ error });
        toast.error("Error creating property", {
          description: "Please try again",
          duration: 3000,
          icon: "❌",
          style: {
            backgroundColor: "#fff",
            color: "#000",
          },
        });
      }
    });
  };

  const handleStudioChange = (value: boolean) => {
    setValue("studio", value);
    setValue("bedrooms", value ? null : 1); // Si es un estudio, bedrooms será null; de lo contrario, 1.
    trigger("bedrooms");
  };

  const handleSeller = (value: string) => {
    console.log(value);
    setValue("userSellerId", value);
    trigger("userSellerId");
  };

  const handlelistingType = (value: PropertyListingType) => {
    setValue("listingType", value);
    trigger("listingType");
  };

  const handleFurnishedChecked = (value: boolean) => {
    setValue("furnished", value);
    trigger("furnished");
  };

  const validateSeller = () => {
    if (sellersOptions.length === 0) {
      return true;
    }
  };

  return (
    <div>
      <Card className="border-none shadow-none">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Information Section */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Enter property title"
                  className="w-full"
                  {...register("title")}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm">{errors.title.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="text"
                  value={formattedPrice}
                  placeholder="Enter price"
                  className="w-full"
                  min={1}
                  onChange={handlePrice}
                  // {...register("price")}
                />
                {errors.price && (
                  <p className="text-red-500 text-sm">{errors.price.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Currency</Label>
                <UseSelect
                  text="Select a currency"
                  setValue={setValue}
                  trigger={trigger}
                  value={"currency"}
                  options={OPTIONS.currency}
                  watch={watchCurrency}
                  dataTestid="status"
                />
                {errors.currency && (
                  <p className="text-red-500 text-sm">
                    {errors.currency.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <UseSelect
                  text="Select a status"
                  setValue={setValue}
                  trigger={trigger}
                  value={"status"}
                  options={OPTIONS.status}
                  watch={watchStatus}
                  dataTestid="status"
                />
                {errors.status && (
                  <p className="text-red-500 text-sm">
                    {errors.status.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Operation Type</Label>
                <Select
                  value={watchListingType || ""}
                  onValueChange={handlelistingType}
                >
                  <SelectTrigger className="w-full" data-testid="listingType">
                    <SelectValue placeholder="Select a operation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Operation</SelectLabel>
                      {OPTIONS.listingType.map((item, index) => (
                        <SelectItem
                          value={item}
                          key={index}
                          data-testid={`select-item-${item.replace(/\s/g, "-")}`}
                        >
                          {item}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {errors.listingType && (
                  <p className="text-red-500 text-sm">
                    {errors.listingType.message}
                  </p>
                )}
              </div>
            </div>
          </section>
          {/* Location Section */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Location</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  placeholder="Enter address"
                  className="w-full"
                  {...register("address")}
                />
                {errors.address && (
                  <p className="text-red-500 text-sm">
                    {errors.address.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  placeholder="Enter city"
                  className="w-full"
                  {...register("city")}
                />
                {errors.city && (
                  <p className="text-red-500 text-sm">{errors.city.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="neighborhood">Neighborhood</Label>
                <Input
                  id="neighborhood"
                  placeholder="Enter neighborhood"
                  className="w-full"
                  {...register("neighborhood")}
                />
                {errors.neighborhood && (
                  <p className="text-red-500 text-sm">
                    {errors.neighborhood.message}
                  </p>
                )}
              </div>
            </div>
          </section>
          {/* Property Details Section */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Property Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <Label>Type</Label>
                <UseSelect
                  watch={watchPropertyType}
                  text="Select a type"
                  setValue={setValue}
                  value={"propertyType"}
                  trigger={trigger}
                  options={OPTIONS.propertyType}
                  dataTestid="propertyType"
                />
                {errors.propertyType && (
                  <p className="text-red-500 text-sm">
                    {errors.propertyType.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Bedrooms</Label>
                <Input
                  {...register("bedrooms", { valueAsNumber: true })} // Convierte el valor a número automáticamente
                  type="number"
                  placeholder="Number of bedrooms"
                  className="w-full"
                  disabled={watchStudio} // ** Cambiado: deshabilitar si es un studio **
                />
                {errors.bedrooms && (
                  <p className="text-red-500 text-sm">
                    {errors.bedrooms.message}
                  </p>
                )}
                <p className="text-sm text-muted-foreground">
                  If selected Studio, Bedrooms will be 0
                </p>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="studio"
                    onCheckedChange={handleStudioChange} // ** Cambiado: manejo del cambio del checkbox **
                  />
                  <label
                    htmlFor="studio"
                    className="text-sm font-medium leading-none"
                  >
                    Studio
                  </label>
                  {errors.studio && (
                    <p className="text-red-500 text-sm">
                      {errors.studio.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bathrooms">Bathrooms</Label>
                <Input
                  id="bathrooms"
                  {...register("bathrooms")}
                  type="number"
                  placeholder="Number of bathrooms"
                  className="w-full"
                />
                {errors.bathrooms && (
                  <p className="text-red-500 text-sm">
                    {errors.bathrooms.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="squareMeters">Square Meters</Label>
                <Input
                  id="squareMeters"
                  {...register("squareMeters")}
                  type="number"
                  placeholder="Total area"
                  className="w-full"
                />
                {errors.squareMeters && (
                  <p className="text-red-500 text-sm">
                    {errors.squareMeters.message}
                  </p>
                )}
              </div>
            </div>
          </section>
          {/* Additional Features Section */}
          <section className="space-y-4 ">
            <h2 className="text-xl font-semibold text-gray-800">
              Additional Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="parkingSpaces">Parking Spaces</Label>
                <Input
                  id="parkingSpaces"
                  {...register("parkingSpaces")}
                  type="number"
                  placeholder="Number of parking spaces"
                  className="w-full"
                  min={0}
                />
                {errors.parkingSpaces && (
                  <p className="text-red-500 text-sm">
                    {errors.parkingSpaces.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Seller</Label>
                <Select
                  disabled={validateSeller()}
                  value={watchSeller || ""}
                  onValueChange={handleSeller}
                >
                  <SelectTrigger
                    className="w-full"
                    data-testid="select-userSellerId"
                  >
                    <SelectValue placeholder="Select a seller" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Fruits</SelectLabel>
                      {sellersOptions.map((item) => (
                        <SelectItem
                          value={item.id}
                          key={item.id}
                          data-testid={`select-item-${item.name.replace(/\s/g, "-")}`}
                        >
                          {item.name} {item.lastName}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {sellersOptions.length === 0 && (
                  <div className="flex items-center gap-2 text-sm">
                    <p className=" text-muted-foreground">
                      not found sellers availables
                    </p>
                    <Link
                      className="text-blue-500  hover:underline"
                      href={"/admin/sellers"}
                    >
                      Create seller
                    </Link>
                  </div>
                )}
                {errors.userSellerId && (
                  <p className="text-red-500 text-sm">
                    {errors.userSellerId.message}
                  </p>
                )}
              </div>
              <div className="space-y-4 ">
                <Label htmlFor="terms1">Furnished</Label>
                <div className="flex items-center space-x-2 ">
                  <Checkbox
                    className="size-6"
                    id="terms1"
                    onCheckedChange={handleFurnishedChecked}
                  />
                  <p className="text-sm text-muted-foreground">
                    Select if the property is furnished
                  </p>
                  {errors.furnished && (
                    <p className="text-red-500 text-sm">
                      {errors.furnished.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </section>
          {/* Description and Images Section */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Description & Images
            </h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>

                <Textarea
                  id="description"
                  {...register("description")}
                  placeholder="Enter property description"
                  className="min-h-[150px] w-[500px]"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm">
                    {errors.description.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <ImageUploader
                  value={"images"}
                  setValue={setValue}
                  trigger={trigger}
                  errors={errors}
                  watchImages={watchImages as File[]}
                />
                {/* {JSON.stringify(errors.images)} */}
                {errors.images &&
                  Array.isArray(errors.images) &&
                  errors.images.map((error, idx) => (
                    <p className="text-sm text-red-500" key={idx}>
                      {" "}
                      {error?.message}
                    </p>
                  ))}
              </div>
            </div>
          </section>
          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <Button type="submit" className="px-8">
              {isPending ? "Creating..." : "Create Property"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
