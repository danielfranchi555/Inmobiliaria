"use client";

import { FieldErrors, UseFormSetValue, UseFormTrigger } from "react-hook-form";
import { Inputs } from "../UpdateFormProperty/UpdateFormProperty";
import { useRef } from "react";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { X, UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";
import { sizeCalculator } from "@/app/utils/calculateSize";
import { toast } from "sonner";

type Props = {
  value: string;
  setValue: UseFormSetValue<Inputs>;
  trigger: UseFormTrigger<Inputs>;
  errors: FieldErrors<Inputs>;
  watchImages: File[]; // Added watchImages prop
};

const ImageUploader = ({ watchImages, errors, setValue, trigger }: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const fileArray = Array.from(files || []);
    const resultSize = sizeCalculator(fileArray as unknown as File[]);
    if (!resultSize.success) {
      toast("Error uploading images", {
        description: (
          <span className="text-red-500 text-sm">{resultSize.message}</span>
        ),
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
      return;
    }
    // const fileArray: File[] = Array.from(files);

    const updatedFiles = [...(watchImages || []), ...fileArray];
    setValue("images", updatedFiles);
    trigger("images");
  };

  const handleRemove = (index: number) => {
    const updated =
      (watchImages as File[] | undefined)?.filter((_, i) => i !== index) || [];
    setValue("images", updated);
    trigger("images");
  };

  return (
    <div className="space-y-4">
      <Label htmlFor="images" className="block text-sm font-medium mb-1">
        Upload Images
      </Label>

      {/* Estilo moderno con ícono */}
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition text-sm"
      >
        <UploadCloud size={18} />
        Select Images
      </button>

      {/* Input hidden */}
      <input
        ref={inputRef}
        type="file"
        id="images"
        name="images"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        hidden
        data-testid="image-upload"
      />

      {/* Previews */}
      {watchImages && watchImages.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {(watchImages as File[]).map((file, index) => (
            <div key={index} className="relative group">
              <Image
                src={URL.createObjectURL(file)}
                alt={`Preview ${index}`}
                width={120}
                height={120}
                className="rounded-md w-full h-28 object-cover border"
              />
              <div className="absolute inset-0 bg-black/20 bg-opacity-50 rounded-md opacity-100 transition"></div>
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className={cn(
                  "absolute cursor-pointer top-1 right-1 bg-white text-black rounded-full p-1 shadow hover:bg-red-500 hover:text-white transition"
                )}
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Errores */}
      {errors.images && (
        <p className="text-red-500 text-sm">{errors.images.message}</p>
      )}
    </div>
  );
};

export default ImageUploader;
