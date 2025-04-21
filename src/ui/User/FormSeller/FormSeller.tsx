"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useActionState } from "react";
import { contactSeller } from "@/app/(home)/propertie/[id]/actions";
export const FormSeller = () => {
  const initialState = {
    success: false,
  };
  const [state, formAction, isPending] = useActionState(
    contactSeller,
    initialState
  );
  return (
    <Card>
      <CardHeader>
        <CardDescription className="flex py-4 gap-2">
          <Avatar>
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col ">
            <div>
              <h4 className="font-bold">Carlos Rodriguez</h4>
              <p>Seller Agent</p>
            </div>
            <div>
              <p className="text-muted-foreground">+123 456 7890</p>
            </div>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Name</Label>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <a href="#" className="underline underline-offset-4">
              Sign up
            </a>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
