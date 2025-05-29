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

  const watchAllFields = watch();

  const isFilterApplied = useMemo(() => {
    return Object.values(watchAllFields).some((value) => value !== "");
  }, [watchAllFields]);

  const onSubmit: SubmitHandler<Inputs> = useCallback(
    (data) => {
      const params = new URLSearchParams();
      params.set("page", "1");
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
    <div className="shadow-xl bg-white w-full md:max-w-[990px] flex p-3 md:px-5 flex-col gap-4 rounded-md">
      <h2 className="text-2xl font-semibold">Filtra tu búsqueda</h2>
      <form
        className="grid grid-cols-1 md:grid-cols-5 gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <UseSelect
          data={propertyTypeOptions}
          setValue={setValue}
          value={watch("type")}
          placeholder="Tipo de inmueble"
          label="Selecciona el tipo"
          name="type"
        />
        <UseSelect
          data={contractTypeOptions}
          setValue={setValue}
          value={watch("contract")}
          placeholder="Tipo de contrato"
          label="Selecciona el contrato"
          name="contract"
        />
        <UseSelect
          data={cities}
          setValue={setValue}
          value={watch("city")}
          placeholder="Ciudad"
          label="Selecciona la ciudad"
          name="city"
        />
        <div className=" flex flex-col gap-1 w-full md:border-r-1 md:pr-6">
          <Label>Selecciona el Precio</Label>
          <Select>
            <SelectTrigger className="w-full border-none outline-none shadow-none px-0">
              <SelectValue placeholder="Precio" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Precio</SelectLabel>
                <div className="flex flex-col gap-2">
                  <Select
                    value={watch("currency") || ""}
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

        <div className="w-full mt-4  md:col-span-1">
          <Button
            className="w-full bg-[#4A60A1]"
            type="submit"
            disabled={isPending || !isFilterApplied}
          >
            {isPending ? "Cargando.." : "Buscar"}
          </Button>
        </div>
      </form>
    </div>
  );
});

export default FilterProperties;
