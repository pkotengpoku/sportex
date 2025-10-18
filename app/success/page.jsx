"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-4xl font-bold text-green-600 mb-4">🎉 Rental Confirmed!</h1>
      <p className="text-xl text-gray-700 mb-2">Thank you for your booking.</p>
      <p className="text-gray-500">
        Your order is being processed. The session ID is:
        <code className="bg-gray-100 p-1 rounded text-sm block mt-2">
          {sessionId || "N/A"}
        </code>
      </p>
      <a
        href="/"
        className="mt-8 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition"
      >
        Continue Shopping
      </a>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="text-center p-10">Loading success details...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
