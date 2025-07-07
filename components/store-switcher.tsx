"use client";
import { useState } from "react";
import { Check, ChevronsUpDown, PlusCircle, StoreIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Store } from "@prisma/client";
import { useStoreModal } from "@/hooks/use-store-modal";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

type PopoverTriggerProps = React.ComponentPropsWithRef<typeof PopoverTrigger>;

interface StoreSwitcherProps extends PopoverTriggerProps {
  items: Store[];
}

export const StoreSwitcher = ({
  className,
  items = [],
}: StoreSwitcherProps) => {
  const [open, setOpen] = useState(false);
  const storeModal = useStoreModal();
  const params = useParams();
  const router = useRouter();

  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const currentStore = formattedItems.find(
    (item) => item.value === params.storeId
  );

  const onStoreSelect = (store: { value: string }) => {
    setOpen(false);
    router.push(`/${store.value}`);
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          role="combobox"
          size={"sm"}
          variant="outline"
          aria-expanded={open}
          aria-label="Select a store"
          className={cn("w-[200px] justify-between", className)}
        >
          <StoreIcon />
          {currentStore?.label}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search store" />
            <CommandEmpty>No store found.</CommandEmpty>
            <CommandGroup heading="Stores">
              {formattedItems.map((store) => (
                <CommandItem
                  key={store.value}
                  onSelect={() => onStoreSelect(store)}
                  className="text-sm"
                >
                  <StoreIcon className="mr-2 h-4 w-4" />
                  {store.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      currentStore?.value === store.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                  storeModal.onOpen();
                }}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Store
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
