// components/navigation/Footer.tsx
import React from "react";
import Link from "next/link";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";

const Footer = () => {
  return (
    <footer className="bg-elev border-t border-elev">
      <div className="container mx-auto flex flex-col items-center gap-4 py-10">
        <nav className="flex flex-wrap justify-center gap-4 font-newsreader">
          <Link href="/mainPage" className="text-[var(--text)] hover:text-brand">Home</Link>
          <Link href="/eventos" className="text-[var(--text)] hover:text-brand">Eventos</Link>
          <Link href="/estadisticas" className="text-[var(--text)] hover:text-brand">Estadísticas</Link>
          <Link href="/miBiblioteca" className="text-[var(--text)] hover:text-brand">Mi Biblioteca</Link>
          <Link href="/leerAhora" className="text-[var(--text)] hover:text-brand">Leer Ahora</Link>
          <Link href="/comunidad" className="text-[var(--text)] hover:text-brand">Comunidad</Link>
        </nav>

        <div className="flex justify-center gap-4 text-[var(--text)]">
          <FacebookIcon className="cursor-pointer hover:text-brand" />
          <LinkedInIcon className="cursor-pointer hover:text-brand" />
          <InstagramIcon className="cursor-pointer hover:text-brand" />
          <YouTubeIcon className="cursor-pointer hover:text-brand" />
        </div>

        <p className="text-xs font-newsreader text-[var(--text)]">
          © {new Date().getFullYear()} Innovatech Solutions. Todos los derechos reservados
        </p>
      </div>
    </footer>
  );
};

export default Footer;
