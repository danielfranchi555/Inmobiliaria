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
import { login } from "@/app/auth/actions";
import Link from "next/link";

export type FormStateLogin =
  | {
      success: boolean;
      errors?: {
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const initialState: FormStateLogin = {
    success: false,
    errors: {
      email: [],
      password: [],
    },
    message: "",
  };
  const [state, formAction, isPending] = useActionState(login, initialState);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center ">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription className="pb-4 text-muted-foreground">
            Welcome back! Please enter your details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    name="email"
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
                    name="password"
                    id="password"
                    type="password"
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  {isPending ? "Loading..." : "Login"}
                </Button>
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link
                  href="/auth/signUp"
                  className="underline underline-offset-4"
                >
                  Sign up
                </Link>
                {state.success === false && (
                  <div className="mt-4 text-sm text-red-500">
                    {state.message}
                  </div>
                )}
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>

    /* <Card>
        <CardHeader className="py-4">
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
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
                <Input name="password" id="password" type="password" required />
                {state?.errors?.password && (
                  <div>
                    <ul>
                      {state.errors.password.map((error) => (
                        <p className="text-sm text-red-500" key={error}>
                          {error}
                        </p>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  {isPending ? "Loading..." : "Login"}
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link
                href={"/auth/signUp"}
                className="underline underline-offset-4"
              >
                Sign up
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
      </Card> */
  );
}
