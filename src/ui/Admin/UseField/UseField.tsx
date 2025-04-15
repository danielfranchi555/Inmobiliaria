import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { Inputs } from "../UpdateFormProperty/UpdateFormProperty";

type Props = {
  value: keyof Inputs;
  register: UseFormRegister<Inputs>;
  errors: FieldErrors;
  label: string;
  type: string | "";
  placeholder: string;
  min: number | undefined;
};

const UseField = ({
  register,
  errors,
  value,
  placeholder,
  type,
  label,
  min,
}: Props) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="parkingSpaces">{label}</Label>
      <Input
        id="parkingSpaces"
        {...register(`${value}`)}
        type={type}
        placeholder={placeholder}
        className="w-full"
        min={min}
      />
      {typeof errors.value?.message === "string" && (
        <p className="text-sm text-red-500">{errors.value.message}</p>
      )}
    </div>
  );
};

export default UseField;
