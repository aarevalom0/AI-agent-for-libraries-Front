// app/layoutWrapper.tsx
"use client";

import React from "react";
import { usePathname } from "next/navigation";
import NavBar from "@/components/navigation/NavBar";
import Footer from "@/components/navigation/Footer";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideOn = ["/es", "/es/login", "/es/register","/en", "/en/login", "/en/register"];
  const hideLayout = hideOn.includes(pathname);

  return (
    <>
      {!hideLayout && <NavBar />}
      {children}
      {!hideLayout && <Footer />}
    </>
  );
}
