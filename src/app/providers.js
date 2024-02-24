"use client";

import { StepProvider } from "@/appState/StepsState";
import { Suspense } from "react";

export function Providers({ children }) {
  return (
    <StepProvider>
      <Suspense fallback={<span>...</span>}>{children}</Suspense>
    </StepProvider>
  );
}
