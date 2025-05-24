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
import { useEffect, useTransition, useMemo, useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { formatPrice } from "@/app/utils/formatPrice";
import { UseSelect } from "@/hooks/UseSelect";
import {
  contractTypeOptions,
  currencyTypeLablesOptions,
  propertyTypeOptions,
} from "@/app/utils/translations/translations";
import { memo } from "react";

type Inputs = {
  type: string;
  contract: string;
  minprice: string;
  maxprice: string;
  currency: string;
  city: string;
};

type citiesProp = {
  value: string;
  label: string;
};

type Props = {
  cities: citiesProp[] | null;
};

const FilterProperties = memo(function FilterProperties({ cities }: Props) {
  const [isPending, setTransition] = useTransition();
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialValues = useMemo(
    () => ({
      type: searchParams.get("Type") || "",
      contract: searchParams.get("Contract") || "",
      minprice: searchParams.get("Minprice") || "",
      maxprice: searchParams.get("Maxprice") || "",
      currency: searchParams.get("Currency") || "",
      city: searchParams.get("City") || "",
    }),
    [searchParams]
  );

  const { handleSubmit, watch, setValue, reset } = useForm<Inputs>({
    defaultValues: initialValues,
  });

  const onSubmit: SubmitHandler<Inputs> = useCallback(
    (data) => {
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

      sessionStorage.setItem("scrollToResults", "true");

      setTransition(async () => {
        router.replace(`?${params.toString()}`, { scroll: false });
      });
    },
    [router, setTransition]
  );

  useEffect(() => {
    // Solo resetear el formulario si los valores han cambiado significativamente
    const currentValues = {
      type: searchParams.get("Type") || "",
      contract: searchParams.get("Contract") || "",
      minprice: searchParams.get("Minprice") || "",
      maxprice: searchParams.get("Maxprice") || "",
      currency: searchParams.get("Currency") || "",
      city: searchParams.get("City") || "",
    };

    const hasChanged = Object.keys(currentValues).some(
      (key) =>
        currentValues[key as keyof typeof currentValues] !==
        initialValues[key as keyof typeof initialValues]
    );

    if (hasChanged) {
      reset(currentValues);
    }
  }, [searchParams, reset, initialValues]);

  return (
    <div className="w-full shadow-xl bg-white max-w-[300px] md:max-w-[900px] flex p-5 flex-col gap-4 rounded-md">
      <h2 className="text-2xl font-semibold">Filtra tu busqueda</h2>
      <form
        className="flex flex-col md:flex-row  items-center gap-6 " // Usa `gap-4` para mejor espacio entre elementos
        onSubmit={handleSubmit(onSubmit)}
      >
        <UseSelect
          data={propertyTypeOptions}
          setValue={setValue}
          value={watch("type")}
          placeholder="Tipo de propiedad"
          label="Selecciona el tipo"
          name={"type"}
        />
        <UseSelect
          data={contractTypeOptions}
          setValue={setValue}
          value={watch("contract")}
          placeholder="Tipo de contrato"
          label="Selecciona el tipo"
          name={"contract"}
        />
        <UseSelect
          data={cities}
          setValue={setValue}
          value={watch("city")}
          placeholder="Tipo de ciudad"
          label="Selecciona la ciudad"
          name={"city"}
        />
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
                        {currencyTypeLablesOptions.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
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
});

export default FilterProperties;
