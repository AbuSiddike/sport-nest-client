"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Toaster } from "react-hot-toast";

export function Providers({ children, themeProps }) {
  return (
    <NextThemesProvider {...themeProps}>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          className: "!bg-surface !text-foreground !border !border-border !shadow-lg !text-sm",
          success: { iconTheme: { primary: "#10b981", secondary: "#fff" } },
          error: { iconTheme: { primary: "#ef4444", secondary: "#fff" } },
        }}
      />
    </NextThemesProvider>
  );
}
