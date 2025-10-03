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

const collections = {
  miBiblioteca: [
    { id: "2", title: "1984", autor: "George Orwell", imageUrl: "/Images/1984.jpg" },
    { id: "8", title: "La chica del tren", autor: "Paula Hawkins", imageUrl: "/Images/girl-train.jpg" },
    { id: "9", title: "Harry Potter y la piedra filosofal", autor: "J.K. Rowling", imageUrl: "/Images/harry-potter.jpg" },
  ],
  leer: [
    { id: "4", title: "El Señor de los Anillos", autor: "J.R.R. Tolkien", imageUrl: "/Images/lotr.jpg" },
  ],
  leidos: [
    { id: "1", title: "Cien años de soledad", autor: "Gabriel García Márquez", imageUrl: "/Images/CienAniosSoledad.jpg" },
  ],
  favoritos: [],
  crear: [],
};

export default function BibliotecaPage() {
  const locale = useLocale(); // Detecta el idioma actual
  const t = useTranslations('miBiblioteca'); // Hook de next-intl
  const [selected, setSelected] = useState<keyof typeof collections>("miBiblioteca");

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
      <div>
        <SideMenu
          options={menuOptions}
          selectedF={{ path: "miBiblioteca", label: getTranslation('menu.myLibrary', 'Mi Biblioteca'), icon: <BookOpen size={18} /> }}
          onSelect={(option) => setSelected(option.path as keyof typeof collections)}
        />
      </div>

        <div title='Coleeciones' className="w-full">
          {/* Header con título y botón */}
          <div title="Mi Biblioteca titulos" className="flex justify-between items-center p-4">
            <h2 title='Titulo' className="text-3xl items-center font-bold">{selectedLabel}</h2>
            <div title='Solicitar libro' className="pr-5 flex items-center">
              <BotonPersonalizado texto={getTranslation('buttons.requestBook', 'Solicitar libro')} href="/miBiblioteca/solicitarlibro" />
            </div>
          </div>

          {selected === "crear" ? (
            <div className="p-6">
              <div className="text-center py-12 text-gray-500">
                <p className="text-lg mb-2">{getTranslation('emptyStates.createFirstCollection', '¡Crea tu primera colección personalizada!')}</p>
              </div>
              <FormularioCrearColeccion />
            </div>
          ) : (
          <div className="flex flex-col w-full">
            
            {/* Barra de búsqueda */}
            <div className="mb-8 w-full">
              <div title='Barra de Busqueda' className="flex items-center w-full px-4 py-2">
                <BarraBusqueda textHolder={getTranslation('searchPlaceholder', 'Buscar libros...')} ancho="lg" />
              </div>
            </div>

            <div title='Libros de coleccion' className="grid pb-5 grid-cols-2 md:grid-cols-4 gap-6">
              {collections[selected]?.length === 0 ? (
                <div className="col-span-full text-center py-12 text-gray-500">
                  <p className="text-lg mb-2">
                    {selected === "favoritos" 
                      ? getTranslation('emptyStates.noFavorites', 'No tienes libros favoritos aún')
                      : getTranslation('emptyStates.noBooks', 'No tienes libros en esta colección')
                    }
                  </p>
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
                    autor={b.autor}
                    imageUrl={b.imageUrl}
                    href={`/miBiblioteca/libros/${b.id}`}
                  />
                ))
              )}
            </div>
          </div>
          )}
      </div>
    </div>
  );
}
