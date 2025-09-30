//(Client Component)
"use client";

import { usePathname } from "next/navigation";
import NavBar from "@/components/navigation/NavBar";
import Footer from "@/components/navigation/Footer";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideOn = ["/", "/login", "/register"];
  const hideLayout = hideOn.includes(pathname);

  return (
    <>
      {!hideLayout && <NavBar />}
      {children}
      {!hideLayout && <Footer />}
    </>
  );
}
