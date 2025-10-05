"use client";
import React from "react";
import BarraBusqueda from '@/components/elementos/BarraBusqueda';
import BookCard from '@/components/books/BookCard';
import BotonPersonalizado from '@/components/elementos/BotonPersonalizado';
import FormularioCrearColeccion from '@/components/formularios/FormularioCrearColeecion';
import SideMenu from '@/components/navigation/SideMenu';
import { BookOpen, List, Check, Star, Plus } from "lucide-react";
import { useState } from "react";
import { useTranslations, useLocale } from 'next-intl';
import { useTranslatedContent } from '@/lib/useTranslatedContent';
import { userBooks } from '@/lib/mock-data';

export default function BibliotecaPage() {
  const locale = useLocale(); // Detecta el idioma actual
  const t = useTranslations('miBiblioteca'); // Hook de next-intl
  const { getTranslatedBooks } = useTranslatedContent(); // Hook para contenido traducido

  // Estado para la búsqueda
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState<"miBiblioteca" | "leer" | "leidos" | "favoritos" | "crear">("miBiblioteca");

  // Obtener libros traducidos según el idioma actual
  const translatedBooks = getTranslatedBooks(userBooks);

  // Función para filtrar libros por búsqueda
  const filterBooksBySearch = (books: typeof translatedBooks) => {
    if (!searchTerm.trim()) return books;
    
    return books.filter(book => 
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Crear colecciones con libros traducidos y filtrados
  const allCollections = {
    miBiblioteca: translatedBooks.filter(book => ['2', '8', '9'].includes(book.id)),
    leer: translatedBooks.filter(book => book.id === '4'),
    leidos: translatedBooks.filter(book => book.id === '1'),
    favoritos: [] as typeof translatedBooks,
    crear: [] as typeof translatedBooks,
  };

  // Aplicar filtro de búsqueda a la colección seleccionada
  const collections = {
    ...allCollections,
    [selected]: filterBooksBySearch(allCollections[selected])
  };

  // Función helper para obtener traducciones con fallback
  const getTranslation = (key: string, fallback: string) => {
    try {
      // Usa el hook de next-intl
      return t(key);
    } catch {
      // Si falla, usa el fallback correspondiente al idioma
      if (locale === 'en') {
        // Fallbacks en inglés
        const englishFallbacks: Record<string, string> = {
          'menu.myLibrary': 'My Library',
          'menu.toRead': 'To Read',
          'menu.read': 'Read',
          'menu.favorites': 'Favorites',
          'menu.createCollection': 'Create Collection',
          'buttons.requestBook': 'Request Book',
          'searchPlaceholder': 'Search books...',
          'emptyStates.createFirstCollection': 'Create your first custom collection!',
          'emptyStates.noFavorites': 'You have no favorite books yet',
          'emptyStates.noBooks': 'You have no books in this collection',
          'emptyStates.markAsFavorite': 'Mark some books as favorites to see them here',
          'emptyStates.addFirstBook': 'Add your first book to get started'
        };
        return englishFallbacks[key] || fallback;
      } else {
        // Fallbacks en español
        return fallback;
      }
    }
  };

  const menuOptions = [
    { path: "miBiblioteca", label: getTranslation('menu.myLibrary', 'Mi Biblioteca'), icon: <BookOpen size={18} /> },
    { path: "leer", label: getTranslation('menu.toRead', 'Para leer'), icon: <List size={18} /> },
    { path: "leidos", label: getTranslation('menu.read', 'Leídos'), icon: <Check size={18} /> },
    { path: "favoritos", label: getTranslation('menu.favorites', 'Favoritos'), icon: <Star size={18} /> },
    { path: "crear", label: getTranslation('menu.createCollection', 'Crear Colección'), icon: <Plus size={18} /> },
  ];

  const selectedLabel = menuOptions.find(opt => opt.path === selected)?.label ?? getTranslation('menu.myLibrary', 'Mi Biblioteca');

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
          <header className="flex justify-between items-center p-4">
            <h1 className="text-3xl items-center font-bold text-[var(--colorPrincipal)]" id="page-title">
              {selectedLabel}
            </h1>
            <div className="pr-5 flex items-center">
              <BotonPersonalizado 
                texto={getTranslation('buttons.requestBook', 'Solicitar libro')} 
                href="/miBiblioteca/solicitarlibro"
                ariaLabel={getTranslation('buttons.requestBookAriaLabel', 'Solicitar un nuevo libro para la biblioteca')}
              />
            </div>
          </header>

          {selected === "crear" ? (
            <section className="p-6" aria-labelledby="create-collection-heading">
              <div className="text-center py-8 text-[var(--colorPrincipal)]">
                <h2 id="create-collection-heading" className="text-lg mb-1 font-semibold text-[var(--colorSecundario)]">
                  {getTranslation('emptyStates.createFirstCollection', '¡Crea tu colección personalizada!')}
                </h2>
              </div>
              <FormularioCrearColeccion />
            </section>
          ) : (
          <div className="flex flex-col w-full">
            
            {/* Barra de búsqueda */}
            <section className="mb-8 w-full" aria-labelledby="search-section">
              <h2 id="search-section" className="sr-only">
                {getTranslation('search.heading', 'Buscar en la colección')}
              </h2>
              <div className="flex items-center w-full px-4 py-2">
                <BarraBusqueda 
                  textHolder={getTranslation('searchPlaceholder', 'Buscar libros...')} 
                  ancho="lg"
                  ariaLabel={getTranslation('search.ariaLabel', 'Buscar libros en tu biblioteca')}
                  onSearch={setSearchTerm}
                />
              </div>
            </section>

            <section 
              className="grid pb-5 grid-cols-2 md:grid-cols-4 gap-6" 
              aria-labelledby="books-section"
              role="region"
            >
              <h2 id="books-section" className="sr-only">
                {getTranslation('books.heading', 'Libros en')} {selectedLabel}
              </h2>
              {collections[selected]?.length === 0 ? (
                <div className="col-span-full text-center py-12 text-gray-500" role="status" aria-live="polite">
                  <h3 className="text-lg mb-2 font-semibold">
                    {selected === "favoritos" 
                      ? getTranslation('emptyStates.noFavorites', 'No tienes libros favoritos aún')
                      : getTranslation('emptyStates.noBooks', 'No tienes libros en esta colección')
                    }
                  </h3>
                  <p className="text-sm">
                    {selected === "favoritos" 
                      ? getTranslation('emptyStates.markAsFavorite', 'Marca algunos libros como favoritos para verlos aquí')
                      : getTranslation('emptyStates.addFirstBook', 'Agrega tu primer libro para comenzar')
                    }
                  </p>
                </div>
              ) : (
                collections[selected]?.map((b) => (
                  <BookCard
                    key={b.id}
                    title={b.title}
                    autor={b.author}
                    imageUrl={b.cover || '/placeholder-cover.png'}
                    href={`/miBiblioteca/libros/${b.id}`}
                  />
                ))
              )}
            </section>
          </div>
          )}
        </main>
    </div>
  );
}