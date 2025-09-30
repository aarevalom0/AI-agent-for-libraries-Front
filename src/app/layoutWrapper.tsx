// app/layoutWrapper.tsx
"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import NavBar from "@/components/navigation/NavBar";
import Footer from "@/components/navigation/Footer";

const THEME_KEY = "lecturium_dark";

/** Activa/desactiva el modo oscuro GLOBAL (añade/quita la clase `dark` en <html>) */
export function setGlobalDarkMode(on: boolean) {
  if (typeof document !== "undefined") {
    document.documentElement.classList.toggle("dark", on);
  }
  if (typeof localStorage !== "undefined") {
    localStorage.setItem(THEME_KEY, on ? "1" : "0");
  }
}

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideOn = ["/", "/login", "/register"];
  const hideLayout = hideOn.includes(pathname);

  // Al montar, sincroniza la clase `dark` con lo guardado (o con el sistema si no hay preferencia)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      const prefersDark = matchMedia("(prefers-color-scheme: dark)").matches;
      const enabled = saved == null ? prefersDark : saved === "1";
      document.documentElement.classList.toggle("dark", enabled);

      // Reflejar cambios desde otras pestañas
      const onStorage = (e: StorageEvent) => {
        if (e.key === THEME_KEY) {
          document.documentElement.classList.toggle("dark", e.newValue === "1");
        }
      };
      window.addEventListener("storage", onStorage);
      return () => window.removeEventListener("storage", onStorage);
    } catch {
      /* no-op */
    }
  }, []);

  return (
    <>
      {!hideLayout && <NavBar />}
      {children}
      {!hideLayout && <Footer />}
    </>
  );
}
