// components/navigation/Footer.tsx
import React from "react";
import Link from "next/link";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations("navegacion");
  
  return (
    <footer data-testid="main-footer" className="bg-[var(--colorSecundario)] border-t border-elev">
      <div className=" container mx-auto flex flex-col items-center gap-4 py-10">
        <nav className="flex flex-wrap justify-center gap-4 font-newsreader">
          <Link href="/mainPage" className="text-white hover:text-brand"> {t("footer.links.home")} </Link>
          <Link href="/eventos" className="text-white hover:text-brand">{t("footer.links.events")}</Link>
          <Link href="/estadisticas" className="text-white hover:text-brand">{t("footer.links.stats")}</Link>
          <Link href="/miBiblioteca" className="text-white hover:text-brand">{t("footer.links.library")}</Link>
          <Link href="/leerAhora" className="text-white hover:text-brand">{t("footer.links.readNow")}</Link>
          <Link href="/comunidad" className="text-white hover:text-brand">{t("footer.links.community")}</Link>
        </nav>

        <div className="flex justify-center gap-4 text-white">
          <FacebookIcon className="cursor-pointer hover:text-brand" />
          <LinkedInIcon className="cursor-pointer hover:text-brand" />
          <InstagramIcon className="cursor-pointer hover:text-brand" />
          <YouTubeIcon className="cursor-pointer hover:text-brand" />
        </div>

        <p className="text-xs font-newsreader text-white">
          © {new Date().getFullYear()} Innovatech Solutions. {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
