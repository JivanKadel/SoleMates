"use client";

import CartItemList from "./CartItemList";
import Drawer from "./Drawer";
import { useContext } from "react";
import { CartDrawerContext } from "@/contexts/DrawerContext";
import { ShoeContext } from "@/contexts/ShoeContext";

export default function CartDrawer() {
  const { isOpen, onClose } = useContext(CartDrawerContext);

  return (
    <Drawer isOpen={isOpen} onClose={onClose} labelledBy="Cart Items">
      <CartItemList />
    </Drawer>
  );
}
