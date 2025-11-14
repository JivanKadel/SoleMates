"use client";
import { createContext, useContext, useState } from "react";

interface DrawerContextProps {
  isOpen: boolean;
  onOpen: () => unknown;
  onClose: () => unknown;
  toggleOpen: () => unknown;
}

export const CartDrawerContext = createContext<DrawerContextProps>({
  isOpen: false,
  onOpen: () => {},
  onClose: () => {},
  toggleOpen: () => {},
});

export const CardDrawerContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <CartDrawerContext.Provider
      value={{
        isOpen,
        onOpen,
        onClose,
        toggleOpen,
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
