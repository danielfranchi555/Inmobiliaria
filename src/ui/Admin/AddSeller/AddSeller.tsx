"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { createSeller } from "@/app/admin/sellers/actions";
import { userSchema } from "@/app/schemas/createSeller";

type Inputs = z.infer<typeof userSchema>;

const AddSeller = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string>("");
  const [dialogClose, setDialogClose] = useState<boolean>(false);

  const form = useForm<Inputs>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      role: "SELLER",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    startTransition(async () => {
      const response = await createSeller(data);
      if (response.success === false) {
        setError(response.message);
        return;
      }
      setDialogClose(false);
      toast("User has been created", {
        description: new Date().toLocaleString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
        action: {
          label: "Exit",
          onClick: () => console.log("Undo"),
        },
      });
    });
  };

  return (
    <Dialog open={dialogClose} onOpenChange={setDialogClose}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Seller</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Add Seller</DialogTitle>
            <DialogDescription>
              Add a new seller to the system. Click save when you are done.
            </DialogDescription>
            <div className="mt-4 space-y-4 ">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input {...form.register("name")} placeholder="Name" />
                  <p className="text-sm text-red-500">
                    {form.formState.errors.name?.message}
                  </p>
                </div>
                <div className="space-y-2">
                  <Label>Lastname</Label>
                  <Input
                    {...form.register("lastname")}
                    placeholder="lastname"
                  />
                  <p className="text-sm text-red-500">
                    {form.formState.errors.lastname?.message}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2  ">
                <div className="space-y-2 w-full col-span-2">
                  <Label>Email</Label>
                  <Input
                    {...form.register("email")}
                    placeholder="Email"
                    className="w-full"
                  />
                  <p className="text-sm text-red-500">
                    {form.formState.errors.email?.message}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 ">
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input {...form.register("phone")} placeholder="Phone" />
                  <p className="text-sm text-red-500">
                    {form.formState.errors.phone?.message}
                  </p>
                </div>
                <div className="space-y-2">
                  <Label>Password</Label>
                  <Input
                    type="password"
                    {...form.register("password")}
                    placeholder="Password"
                  />
                  <p className="text-sm text-red-500">
                    {form.formState.errors.password?.message}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <Input
                  onChange={() => form.setValue("role", "SELLER")}
                  placeholder="Role"
                  disabled={true}
                  defaultValue={"SELLER"}
                />
                <p className="text-sm text-red-500">
                  {form.formState.errors.role?.message}
                </p>
              </div>
            </div>
          </DialogHeader>
          <div className="grid gap-4 py-4"></div>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Saving..." : "Save changes"}
          </Button>
          {error && error}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddSeller;
