"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";

// ✅ Dynamically import the component to ensure it only runs on client
const SuccessContent = dynamic(() => import("./success-content"), {
  ssr: false, // disables server rendering
  loading: () => <div className="text-center p-10">Loading success details...</div>,
});

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="text-center p-10">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
