"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { formatPrice } from "@/app/utils/formatPrice";

const propertiesTypes = [
  { id: 1, name: "HOUSE", label: "House" },
  { id: 2, name: "APARTMENT", label: "Apartment" },
  { id: 3, name: "COMMERCIAL", label: "Commercial" },
  { id: 4, name: "LAND", label: "Land" },
];

const contractTypes = [
  { id: 1, name: "RENT", label: "Rent" },
  { id: 2, name: "SALE", label: "Sale" },
];

type Inputs = {
  type: string;
  contract: string;
  minprice: string;
  maxprice: string;
  currency: string;
};

const currency = ["USD", "ARG"];

const FilterProperties = () => {
  const [isPending, setTransition] = useTransition();
  const searchParams = useSearchParams();
  const router = useRouter();
  // const [formattedPrice, setFormattedPrice] = useState({
  //   minprice: "",
  //   maxprice: "",
  // });

  const params = new URLSearchParams(searchParams.toString());

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      type: searchParams.get("Type") || "",
      contract: searchParams.get("Contract") || "",
      minprice: searchParams.get("Minprice") || "",
      maxprice: searchParams.get("Maxprice") || "",
      currency: searchParams.get("Currency") || "",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const params = new URLSearchParams();

    // Resetear siempre a página 1 al aplicar nuevos filtros
    params.set("page", "1");

    // Setear nuevos valores
    if (data.type) params.set("Type", data.type);
    if (data.contract) params.set("Contract", data.contract);
    if (data.currency) params.set("Currency", data.currency);
    if (data.minprice) params.set("Minprice", data.minprice);
    if (data.maxprice) params.set("Maxprice", data.maxprice);

    setTransition(async () => {
      router.replace(`?${params.toString()}`, { scroll: false });
    });

    setTimeout(() => {
      document
        .getElementById("property-section")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  // const handleInputPrice = (
  //   e: React.ChangeEvent<HTMLInputElement>,
  //   key: string
  // ) => {
  //   // Eliminar comas antes de guardar en el estado
  //   const rawValue = e.target.value.replace(/,/g, "");
  //   const numericValue = parseFloat(rawValue);

  //   if (!isNaN(numericValue)) {
  //     // Guardar solo el valor numérico
  //     setFormattedPrice((prev) => ({
  //       ...prev,
  //       [key]: formatPrice(numericValue),
  //     }));
  //     setValue(key as "minprice" | "maxprice", numericValue.toString());
  //   } else {
  //     // Si no es un número válido, limpiar el valor
  //     setFormattedPrice((prev) => ({ ...prev, [key]: "" }));
  //     setValue(key as "minprice" | "maxprice", "");
  //   }
  // };
  useEffect(() => {
    const newValues = {
      type: searchParams.get("Type") || "",
      contract: searchParams.get("Contract") || "",
      minprice: searchParams.get("Minprice") || "",
      maxprice: searchParams.get("Maxprice") || "",
      currency: "",
    };
    reset(newValues);
  }, [searchParams, reset]);

  return (
    <div className="w-full  bg-white max-w-[900px] flex p-5 flex-col gap-4 rounded-md">
      <h2 className="text-2xl font-semibold">Filter your search</h2>
      <form
        className="flex flex-col md:flex-row items-center gap-4 " // Usa `gap-4` para mejor espacio entre elementos
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-1 w-full">
          <Label>Type</Label>
          <Select
            onValueChange={(value) => {
              setValue("type", value);
            }}
            value={watch("type")}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Type</SelectLabel>
                {propertiesTypes.map((item) => (
                  <SelectItem key={item.id} value={item.name}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1 w-full">
          <Label>Contract</Label>
          <Select
            value={watch("contract") || searchParams.get("Contract") || ""}
            onValueChange={(value) => setValue("contract", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Contract" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Contract</SelectLabel>
                {contractTypes.map((item) => (
                  <SelectItem key={item.id} value={item.name}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1 w-full">
          <Label>Price</Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Price" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Price</SelectLabel>
                <div className="flex  flex-col gap-2">
                  <Select
                    value={
                      watch("currency") || searchParams.get("Currency") || ""
                    }
                    // defaultValue={searchParams.get("Currency") || ""}
                    // value={searchParams.get("Currency") || ""}
                    onValueChange={(value) => setValue("currency", value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>currency</SelectLabel>
                        {currency.map((item) => (
                          <SelectItem key={item} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <div className="flex flex-col md:flex-row md:items-center gap-2">
                    <Input
                      placeholder="min price"
                      value={
                        watch("minprice")
                          ? formatPrice(Number(watch("minprice")))
                          : ""
                      }
                      onChange={(e) => {
                        const raw = e.target.value.replace(/,/g, "");
                        const number = parseInt(raw, 10);
                        setValue(
                          "minprice",
                          isNaN(number) ? "" : number.toString()
                        );
                      }}
                    />
                    <Input
                      placeholder="max price"
                      value={
                        watch("maxprice")
                          ? formatPrice(Number(watch("maxprice")))
                          : ""
                      }
                      onChange={(e) => {
                        const raw = e.target.value.replace(/,/g, "");
                        const number = parseInt(raw, 10);
                        setValue(
                          "maxprice",
                          isNaN(number) ? "" : number.toString()
                        );
                      }}
                    />
                  </div>
                </div>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col items-center w-full mt-4">
          <Button
            className="w-full bg-green-500"
            type="submit"
            disabled={isPending}
          >
            {isPending ? "Loading..." : "Search"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FilterProperties;
