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
import { useActionState, useEffect, useTransition, useState } from "react";
import { login } from "@/app/auth/actions";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export type FormStateLogin =
  | {
      success: boolean;
      errors?: {
        email?: string[];
        password?: string[];
      };
      redirectUrl?: string;
      message?: string;
    }
  | undefined;

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "";
  const initialState: FormStateLogin = {
    success: false,
    errors: {
      email: [],
      password: [],
    },
    redirectUrl: "",
    message: "",
  };

  const [state, formAction, isPending] = useActionState(login, initialState);
  const router = useRouter();
  const [isRedirecting, startRedirect] = useTransition();

  // Estado local para controlar inputs y que no se limpien
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (state?.success && state.redirectUrl) {
      startRedirect(() => {
        router.push(state.redirectUrl!);
      });
    }
  }, [state, router]);

  // Actualizamos formValues cuando el usuario escribe
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
          <CardTitle className="text-xl">Bienvenido de nuevo</CardTitle>
          <CardDescription className="pb-4 text-muted-foreground">
            ¡Bienvenido de nuevo! Por favor, ingresa tus datos.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <input type="hidden" name="redirectTo" value={redirectTo} />
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@ejemplo.com"
                    required
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                    aria-describedby="email-error"
                  />
                  {state?.errors?.email && (
                    <p id="email-error" className="text-red-600 text-sm mt-1">
                      {state.errors.email.join(", ")}
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
                    aria-describedby="password-error"
                  />
                  {state?.errors?.password && (
                    <p
                      id="password-error"
                      className="text-red-600 text-sm mt-1"
                    >
                      {state.errors.password.join(", ")}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isPending || isRedirecting}
                >
                  {isPending || isRedirecting ? "Cargando..." : "Inicia sesión"}
                </Button>
              </div>
              <div className="text-center text-sm ">
                ¿No tienes una cuenta?{" "}
                <Link
                  href="/auth/signUp"
                  className="underline underline-offset-4"
                >
                  Regístrate{" "}
                </Link>
                {state?.message && !state?.success && (
                  <div className="flex flex-col justify-center items-center gap-1 p-4 border border-red-400 text-red-700 bg-red-50 rounded-md mt-4">
                    <p className="font-semibold">Error al iniciar sesión</p>
                    <p className="text-sm">{state.message}</p>
                  </div>
                )}
              </div>
              <Link
                href={"/"}
                className="text-blue-500 text-center underline flex-col justify-center items-center gap-1"
              >
                Inicio
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
