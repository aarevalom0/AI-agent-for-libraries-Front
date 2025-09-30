"use client";
import BarraBusqueda from '@/components/elementos/BarraBusqueda';
import BookCard from '@/components/books/BookCard';
import BotonPersonalizado from '@/components/elementos/BotonPersonalizado';
import FormularioCrearColeccion from '@/components/formularios/FormularioCrearColeecion';
import SideMenu from '@/components/navigation/SideMenu';
import { BookOpen, List, Check, Star, Plus } from "lucide-react";
import { useState } from "react";

const collections = {
  miBiblioteca: [
    { id: "1", title: "1984", autor: "George Orwell", imageUrl: "/Images/1984.jpg" },
    { id: "2", title: "La chica del tren", autor: "Paula Hawkins", imageUrl: "/Images/girl-train.jpg" },
    { id: "3", title: "Harry Potter y la piedra filosofal", autor: "J.K. Rowling", imageUrl: "/Images/harry-potter.jpg" },
  ],
  leer: [
    { id: "4", title: "El principito", autor: "Antoine de Saint-Exupéry", imageUrl: "/Images/principito.jpg" },
  ],
  leidos: [
    { id: "5", title: "Cien años de soledad", autor: "Gabriel García Márquez", imageUrl: "/Images/CienAniosSoledad.jpg" },
  ],
  favoritos: [],
  crear: [], // Podrías mostrar un formulario aquí
};

const menuOptions = [
  { path: "miBiblioteca", label: "Mi Biblioteca", icon: <BookOpen size={18} /> },
  { path: "leer", label: "Para leer", icon: <List size={18} /> },
  { path: "leidos", label: "Leídos", icon: <Check size={18} /> },
  { path: "favoritos", label: "Favoritos", icon: <Star size={18} /> },
  { path: "crear", label: "Crear Colección", icon: <Plus size={18} /> },
];

export default function BibliotecaPage() {
  const [selected, setSelected] = useState<keyof typeof collections>("miBiblioteca");
  const selectedLabel = menuOptions.find(opt => opt.path === selected)?.label ?? "Mi Biblioteca";

  return (
    <div className="flex gap-5">
      <div>
        <SideMenu
          options={menuOptions}
          selectedF={{ path: "miBiblioteca", label: "Mi Biblioteca", icon: <BookOpen size={18} /> }}
          onSelect={(option) => setSelected(option.path as keyof typeof collections)}
        />
      </div>


        <div title='Coleeciones' className="w-full">
          {/* Header con título y botón */}
          <div title="Mi Biblioteca titulos" className="flex justify-between items-center p-4">
            <h2 title='Titulo' className="text-3xl items-center font-bold">{selectedLabel}</h2>
            <div title='Solicitar libro' className="pr-5 flex items-center">
              <BotonPersonalizado  texto="Solicitar libro" href="/miBiblioteca/solicitarlibro" />
            </div>
          </div>

          {selected === "crear" ? (
            <FormularioCrearColeccion />
          ) : (
          <div className="flex flex-col w-full">
            
            {/* Barra de búsqueda */}
            <div className="mb-8 w-full">
              <div title='Barra de Busqueda' className="flex items-center w-full px-4 py-2">
                <BarraBusqueda textHolder="Buscar en mi biblioteca" ancho="lg" />
              </div>
            </div>

            <div title='Libros de coleccion' className="grid pb-5 grid-cols-2 md:grid-cols-4 gap-6">
              {collections[selected]?.map((b) => (
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
      </div>
    </div>
  );
}
