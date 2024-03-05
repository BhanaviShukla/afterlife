"use client";

import { StepProvider } from "@/appState/StepsState";
import { ManagedUIProvider } from "@/appState/UIState";
import { WillProvider } from "@/appState/WillState";
import { Suspense } from "react";

export function Providers({ children }) {
  return (
    <StepProvider>
      <ManagedUIProvider>
        <WillProvider>
          <Suspense fallback={<span>...</span>}>{children}</Suspense>
        </WillProvider>
      </ManagedUIProvider>
    </StepProvider>
  );
}
