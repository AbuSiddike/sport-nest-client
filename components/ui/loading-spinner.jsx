"use client";

import { Spinner } from "@heroui/react";
import { cn } from "@/lib/cn";

export function LoadingSpinner({ label = "Loading...", className, size = "lg" }) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-3 py-16", className)}>
      <Spinner size={size} color="accent" />
      {label ? <p className="text-sm text-muted">{label}</p> : null}
    </div>
  );
}
