"use client";

import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "../ui/modal";

export const StoreModal = () => {
  const { onClose, isOpen } = useStoreModal();
  return (
    <Modal
      title="Create Store"
      description="Add a new store to manage products and categories"
      isOpen={isOpen}
      onClose={onClose}
    >
      Future Create Store Form
    </Modal>
  );
};
