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
import { Input } from "@/components/ui/input";
import { useEffect, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { formatPrice } from "@/app/utils/formatPrice";

const propertiesTypes = [
  { id: 1, name: "HOUSE", label: "Casas" },
  { id: 2, name: "APARTMENT", label: "Departamentos" },
];

const contractTypes = [
  { id: 1, name: "RENT", label: "Alquiler" },
  { id: 2, name: "SALE", label: "Venta" },
];

type Inputs = {
  type: string;
  contract: string;
  minprice: string;
  maxprice: string;
  currency: string;
  city: string;
};

type Props = {
  cities: string[] | null;
};

const currency = ["USD", "ARG"];

const FilterProperties = ({ cities }: Props) => {
  const [isPending, setTransition] = useTransition();
  const searchParams = useSearchParams();
  const router = useRouter();

  const {
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
      city: searchParams.get("City") || "",
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
    if (data.city) params.set("City", data.city);

    setTransition(async () => {
      router.replace(`?${params.toString()}`, { scroll: false });
    });

    setTimeout(() => {
      document
        .getElementById("property-section")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  useEffect(() => {
    const newValues = {
      type: searchParams.get("Type") || "",
      contract: searchParams.get("Contract") || "",
      minprice: searchParams.get("Minprice") || "",
      maxprice: searchParams.get("Maxprice") || "",
      currency: searchParams.get("Currency") || "",
      city: searchParams.get("City") || "",
    };
    reset(newValues);
  }, [searchParams, reset]);

  return (
    <div className="w-full shadow-xl bg-white max-w-[300px] md:max-w-[900px] flex p-5 flex-col gap-4 rounded-md">
      <h2 className="text-2xl font-semibold">Filtra tu busqueda</h2>
      <form
        className="flex flex-col md:flex-row  items-center gap-6 " // Usa `gap-4` para mejor espacio entre elementos
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-1 w-full  md:border-r-1 md:pr-6 ">
          <Label>Selecciona el tipo</Label>
          <Select
            onValueChange={(value) => {
              setValue("type", value);
            }}
            value={watch("type")}
          >
            <SelectTrigger className="w-full border-none outline-none shadow-none px-0">
              <SelectValue placeholder="Tipo de propiedad" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Tipo de propiedad</SelectLabel>
                {propertiesTypes.map((item) => (
                  <SelectItem key={item.id} value={item.name}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1 w-full  md:border-r-1 md:pr-6 ">
          <Label>Tipo de contrato</Label>
          <Select
            value={watch("contract") || searchParams.get("Contract") || ""}
            onValueChange={(value) => setValue("contract", value)}
          >
            <SelectTrigger className="w-full border-none outline-none shadow-none px-0">
              <SelectValue placeholder="Contrato" className="font-light" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Contrato</SelectLabel>
                {contractTypes.map((item) => (
                  <SelectItem key={item.id} value={item.name}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1 w-full  md:border-r-1 md:pr-6 ">
          <Label>Seleccionar Ciudad</Label>
          <Select
            value={watch("city") || searchParams.get("City") || ""}
            onValueChange={(value) => setValue("city", value)}
          >
            <SelectTrigger className="w-full border-none outline-none shadow-none px-0">
              <SelectValue placeholder="Ciudad" className="font-light" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Ciudad</SelectLabel>
                {cities?.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1 w-full  md:border-r-1 md:pr-6 ">
          <Label>Precio</Label>
          <Select>
            <SelectTrigger className="w-full border-none outline-none shadow-none px-0">
              <SelectValue placeholder="Precio" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Precio</SelectLabel>
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
                      <SelectValue placeholder="Moneda" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Moneda</SelectLabel>
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
                      placeholder="precio min"
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
                      placeholder="precio max"
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
            className="w-full bg-[#4A60A1]"
            type="submit"
            disabled={isPending}
          >
            {isPending ? "Cargando.." : "Buscar"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FilterProperties;
