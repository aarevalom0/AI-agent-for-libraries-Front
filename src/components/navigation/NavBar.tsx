// components/navigation/NavBar.tsx
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { setGlobalDarkMode } from "@/app/layoutWrapper";

const THEME_KEY = "lecturium_dark";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selected, setSelected] = useState("Home");
  const [dark, setDark] = useState(false);

  // Leer estado inicial (preferencia guardada o sistema)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      const prefersDark = matchMedia("(prefers-color-scheme: dark)").matches;
      const enabled = saved == null ? prefersDark : saved === "1";
      setDark(
        enabled ||
        document.documentElement.classList.contains("dark")
      );
    } catch {
      setDark(document.documentElement.classList.contains("dark"));
    }
  }, []);

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    setGlobalDarkMode(next); // único sitio que modifica el modo global
  };

  const linkCls = (name: string) =>
    `px-3 font-newsreader hover:text-brand ${selected === name ? "font-bold text-brand" : "text-[var(--text)]"}`;

  return (
    <header className="bg-elev border-b border-elev">
      <nav className="mx-auto max-w-7xl w-full px-4 py-3 flex items-center justify-between">
        {/* Logo + links */}
        <div className="flex items-center gap-3">
          <Link href="/mainPage" className="flex items-center gap-2">
            <Image src="/Images/Logo.jpg" alt="Lecturium logo" width={40} height={40} />
            <span className="text-xl font-bold font-newsreader text-brand">Lectorium</span>
          </Link>

          {/* Links desktop */}
          <ul className="hidden md:flex gap-2 ml-4">
            <li><Link href="/mainPage" className={linkCls("Home")} onClick={() => setSelected("Home")}>Home</Link></li>
            <li><Link href="/eventos" className={linkCls("Eventos")} onClick={() => setSelected("Eventos")}>Eventos</Link></li>
            <li><Link href="/estadisticas" className={linkCls("Estadísticas")} onClick={() => setSelected("Estadísticas")}>Estadísticas</Link></li>
            <li><Link href="/miBiblioteca" className={linkCls("Mi Biblioteca")} onClick={() => setSelected("Mi Biblioteca")}>Mi biblioteca</Link></li>
            <li><Link href="/leerAhora" className={linkCls("Leer Ahora")} onClick={() => setSelected("Leer Ahora")}>Leer Ahora</Link></li>
            <li><Link href="/comunidad" className={linkCls("Comunidad")} onClick={() => setSelected("Comunidad")}>Comunidad</Link></li>
          </ul>
        </div>

        {/* Acciones derecha (desktop) */}
        <div className="hidden md:flex items-center gap-3">
          {/* buscador */}
          <div className="pl-2 flex items-center w-44 h-10 rounded-lg border border-elev bg-[var(--input-bg)]">
            <SearchIcon className="text-[var(--text)]/60" />
            <input
              type="text"
              placeholder="Buscar"
              className="flex-1 px-2 text-sm bg-transparent outline-none text-[var(--text)] placeholder:text-[var(--text)]/50"
            />
          </div>

          {/* notificaciones */}
          <button className="p-2 rounded-lg border border-elev bg-[var(--input-bg)] hover:opacity-80">
            <NotificationsIcon className="text-[var(--text)]/70" />
          </button>

          {/* perfil */}
          <Link href="/perfil" className="flex items-center">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-elev">
              <Image src="/Images/Perfil1.png" alt="Perfil" width={40} height={40} />
            </div>
          </Link>

          {/* Idioma (placeholder) */}
          <button className="px-3 py-2 rounded-lg border border-elev bg-[var(--input-bg)] text-[var(--text)]/80">
            EN/ES
          </button>

          {/* Toggle Dark */}
          <button
            onClick={toggleDark}
            title={dark ? "Modo claro" : "Modo oscuro"}
            className="p-2 rounded-lg border border-elev bg-[var(--input-bg)] hover:opacity-80"
          >
            {dark ? <LightModeIcon className="text-[var(--text)]/80" /> : <DarkModeIcon className="text-[var(--text)]/80" />}
          </button>
        </div>

        {/* Botón menú móvil */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="p-2 rounded-lg text-[var(--text)]"
            aria-label="Abrir menú"
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {/* Menú móvil */}
      {menuOpen && (
        <div className="md:hidden border-t border-elev bg-elev px-4 pb-4 space-y-3">
          {/* buscador móvil */}
          <div className="pl-2 flex items-center h-10 rounded-lg border border-elev bg-[var(--input-bg)]">
            <SearchIcon className="text-[var(--text)]/60" />
            <input
              type="text"
              placeholder="Buscar"
              className="flex-1 px-2 text-sm bg-transparent outline-none text-[var(--text)] placeholder:text-[var(--text)]/50"
            />
          </div>

          <ul className="space-y-2">
            <li><Link href="/mainPage" className={linkCls("Home")} onClick={() => setSelected("Home")}>Home</Link></li>
            <li><Link href="/eventos" className={linkCls("Eventos")} onClick={() => setSelected("Eventos")}>Eventos</Link></li>
            <li><Link href="/estadisticas" className={linkCls("Estadísticas")} onClick={() => setSelected("Estadísticas")}>Estadísticas</Link></li>
            <li><Link href="/miBiblioteca" className={linkCls("Mi Biblioteca")} onClick={() => setSelected("Mi Biblioteca")}>Mi biblioteca</Link></li>
            <li><Link href="/leerAhora" className={linkCls("Leer Ahora")} onClick={() => setSelected("Leer Ahora")}>Leer Ahora</Link></li>
            <li><Link href="/comunidad" className={linkCls("Comunidad")} onClick={() => setSelected("Comunidad")}>Comunidad</Link></li>
          </ul>

          {/* Toggle Dark en móvil */}
          <button
            onClick={toggleDark}
            className="mt-2 inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-elev bg-[var(--input-bg)] text-[var(--text)]"
          >
            {dark ? <LightModeIcon /> : <DarkModeIcon />}
            {dark ? "Modo claro" : "Modo oscuro"}
          </button>
        </div>
      )}
    </header>
  );
};

export default NavBar;
