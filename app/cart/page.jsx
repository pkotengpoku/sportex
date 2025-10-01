"use client";

import React from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  // Helper to get a stable id for items (support both id and _id)
  const itemId = (item) => item.id ?? item._id ?? item.sku ?? JSON.stringify(item);

  // Helper to read a price safely
  const itemPrice = (item) =>
    Number(item.price ?? item.final_price ?? item.finalPrice ?? 0) || 0;

  // Group cart items by seller id (supports _seller_id or seller_id)
  const groupedBySeller = cart.reduce((acc, item) => {
    const sellerKey = item._seller_id ?? item.seller_id ?? "unknown_seller";
    const sellerName = item.seller_name ?? item.sellerName ?? "Venditore sconosciuto";
    if (!acc[sellerKey]) acc[sellerKey] = { sellerName, items: [] };
    acc[sellerKey].items.push(item);
    return acc;
  }, {});

  // Grand total across all sellers
  const grandTotal = cart.reduce(
    (sum, it) => sum + itemPrice(it) * (Number(it.quantity) || 1),
    0
  );

  const handleCheckoutSeller = (sellerKey) => {
    // placeholder - wire up to your checkout flow for a single seller
    console.log("Checkout for seller:", sellerKey);
  };

  return (
    <div className="p-6 w-full">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
        {/* Left column: grouped cart sections */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-6">Il tuo carrello</h1>

          {cart.length === 0 ? (
            <p className="text-gray-500">Il carrello è vuoto.</p>
          ) : (
            Object.entries(groupedBySeller).map(([sellerKey, group]) => {
              const sellerSubtotal = group.items.reduce(
                (s, it) => s + itemPrice(it) * (Number(it.quantity) || 1),
                0
              );

              return (
                <section
                  key={sellerKey}
                  className="mb-8 bg-white rounded-lg p-4 shadow-sm"
                >
                  <header className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-lg font-semibold">
                        Prodotti di {group.sellerName}
                      </h2>
                      <p className="text-sm text-gray-500">
                        {group.items.length} articolo{group.items.length > 1 ? "i" : ""}
                      </p>
                    </div>

                    <div className="text-right">
                      <div className="text-sm text-gray-500">Subtotale</div>
                      <div className="text-lg font-semibold">€ {sellerSubtotal.toFixed(2)}</div>
                    </div>
                  </header>

                  <div className="divide-y">
                    {group.items.map((item) => {
                      const id = itemId(item);
                      const price = itemPrice(item);
                      const qty = Number(item.quantity) || 1;
                      const imgSrc =
                        item.image ||
                        item.image_url?.[0] ||
                        item.images?.[0] ||
                        "/placeholder.jpg";

                      return (
                        <div
                          key={id}
                          className="py-4 flex items-center gap-4 last:pb-0"
                        >
                          <div className="w-24 h-24 relative flex-shrink-0 rounded overflow-hidden border">
                            {/* Using next/image - ensure remote domains are allowed in next.config.js */}
                            <Image
                              src={imgSrc}
                              alt={item.name ?? item.title ?? "Product image"}
                              fill
                              sizes="96px"
                              className="object-contain"
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-4">
                              <div className="min-w-0">
                                <h3 className="font-medium truncate">
                                  {item.name ?? item.title ?? "Prodotto"}
                                </h3>
                                <p className="text-sm text-gray-600 truncate">
                                  {item.subtitle ?? item.description?.slice(0, 90)}
                                </p>
                              </div>

                              <div className="text-right">
                                <div className="text-sm text-gray-500">Prezzo</div>
                                <div className="font-semibold">€ {price.toFixed(2)}</div>
                              </div>
                            </div>

                            <div className="mt-3 flex items-center gap-3">
                              <button
                                onClick={() =>
                                  updateQuantity(id, Math.max(1, qty - 1))
                                }
                                disabled={qty <= 1}
                                className="px-3 py-1 border rounded disabled:opacity-50"
                                aria-label={`Decrement quantity for ${item.name ?? item.title}`}
                              >
                                −
                              </button>

                              <span className="px-3">{qty}</span>

                              <button
                                onClick={() => updateQuantity(id, qty + 1)}
                                className="px-3 py-1 border rounded"
                                aria-label={`Increment quantity for ${item.name ?? item.title}`}
                              >
                                +
                              </button>

                              <button
                                onClick={() => removeFromCart(id)}
                                className="ml-4 text-sm text-red-500"
                                aria-label={`Remove ${item.name ?? item.title} from cart`}
                              >
                                Rimuovi
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      Puoi completare il checkout solo per questo venditore.
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCheckoutSeller(sellerKey)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md"
                    >
                      Procedi al pagamento — {group.sellerName}
                    </button>
                  </div>
                </section>
              );
            })
          )}
        </div>

        {/* Right column: overall summary */}
        <aside className="lg:w-1/3 w-full">
          <div className="bg-white rounded-lg p-4 shadow-sm sticky top-6">
            <h3 className="text-lg font-semibold mb-4">Riepilogo ordine</h3>

            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600">Numero articoli</span>
              <span className="font-medium">{cart.reduce((n, i) => n + (Number(i.quantity) || 1), 0)}</span>
            </div>

            <div className="flex justify-between mb-4">
              <span className="text-sm text-gray-600">Totale parziale</span>
              <span className="font-medium">€ {grandTotal.toFixed(2)}</span>
            </div>

            <div className="text-xs text-gray-500 mb-4">
              Nota: il checkout è per venditore. Se il carrello contiene prodotti di più venditori,
              completa gli ordini separatamente.
            </div>

            <div className="space-y-3">
              {Object.entries(groupedBySeller).map(([sellerKey, group]) => {
                const sellerSubtotal = group.items.reduce(
                  (s, it) => s + itemPrice(it) * (Number(it.quantity) || 1),
                  0
                );
                return (
                  <div key={sellerKey} className="flex items-center justify-between">
                    <div className="min-w-0">
                      <div className="text-sm truncate">{group.sellerName}</div>
                      <div className="text-xs text-gray-500">({group.items.length} articolo{group.items.length > 1 ? "i" : ""})</div>
                    </div>
                    <div className="font-medium">€ {sellerSubtotal.toFixed(2)}</div>
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => console.log("Start multi-seller checkout not supported")}
              className="mt-6 w-full bg-gray-200 text-gray-800 py-2 rounded-md"
              disabled
              title="Checkout multi-vendor not supported"
            >
              Checkout multi-vendor (non disponibile)
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
