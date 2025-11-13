"use client";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => unknown;
  children: React.ReactNode;
  labelledBy?: string;
}

export default function Drawer({
  isOpen,
  onClose,
  children,
  labelledBy,
}: DrawerProps) {
  const drawerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleEscapeKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKeyDown);
      drawerRef.current?.focus();
    }
    return () => document.removeEventListener("keydown", handleEscapeKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="fixed inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      ></div>
      <aside
        className="relative w-full max-w-md h-full bg-white dark:bg-black shadow-xl transform transition-transform duration-300 ease-in-out translate-x-0"
        ref={drawerRef}
        aria-labelledby={labelledBy}
        role="dialog"
        aria-modal={"true"}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close drawer"
          className="absolute top-6 right-4 z-10 flex items-center justify-center p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <span className="material-symbols-outlined text-gray-600 dark:text-gray-400">
            close
          </span>
        </button>
        {children}
      </aside>
    </div>,
    document.body
  );
}
