"use client";
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

  return (
    <Card>
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
              <p>Seller Agent</p>
            </div>
            <div>
              <p className="text-muted-foreground">+ {sellerData.phone}</p>
            </div>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction}>
          {/* Campo oculto para enviar la ruta actual */}
          <input type="hidden" name="redirectTo" value={pathname} />
          <div className="flex flex-col gap-6">
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
                <Label htmlFor="name">Name</Label>
              </div>
              <Input id="name" type="text" name="name" required />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="message">Message</Label>
              </div>
              <Textarea id="message" name="message" required />
            </div>
            <Button type="submit" className="w-full">
              {isPending ? "Loading..." : "Contact"}
            </Button>
          </div>
          {state?.success && (
            <div className="mt-4 text-center text-sm text-green-500">
              {state.message}
            </div>
          )}
          {state?.success === false && (
            <div className="mt-4 text-center text-sm text-red-400">
              {state.message}{" "}
              <Link
                className="text-blue-500 underline hover:underline"
                href={`/auth/login?redirectTo=${encodeURIComponent(pathname)}`}
              >
                {" "}
                Login
              </Link>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
};
