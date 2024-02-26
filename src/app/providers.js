"use client";

import { StepProvider } from "@/appState/StepsState";
import { ManagedUIProvider } from "@/appState/UIState";
import { Suspense } from "react";

export function Providers({ children }) {
  return (
    <StepProvider>
      <ManagedUIProvider>
        <Suspense fallback={<span>...</span>}>{children}</Suspense>
      </ManagedUIProvider>
    </StepProvider>
  );
}
