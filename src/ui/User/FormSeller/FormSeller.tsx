"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useActionState } from "react";
import { contactSeller } from "@/app/(home)/propertie/[id]/actions";
import Link from "next/link";
import { capitalizeFirstLetter } from "@/app/utils/capitalizeFirstLetter";
import { getInitials } from "@/app/utils/nameAvatar";
import { usePathname } from "next/navigation";

type FormStateSeller =
  | {
      success: boolean;
      message: string;
      errors?: {
        email?: string[];
        name?: string[];
        telefono?: string[];
        message?: string[];
      };
    }
  | undefined;

type Props = {
  sellerData: {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    lastName: string;
  };
};

export const FormSeller = ({ sellerData }: Props) => {
  const pathname = usePathname();
  const initialState: FormStateSeller = undefined;
  const [state, formAction, isPending] = useActionState(
    contactSeller,
    initialState
  );

  // Estados controlados para inputs
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [telefono, setTelefono] = useState("");
  const [message, setMessage] = useState("");

  // Cuando cambia el estado (respuesta), si fue éxito limpiamos campos
  useEffect(() => {
    if (state?.success) {
      setEmail("");
      setName("");
      setTelefono("");
      setMessage("");
    }
  }, [state]);

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardDescription className="flex py-4 gap-2">
          <Avatar>
            <AvatarFallback>
              {getInitials(sellerData.name, sellerData.lastName)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <div>
              <h4 className="font-bold">
                {capitalizeFirstLetter(sellerData.name)}{" "}
                {capitalizeFirstLetter(sellerData.lastName)}
              </h4>
              <p>Agente - Vendedor</p>
            </div>
            <div>
              <p className="text-muted-foreground">+ {sellerData.phone}</p>
            </div>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between">
        <form
          action={formAction}
          className="flex flex-col gap-6 h-full justify-between"
        >
          <input type="hidden" name="redirectTo" value={pathname} />

          <div className="flex flex-col gap-6 flex-grow">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@Ejemplo.com"
                required
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isPending}
              />
              {state?.errors?.email && (
                <p className="text-red-500 text-sm mt-1">
                  {state.errors.email[0]}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                type="text"
                name="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isPending}
              />
              {state?.errors?.name && (
                <p className="text-red-500 text-sm mt-1">
                  {state.errors.name[0]}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="telefono">Teléfono</Label>
              <Input
                id="telefono"
                type="text"
                name="telefono"
                required
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                disabled={isPending}
              />
              {state?.errors?.telefono && (
                <p className="text-red-500 text-sm mt-1">
                  {state.errors.telefono[0]}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="message">Mensaje</Label>
              <Textarea
                id="message"
                name="message"
                required
                className="h-24 resize-none"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={isPending}
              />
              {state?.errors?.message && (
                <p className="text-red-500 text-sm mt-1">
                  {state.errors.message[0]}
                </p>
              )}
            </div>
          </div>

          <div>
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Enviando..." : "Contactar"}
            </Button>

            {state?.success && (
              <div className="mt-4 text-center text-sm text-green-500">
                {state.message}
              </div>
            )}

            {/* Error sin campos, muestra link Login */}
            {state?.success === false && !state?.errors && (
              <div className="mt-4 text-center text-sm text-red-400">
                {state.message}{" "}
                <Link
                  className="text-blue-500 underline hover:underline"
                  href={`/auth/login?redirectTo=${encodeURIComponent(pathname)}`}
                >
                  Iniciar sesion
                </Link>
              </div>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
