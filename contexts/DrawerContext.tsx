"use client";
import { createContext, useContext, useState } from "react";

interface DrawerContextProps {
  isOpen: boolean;
  onOpen: () => unknown;
  onClose: () => unknown;
}

export const CartDrawerContext = createContext<DrawerContextProps>({
  isOpen: false,
  onOpen: () => {},
  onClose: () => {},
});

export const CardDrawerContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <CartDrawerContext.Provider
      value={{
        isOpen,
        onOpen,
        onClose,
      }}
    >
      {children}
    </CartDrawerContext.Provider>
  );
};

export const useCartDrawer = () => {
  const context = useContext(CartDrawerContext);

  if (!context) {
    throw new Error("Must be used with a Provider");
  }
  return context;
};
