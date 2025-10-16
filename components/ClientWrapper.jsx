"use client";

import { CartProvider } from "@/context/CartContext";
import AuthProvider from "@/components/AuthProvider";
import StripeProvider from "@/components/StripeProvider";

export default function ClientWrapper({ children }) {
  return (
    <CartProvider>
      <AuthProvider>
        <StripeProvider>{children}</StripeProvider>
      </AuthProvider>
    </CartProvider>
  );
}
