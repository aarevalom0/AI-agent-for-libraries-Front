import type { Metadata } from "next";
import { Geist, Geist_Mono, Newsreader   } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import "./globals.css";
import NavBar from "@/components/navigation/NavBar";
import Footer from "../../components/navigation/Footer";
import LayoutWrapper from "./layoutWrapper";
import Chatbot from "@/components/Chatbot";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getMessages } from "next-intl/server";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"], 
  variable: "--font-pre-newsreader", 
});


export const metadata: Metadata = {
  title: "Lectorium",
  description: "Tu plataforma de lectura",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Await params
  const { locale } = await params;

  // Validar locale
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Obtener mensajes del locale actual
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} antialiased`}
        suppressHydrationWarning
      >
        <NextIntlClientProvider messages={messages}>
          <LayoutWrapper>{children}</LayoutWrapper>
          <Chatbot />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
