"use client";
import React from "react";
import BarraBusqueda from '@/components/elementos/BarraBusqueda';
import BookCard from '@/components/books/BookCard';
import BotonPersonalizado from '@/components/elementos/BotonPersonalizado';
import FormularioCrearColeccion from '@/components/formularios/FormularioCrearColeecion';
import SideMenu from '@/components/navigation/SideMenu';
import { BookOpen, List, Check, Star, Plus } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";



interface Book{
  id:string,
  title:string,
  autor:string,
  imageUrl:string
}



export default function BibliotecaPage() {
  const t = useTranslations("biblioteca");
  const collections = t.raw("collections");
  const [selected, setSelected] = useState<keyof typeof collections>("miBiblioteca");
  const [search, setSearch] = useState("");
  
  const menuOptions = [
    { path: "miBiblioteca", label: t("menu.miBiblioteca"), icon: <BookOpen size={18} /> },
    { path: "leer", label: t("menu.leer"), icon: <List size={18} /> },
    { path: "leidos", label: t("menu.leidos"), icon: <Check size={18} /> },
    { path: "favoritos", label: t("menu.favoritos"), icon: <Star size={18} /> },
    { path: "crear", label: t("menu.crear"), icon: <Plus size={18} /> },
  ];

  const selectedLabel = menuOptions.find(opt => opt.path === selected)?.label ?? "Mi Biblioteca";

  const filteredBooks = collections[selected]?.books.filter((b: Book) =>
    b.title.toLowerCase().includes(search.toLowerCase()) ||
    b.autor.toLowerCase().includes(search.toLowerCase())
  ) ?? [];

  return (
    <div className="flex gap-5">
      {/* Skip link para accesibilidad */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded z-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        {getTranslation('skipToContent', 'Ir al contenido principal')}
      </a>
      
      <nav aria-label={getTranslation('navigation.collections', 'Navegación de colecciones')}>
        <SideMenu
          options={menuOptions}
          selectedF={{ path: "miBiblioteca", label: getTranslation('menu.myLibrary', 'Mi Biblioteca'), icon: <BookOpen size={18} /> }}
          onSelect={(option) => {
            const newSelected = option.path as "miBiblioteca" | "leer" | "leidos" | "favoritos" | "crear";
            setSelected(newSelected);
            setSearchTerm(""); // Limpiar búsqueda al cambiar de colección
          }}
        />
      </nav>

        <main id="main-content" className="w-full" role="main" aria-label={getTranslation('main.libraryContent', 'Contenido de la biblioteca')}>
          {/* Header con título y botón */}
          <div title="Mi Biblioteca titulos" className="flex justify-between items-center p-4">
            <h2 title='Titulo' className="text-3xl items-center font-bold">{selectedLabel}</h2>
            <div title='Solicitar libro' className="pr-5 flex items-center">
              <BotonPersonalizado  texto={t("header.solicitarLibro")} href="/miBiblioteca/solicitarlibro" />
            </div>
          </header>

          {selected === "crear" ? (
            <section className="p-6" aria-labelledby="create-collection-heading">
              <div className="text-center py-12 text-gray-500">
                <h2 id="create-collection-heading" className="text-lg mb-2 font-semibold text-[var(--colorSecundario)]">
                  {getTranslation('emptyStates.createFirstCollection', '¡Crea tu primera colección personalizada!')}
                </h2>
              </div>
              <FormularioCrearColeccion />
            </section>
          ) : (
          <div className="flex flex-col w-full">
            
            {/* Barra de búsqueda */}
            <div className="mb-8 w-full">
              <div title='Barra de Busqueda' className="flex items-center w-full px-4 py-2">
                <BarraBusqueda textHolder={t("header.buscarPlaceholder")} ancho="lg" value={search} onChange={setSearch}/>
              </div>
            </section>

            <div title="Libros de coleccion" className="grid pb-5 grid-cols-2 md:grid-cols-4 gap-6">
              {filteredBooks.map((b: Book) => (
                <BookCard
                  key={b.id}
                  title={b.title}
                  autor={b.autor}
                  imageUrl={b.imageUrl}
                  href={`/miBiblioteca/libros/${b.id}`}
                />
              ))}
            </div>
          </div>
          )}
        </main>
    </div>
  );
}
