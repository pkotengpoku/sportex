"use client";
import { useEffect, useState } from "react";
import { dummy } from "@/data/dummy";

export default function SeedProducts() {
  const [status, setStatus] = useState("Starting...");

  useEffect(() => {
    const sendProducts = async () => {
      let results = [];
      for (const product of dummy) {
        try {
          const res = await fetch("/api/product", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product),
          });

          if (!res.ok) throw new Error(await res.text());
          const data = await res.json();
          results.push(`✅ Saved: ${product.title}`);
        } catch (error) {
          results.push(`❌ Failed: ${product.title} (${error.message})`);
        }
      }
      setStatus(results.join("\n"));
    };

    sendProducts();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Seeding Products...</h1>
      <pre className="bg-gray-100 p-4 rounded text-sm whitespace-pre-wrap">{status}</pre>
    </div>
  );
}
