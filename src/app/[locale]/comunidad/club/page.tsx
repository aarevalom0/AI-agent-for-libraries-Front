"use client";

import SearchIcon from "@mui/icons-material/Search";
import { ClubCard } from "@/components/community/CommunityCard";
import { useTranslations } from "next-intl";

interface Club {
  categoria: string;
  descripcion: string;
  imageUrl: string;
  href: string;
}

export default function ClubesPage() {
  const t = useTranslations("communityPage");
  const clubs = t.raw("clubsPage.clubs") as Club[];

  return (
    <div className="flex gap-5 flex-col p-5">
      <div className="flex justify-between items-center gap-4 mb-4">
        <h1
          title={t("clubsPage.title")}
          className="text-2xl font-bold font-newsreader"
        >
          {t("clubsPage.title")}
        </h1>
      </div>

      <div className="pl-2 flex items-center h-10 rounded-lg border border-gray-300 bg-gray-50 focus-within:ring-1 focus-within:ring-[var(--colorPrincipal)]">
        <SearchIcon className="text-gray-500 " />
        <input
          type="text"
          placeholder={t("clubsPage.searchPlaceholder")}
          className="flex-1 p-2 text-sm bg-transparent focus:outline-none"
          title={t("clubsPage.searchPlaceholder")}
        />
      </div>

      {clubs.map((club, idx) => (
        <ClubCard
          key={idx}
          categoria={club.categoria}
          descripcion={club.descripcion}
          imageUrl={club.imageUrl}
          href={club.href}
          buttonText={t("clubsPage.joinButton")}
        />
      ))}
    </div>
  );
}
