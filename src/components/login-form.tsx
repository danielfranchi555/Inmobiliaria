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
import { useActionState, useEffect } from "react";
import { login } from "@/app/auth/actions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogIn } from "lucide-react";

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

  useEffect(() => {
    if (state?.success && state.redirectUrl) {
      router.push(state.redirectUrl);
    }
  }, [state, router]);
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
                {state?.message && !state?.success && (
                  <div className="flex items-start gap-3 p-4 border border-red-400 text-red-700 bg-red-50 rounded-md">
                    {/* <LogIn className="w-5 h-5 mt-0.5" /> */}
                    <div>
                      <p className="font-semibold">Login failed</p>
                      <p className="text-sm">{state.message}</p>
                    </div>
                  </div>
                )}
              </div>
              <Link
                href={"/"}
                className="text-blue-500 text-center underline flex-col justify-center items-center gap-1"
              >
                Home
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
