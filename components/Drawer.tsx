"use client";
import { useEffect, useRef, useState } from "react";
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

  const [isMounted, setIsMounted] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);

  // Handle mount/unmount with animation
  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);

      // Double RAF ensures portal DOM is fully mounted before animation runs
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimated(true);
        });
      });
    } else {
      setIsAnimated(false);

      const timeout = setTimeout(() => {
        setIsMounted(false);
      }, 300);

      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  // Prevent scroll + ESC
  useEffect(() => {
    if (!isMounted) return;

    const body = document.body;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscape);

    return () => {
      body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isMounted, onClose]);

  if (!isMounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* BACKDROP */}
      <div
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ${
          isAnimated ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      ></div>

      {/* DRAWER */}
      <aside
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
        className={`
          relative w-full max-w-md h-full bg-white dark:bg-black shadow-xl 
          transform transition-transform duration-300 ease-in-out
          ${isAnimated ? "translate-x-0" : "translate-x-full"}
        `}
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
