"use client";

import React, { useEffect } from "react";
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
import { useRouter } from "next/navigation";
import { getCurrentUser, getSession } from "@/lib/authClient";
import { BookInLibrary, LibraryItem } from "@/types/library";
import { getUserCollections, getCollectionDetails, getAllUserBooks } from '@/services/collectionService';

export default function BibliotecaPage() {
  const locale = useLocale(); // Detecta el idioma actual
  const t = useTranslations('miBiblioteca'); // Hook de next-intl
  const { getTranslatedBooks } = useTranslatedContent(); // Hook para contenido traducido
  const translatedBooks = getTranslatedBooks(userBooks);

  const router = useRouter();

  // Estado de usuario
  const [userId, setUserId] = useState<string>('');
  const [token, setToken] = useState('');
  const [ready, setReady] = useState<boolean>(false);

  // Estado de búsqueda y filtrado
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selected, setSelected] = useState<string>('miBiblioteca');

  // Estado de datos
  const [customCollections, setCustomCollections] = useState<LibraryItem[]>([]);
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // --------- Cargar usuario logueado ----------
  useEffect(() => {
    const u = getCurrentUser();

    // Si no hay sesión, redirige a login
    if (!u) {
      router.replace("/login");
      return;
    }
    if (u?.id) {
      setUserId(u.id);
    }
    const session = getSession();
    setToken(session?.token?.toString() ?? "");

    getUserCollections(u.id).then(collections => {
      setCustomCollections(collections);
    });

    setReady(true);
  }, [router]);



  // Función para filtrar libros por búsqueda
  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const loadUserData = async (): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      // Cargar colecciones personalizadas
      const collections = await getUserCollections(userId);
      setCustomCollections(collections);

      // Cargar todos los libros
      const books = await getAllUserBooks(userId);
      setBooks(books);
    } catch (err) {
      setError('Error al cargar datos de la biblioteca');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ========== Cargar colecciones y libros del usuario ==========
  useEffect(() => {
    if (!ready || !userId) return;
    loadUserData();
  }, [ready, userId]);



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

  useEffect(() => {
    if (!userId) return;
    const fetchBooks = async () => {
      setLoading(true);
      try {
        let resultBooks = [];
        if (selected === 'miBiblioteca') {
          // Opción "Mi Biblioteca": Traer TODOS los libros
          resultBooks = await getAllUserBooks(userId);
        }
        else if (selected === 'crear') {
          // Opción "Crear": No cargamos libros
          resultBooks = [];
        }
        else {
          // Es una colección personalizada (el 'selected' es el ID de la library)
          const details = await getCollectionDetails(selected);
          resultBooks = details?.libros || [];
        }
        setBooks(resultBooks);
      } catch (error) {
        console.error("Error cargando libros", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [selected, userId]);

  const staticOptions = [
    { path: "miBiblioteca", label: getTranslation('menu.myLibrary', 'Mi Biblioteca'), icon: <BookOpen size={18} /> },

    { path: "crear", label: getTranslation('menu.createCollection', 'Crear Colección'), icon: <Plus size={18} /> },
  ];

  const dynamicOptions = customCollections.map(col => {
    let IconComponent;
    switch (col.icon) {
      case "check":
        IconComponent = Check;
        break;
      case "star":
        IconComponent = Star;
        break;
      case "list":
      default:
        IconComponent = List;
    }

    return {
      path: col.id, // El ID de la colección será el path
      label: col.nombre,
      icon: <IconComponent size={18} />
    };
  });

  const menuOptions = [
    staticOptions[0], // Mi Biblioteca
    ...dynamicOptions, // Colecciones del usuario
    staticOptions[staticOptions.length - 1] // Crear Colección
  ];

  const selectedLabel = menuOptions.find(opt => opt.path === selected)?.label ?? getTranslation('menu.myLibrary', 'Mi Biblioteca');


  if (!ready) return null;

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
            <FormularioCrearColeccion
              userId={userId}
              token={token}
              onCollectionCreated={loadUserData}
            />
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

            <section className="grid pb-5 grid-cols-2 md:grid-cols-4 gap-6">
              {loading ? (
                <p>Cargando libros...</p>
              ) : filteredBooks.length === 0 ? (
                <div className="col-span-full text-center">
                  {/* Mensajes de estado vacío */}
                  <p>No se encontraron libros.</p>
                </div>
              ) : (
                filteredBooks.map((b) => (
                  <BookCard
                    key={b.id}
                    title={b.title}
                    autor={b.author}
                    imageUrl={b.cover}
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