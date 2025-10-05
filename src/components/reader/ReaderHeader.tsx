"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

export default function ReaderHeader({
  title,
  chapter,
}: { title: string; chapter: number }) {
  const t = useTranslations("reader");

  return (
    <>
      <div className="mb-2">
        <Link href="/leerAhora" className="text-[var(--colorMenus)] hover:underline">
          {t("back")}
        </Link>
      </div>

      <h1 className="text-3xl font-newsreader text-[var(--colorMenus)]">
        {title}
      </h1>

      <p className="text-sm text-[var(--colorText)] mb-4">
        {t("chapter", { n: chapter + 1 })}
      </p>
    </>
  );
}
