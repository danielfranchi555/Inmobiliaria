"use client";
import uploadCloudinary from "@/app/utils/uploadCloudinary";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { schema } from "@/lib/schemas/createProperty";
import { zodResolver } from "@hookform/resolvers/zod";
import { PropertyListingType, PropertyStatus } from "@prisma/client";
import { useEffect, useState, useTransition } from "react";
import { Resolver, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import UseField from "../UseField/UseField";
import { Trash2 } from "lucide-react";
import { updateProperty } from "@/app/admin/properties/actions";
import { useRouter } from "next/navigation";
import { sizeCalculator } from "@/app/utils/calculateSize";
import SelectStatus from "@/ui/Selects/SelectStatus/SelectStatus";
import SelectOperationType from "@/ui/Selects/SelectOperationType/SelectOperationType";
import SelectTypeProperty from "@/ui/Selects/SelectTypeProperty/SelectTypeProperty";
import SelectSeller from "@/ui/Selects/SelectSeller/SelectSeller";
import { UseSelect } from "../UseSelect/UseSelect";
import { formatPrice } from "@/app/utils/formatPrice";

export const PROPERTY_STATUS = ["AVAILABLE", "SOLD", "RENTED", "PENDING"];
export const PROPERTY_TYPE = ["HOUSE", "APARTMENT", "COMMERCIAL", "LAND"];
export const LYSTING_TYPE = ["SALE", "RENT"];

export type Inputs = {
  title: string;
  price: number;
  currency: string; // Asegúrate de que `currency` esté definido
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

export type Sellers = {
  id: string;
  name: string;
};

type Props = {
  id: string;
  propertie: Inputs;
  sellers: Sellers[];
};

const UpdateFormProperty = ({ id, propertie, sellers }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [images, setImages] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [formattedPrice, setFormattedPrice] = useState(propertie.price);

  const router = useRouter();

  console.log(propertie);

  const CURRENCY_OPTIONS = ["USD", "ARG"];
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
    defaultValues: {
      title: propertie.title,
      price: propertie.price,
      status: propertie.status,
      address: propertie.address,
      city: propertie.city,
      currency: propertie.currency,
      neighborhood: propertie.neighborhood,
      bedrooms: propertie.bedrooms,
      studio: propertie.studio,
      squareMeters: propertie.squareMeters,
      bathrooms: propertie.bathrooms,
      parkingSpaces: propertie.parkingSpaces,
      furnished: propertie.furnished,
      description: propertie.description,
      images: propertie.images,
      listingType: propertie.listingType,
      userSellerId: propertie.userSellerId || null,
      propertyType: propertie.propertyType,
    },
  });

  useEffect(() => {
    setImages(propertie.images as string[]);
    setValue("images", propertie.images);
  }, [propertie, setValue, handleSubmit]);

  const formValues = watch();
  const watchCurrency = watch("currency");

  const uploadNewImage = async (filesImages: Array<File>) => {
    if (!files) return [];

    const { urls, errors } = await uploadCloudinary(filesImages);

    if (!urls || urls.length === 0) {
      console.log(errors);
      throw new Error("Error uploaded images");
    }

    return urls;
  };

  const handleUpdate = async (propertyData: Inputs, id_property: string) => {
    const { message, success, error } = await updateProperty(
      propertyData,
      id_property
    );
    if (error || success === false) {
      throw new Error("Error updating property");
    }
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    startTransition(async () => {
      let urls = [];
      if (files.length > 0) {
        // Upload new images only if there are new files
        urls = await uploadNewImage(files as Array<File>);
      }

      try {
        const dataWithUrls = {
          ...data,
          images: urls.length > 0 ? [...data.images, ...urls] : data.images,
        };
        await handleUpdate(dataWithUrls, id);
        reset();
        router.push("/admin/properties");
        toast.success("Property updated successfully", {
          description: "The property details have been updated.",
          duration: 3000,
          icon: "✅",
        });
      } catch (error: any) {
        toast.error("Error updating property", {
          description: error.message || "Please try again",
          duration: 3000,
          icon: "❌",
        });
      }
    });
  };

  const handleStudioChange = (value: boolean) => {
    if (value) {
      setValue("studio", value);
      setValue("bedrooms", null);
      trigger("studio");
      trigger("bedrooms");
    }

    if (!value) {
      setValue("studio", false);
      setValue("bedrooms", 1);
      trigger("studio");
      trigger("bedrooms");
    }
  };

  const handleBedroomsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? Number(e.target.value) : null;
    if (value !== null && value <= 0) {
      return trigger("bedrooms");
    }

    setValue("bedrooms", value || null);
    trigger("bedrooms");
  };

  const handleFurnishedChecked = (value: boolean) => {
    setValue("furnished", value);
    trigger("furnished");
  };

  const addImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filesImages = Array.from(e.target.files || []);

    const size = sizeCalculator(filesImages as unknown as File[]);
    if (!size.success) {
      toast.error("Error uploading images", {
        description: (
          <span className="text-red-400 font-medium">{size.message}</span>
        ),
        duration: 3000,
        icon: "❌",
      });
      return;
    }
    setFiles((prevImages) => [...prevImages, ...filesImages]);
  };

  const deleteImage = (idx: number) => {
    setImages((prevImages) => {
      const newImages = prevImages.filter((_, index) => index !== idx);
      setValue("images", newImages);
      return newImages;
    });
  };

  const deleteNewImage = (idx: number) => {
    setFiles((prevFiles) => {
      const filesUpdate = prevFiles.filter((_, index) => index !== idx);
      return filesUpdate;
    });
  };

  const handlePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;

    // Remueve cualquier caracter que no sea número
    const numericValue = rawValue.replace(/[^\d]/g, "");
    const numberValue = Number(numericValue);

    setFormattedPrice(numberValue);
    setValue("price", numberValue);
    trigger("price");
  };

  // Crear un componente para el manejo de errores
  const ErrorMessage = ({ error }: { error?: { message?: string } }) => {
    return error ? (
      <p className="text-red-500 text-sm">{error.message}</p>
    ) : null;
  };

  console.log(errors);

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
              {/* INPUT TITLE */}
              <UseField
                value="title"
                register={register}
                errors={errors}
                type={""}
                label="Title"
                min={undefined}
                placeholder="Enter Title Property"
              />
              {/* INPUT PRICE */}
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="text"
                  value={formatPrice(formattedPrice)}
                  placeholder="Enter price"
                  className="w-full"
                  onChange={handlePrice}
                />
                {errors.price && (
                  <p className="text-red-500 text-sm">{errors.price.message}</p>
                )}
              </div>
              {/* SELECT CURRENCY */}
              <div className="space-y-2">
                <Label htmlFor="status">Currency</Label>
                <UseSelect
                  options={CURRENCY_OPTIONS}
                  setValue={setValue}
                  text="currency"
                  value="currency"
                  dataTestid="currency_id"
                  trigger={trigger}
                  watch={watchCurrency}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <SelectStatus
                  defaultValue={propertie.status}
                  options={PROPERTY_STATUS}
                  setValue={setValue}
                />
                {errors.status && <ErrorMessage error={errors.status} />}
              </div>
              <div className="space-y-2">
                <Label>Operation Type</Label>
                <SelectOperationType
                  defaultValue={propertie.listingType}
                  options={LYSTING_TYPE}
                  setValue={setValue}
                />
                {errors.listingType && (
                  <ErrorMessage error={errors.listingType} />
                )}
              </div>
            </div>
          </section>
          {/* Location Section */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Location</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <UseField
                value="address"
                register={register}
                errors={errors}
                type={""}
                label="Address"
                min={undefined}
                placeholder="Enter Address Property"
              />
              <UseField
                value="city"
                register={register}
                errors={errors}
                type={""}
                label="City"
                min={undefined}
                placeholder="Enter City Property"
              />
              <UseField
                value="neighborhood"
                register={register}
                errors={errors}
                type={""}
                label="Neighborhood"
                min={undefined}
                placeholder="Enter Neighborhood "
              />
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
                <SelectTypeProperty
                  defaultValue={propertie.propertyType}
                  options={PROPERTY_TYPE}
                  setValue={setValue}
                />
                {errors.propertyType && (
                  <ErrorMessage error={errors.propertyType} />
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="bedrooms">Bedrooms</Label>
                <Input
                  id="bedrooms"
                  type="number"
                  placeholder="Number of bedrooms"
                  className="w-full"
                  value={formValues.bedrooms ?? ""} // <-- Esto es clave
                  // {...register("bedrooms")}
                  disabled={formValues.studio} // ** Cambiado: deshabilitar si es un studio **
                  onChange={handleBedroomsChange} // ** Cambiado: manejo de cambio **
                />
                {errors.bedrooms && <ErrorMessage error={errors.bedrooms} />}
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
                  {errors.studio && <ErrorMessage error={errors.studio} />}
                </div>
              </div>
              <UseField
                value={"bathrooms"}
                errors={errors}
                register={register}
                label="Bathrooms"
                placeholder="Enter bathrooms "
                min={0}
                type="number"
              />
              <UseField
                value={"squareMeters"}
                errors={errors}
                register={register}
                label="SquareMeters"
                placeholder="Enter SquareMeters "
                min={0}
                type="number"
              />
            </div>
          </section>
          {/* Additional Features Section */}
          <section className="space-y-4 ">
            <h2 className="text-xl font-semibold text-gray-800">
              Additional Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <UseField
                value={"parkingSpaces"}
                errors={errors}
                register={register}
                label="ParkingSpaces"
                placeholder="Enter parkingSpaces "
                min={0}
                type="number"
              />
              <div className="space-y-2">
                <Label>Seller</Label>
                <SelectSeller
                  defaultValue={propertie.userSellerId || ""}
                  options={sellers}
                  setValue={setValue}
                />
                {errors.userSellerId && (
                  <ErrorMessage error={errors.userSellerId} />
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
                    <ErrorMessage error={errors.furnished} />
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
                  className="min-h-[150px]"
                />
                {errors.description && (
                  <ErrorMessage error={errors.description} />
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="images">Images</Label>
                <Input
                  id="images"
                  onChange={addImage}
                  type="file"
                  className="w-full"
                  multiple
                />
                {errors.images && <ErrorMessage error={errors.images} />}
                <div className="flex gap-4 mt-4 h-full ">
                  {images.map((item, index) => (
                    <div className="relative" key={index}>
                      <Image
                        src={item as string}
                        alt="property"
                        width={200}
                        height={200}
                        className="object-cover h-full rounded-md"
                      />
                      <div className="absolute inset-0 bg-black/50 rounded-md"></div>
                      <button
                        type="button"
                        className="cursor-pointer absolute top-2 right-2 bg-white/80 hover:bg-red-600 hover:text-white rounded-full p-2 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500"
                        onClick={() => deleteImage(index)}
                        aria-label="Delete image"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                  {files.map((f, index) => (
                    <div className="relative" key={`file-${index}`}>
                      <Image
                        src={URL.createObjectURL(f)}
                        alt="new property"
                        width={200}
                        height={200}
                        className="object-cover h-full rounded-md"
                      />
                      <div className="absolute inset-0 bg-black/50 rounded-md"></div>
                      filemap
                      <button
                        type="button"
                        className="cursor-pointer absolute top-2 right-2 bg-white/80 hover:bg-red-600 hover:text-white rounded-full p-2 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500"
                        onClick={() => deleteNewImage(index)}
                        aria-label="Delete image"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <Button type="submit" className="px-8">
              {isPending ? "Updating..." : "Update Property"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default UpdateFormProperty;
