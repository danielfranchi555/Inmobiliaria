"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type Props = {
  onConfirm: () => Promise<string>;
};

const Alert = ({ onConfirm }: Props) => {
  const [isPending, startTransition] = useState(false);
  const [error, setError] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false); // Controla si el diálogo está abierto

  const handleConfirm = async () => {
    setError(""); // Reset error state before starting
    startTransition(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulate delay
      await onConfirm();
      setIsOpen(false); // Cierra el diálogo si la acción es exitosa
    } catch (err) {
      setError("An error occurred while processing your request.");
    } finally {
      startTransition(false);
    }
  };

  return (
    <>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogTrigger asChild>
          <Button variant={"destructive"}>Delete</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
            <Button onClick={handleConfirm} disabled={isPending}>
              {isPending ? "Processing..." : "Continue"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Alert;
