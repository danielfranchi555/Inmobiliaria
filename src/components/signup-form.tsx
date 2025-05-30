"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState, useEffect, useState } from "react";
import { registerUser } from "@/app/auth/actions";
import Link from "next/link";
import { useRouter } from "next/navigation";

export type FormState =
  | {
      success: boolean;
      role?: string;
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
        lastname?: string[];
        phone?: string[];
      };
      redirectUrl?: string;
      message?: string;
    }
  | undefined;

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const initialState: FormState = { success: false };

  const [state, formAction, isPending] = useActionState(
    registerUser,
    initialState
  );

  const router = useRouter();

  // Estado para mantener los valores del form
  const [formValues, setFormValues] = useState({
    name: "",
    lastname: "",
    phone: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (state?.success && state.redirectUrl) {
      router.push(state.redirectUrl);
    }
  }, [state, router]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center ">
          <CardTitle className="text-xl">Registrarse</CardTitle>
          <CardDescription className="pb-4 text-muted-foreground">
            Crea una cuenta para comenzar. Por favor completa tus datos{" "}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nombre</Label>
                  <Input
                    type="text"
                    required
                    name="name"
                    id="name"
                    value={formValues.name}
                    onChange={handleChange}
                    aria-invalid={state?.errors?.name ? true : false}
                    aria-describedby="name-error"
                  />
                  {state?.errors?.name && (
                    <p id="name-error" className="text-sm text-red-500">
                      {state.errors.name[0]}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lastname">Apellido</Label>
                  <Input
                    type="text"
                    required
                    name="lastname"
                    id="lastname"
                    value={formValues.lastname}
                    onChange={handleChange}
                    aria-invalid={state?.errors?.lastname ? true : false}
                    aria-describedby="lastname-error"
                  />
                  {state?.errors?.lastname && (
                    <p id="lastname-error" className="text-sm text-red-500">
                      {state.errors.lastname[0]}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    type="text"
                    required
                    name="phone"
                    id="phone"
                    value={formValues.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                    aria-invalid={state?.errors?.email ? true : false}
                    aria-describedby="email-error"
                  />
                  {state?.errors?.email && (
                    <p id="email-error" className="text-sm text-red-500">
                      {state.errors.email[0]}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Contraseña</Label>
                  </div>
                  <Input
                    name="password"
                    id="password"
                    type="password"
                    required
                    value={formValues.password}
                    onChange={handleChange}
                    aria-invalid={state?.errors?.password ? true : false}
                    aria-describedby="password-error"
                  />
                  {state?.errors?.password && (
                    <p id="password-error" className="text-sm text-red-500">
                      {state.errors.password[0]}
                    </p>
                  )}
                </div>
                <Button disabled={isPending} type="submit" className="w-full">
                  {isPending ? "Cargando..." : "Registrarse"}
                </Button>
              </div>
              <div className="text-center text-sm">
                ¿Ya tienes una cuenta?{" "}
                <Link
                  href="/auth/login"
                  className="underline underline-offset-4"
                >
                  Iniciar sesión
                </Link>
              </div>
            </div>
            {state?.success === false && (
              <div className="mt-4 text-sm text-red-500">
                <p className="text-center">{state.message} </p>
              </div>
            )}
          </form>
          <div className="flex items-center justify-center">
            <Link
              href={"/"}
              className="text-blue-500 text-center underline flex-col justify-center items-center gap-1"
            >
              Inicio
            </Link>
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        Al hacer clic en continuar, aceptas nuestros{" "}
        <a href="#">Términos de servicio</a> y nuestra{" "}
        <a href="#">Política de privacidad</a>.
      </div>
    </div>
  );
}
