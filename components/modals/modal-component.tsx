// components/modals/modal-component.tsx
"use client";
import { useState, useEffect } from "react";
import { Modal } from "../ui/modal";

export const ModalComponent: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // 클라이언트에서 즉시 모달을 열도록 설정
  useEffect(() => {
    setIsOpen(true); // hydration 직후 모달을 강제로 열음
  }, []);

  return (
    <>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="My Modal"
          description="This is a modal example"
        >
          <div className="modal-content">
            {children}
            <button onClick={() => setIsOpen(false)}>Close</button>
          </div>
        </Modal>
      )}
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
    </>
  );
};
