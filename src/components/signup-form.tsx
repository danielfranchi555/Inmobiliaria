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
import { useActionState } from "react";
import { registerUser } from "@/app/auth/actions";
import Link from "next/link";

export type FormState =
  | {
      success: boolean;
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
        phone?: string[];
      };
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

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Register to your account</CardTitle>
          <CardDescription>
            Enter your credentials below to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Name</Label>
                <Input type="text" required name="name" />
                {state?.errors?.name && (
                  <div>
                    <ul>
                      {state.errors.name.map((error) => (
                        <p className="text-sm text-red-500" key={error}>
                          - {error}
                        </p>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Phone</Label>
                <Input
                  name="phone"
                  type="text"
                  placeholder="m@example.com"
                  required
                />
                {state?.errors?.phone && (
                  <div>
                    <ul>
                      {state.errors.phone.map((error) => (
                        <p className="text-sm text-red-500" key={error}>
                          - {error}
                        </p>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  name="email"
                  required
                />
                {state?.errors?.email && (
                  <div>
                    <ul>
                      {state.errors.email.map((error) => (
                        <p className="text-sm text-red-500" key={error}>
                          - {error}
                        </p>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" required name="password" />
                {state?.errors?.password && (
                  <div>
                    <ul>
                      {state.errors.password.map((error) => (
                        <p className="text-sm text-red-500" key={error}>
                          - {error}
                        </p>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  {isPending ? "Loading..." : "Register"}
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              have an account?{" "}
              <Link
                href={"/auth/login"}
                className="underline underline-offset-4"
              >
                Login
              </Link>
            </div>
            {state?.success && (
              <div className="mt-4 text-center text-sm text-green-500">
                {state.message}
              </div>
            )}
            {state?.success === false && (
              <div className="mt-4 text-center text-sm text-red-500">
                {state.message}
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
