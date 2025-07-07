"use client";

import { useActionState, useEffect, startTransition } from "react";
import { useStoreModal } from "@/hooks/use-store-modal";
import { toast } from "sonner";
const { useRouter } = require("next/navigation");
import { Modal } from "@/components/ui/modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { StoreSchema } from "@/schemas";
import { storeAction } from "@/actions/store";
import * as z from "zod";

export const StoreModal = () => {
  const { onClose, isOpen } = useStoreModal();
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(storeAction, {
    success: false,
    message: undefined,
    errors: [],
  });

  const form = useForm<z.infer<typeof StoreSchema>>({
    resolver: zodResolver(StoreSchema),
    defaultValues: { name: "" },
  });

  const onSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    try {
      evt.preventDefault();
      const formElement = evt.currentTarget as HTMLFormElement;
      form.handleSubmit(() => {
        startTransition(() => {
          formAction(new FormData(formElement));
        });
      })(evt);
    } catch (error) {
      toast.error("Failed to create store. Please try again.");
    }
  };

  useEffect(() => {
    if (state?.success) {
      onClose();
      router.push(`/${state?.store?.id}`); // Redirect to the root or dashboard page
      toast.success(state.message || "Store created successfully!");
    }
  }, [state?.success, onClose, form]);

  return (
    <Modal
      title="Create Store"
      description="Add a new store to manage products and categories"
      isOpen={isOpen}
      onClose={onClose}
    >
      <Form {...form}>
        <form className="space-y-4" onSubmit={onSubmit}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="E-Commerce"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <div className="pt-6 space-x-2 flex items-center justify-end w-full">
            <Button disabled={isPending} variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button disabled={isPending} type="submit">
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};
