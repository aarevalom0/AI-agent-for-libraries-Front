"use client";

import BookCard from "@/components/books/BookCard";
import { getAllBooks } from "@/services/bookService";
import { BookRecomendations } from "@/types/book";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export default function LibrosPage() {
    const t = useTranslations("navegacion"); // Using navegacion for the title if needed, or just hardcode/add new translation
    const [books, setBooks] = useState<BookRecomendations[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                setLoading(true);
                const data = await getAllBooks();
                setBooks(data);
            } catch (err) {
                console.error("Error fetching books:", err);
                setError("Error al cargar los libros.");
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold font-newsreader text-[var(--colorPrincipal)] mb-6">
                {t("navbar.books")}
            </h1>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <p className="text-lg text-[var(--text)]">Cargando libros...</p>
                </div>
            ) : error ? (
                <div className="flex justify-center items-center h-64">
                    <p className="text-red-500">{error}</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {books.map((book) => (
                        <BookCard
                            key={book._id}
                            title={book.titulo}
                            autor={book.autoresData[0]?.nombre || "Autor desconocido"}
                            imageUrl={book.portada || "/Images/default-book.jpg"}
                            href={`/miBiblioteca/libros/${book._id}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
