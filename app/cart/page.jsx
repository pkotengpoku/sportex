"use client";
import React from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="p-6 flex w-full">
      {/* Cart Items Section */}
      <div className="w-2/3 pr-6">
        <h1 className="text-2xl font-bold mb-4">Il tuo carrello</h1>
        {cart.length === 0 ? (
          <p className="text-gray-500">Il carrello è vuoto.</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="flex items-center border-b py-4 gap-4">
              <Image
                src={item.image || "/placeholder.jpg"}
                alt={item.name}
                width={100}
                height={100}
                className="rounded object-contain"
              />
              <div className="flex-1">
                <h2 className="font-semibold">{item.name}</h2>
                <p className="text-gray-700">€ {item.price.toFixed(2)}</p>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="px-2 py-1 border rounded disabled:opacity-50"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="px-3">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-2 py-1 border rounded"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 text-sm"
              >
                Rimuovi
              </button>
            </div>
          ))
        )}
      </div>

      {/* Summary */}
      <div className="w-1/3 h-fit bg-gray-100 rounded-lg p-4">
        <h2 className="text-xl font-bold mb-4">Riepilogo ordine</h2>
        <div className="flex justify-between mb-2">
          <span>Totale</span>
          <span>€ {total.toFixed(2)}</span>
        </div>
        <button className="mt-6 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
          Procedi al pagamento
        </button>
      </div>
    </div>
  );
};

export default CartPage;
