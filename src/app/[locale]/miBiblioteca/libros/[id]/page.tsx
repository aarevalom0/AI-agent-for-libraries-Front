'use client';

import React, { useEffect, useState } from 'react';
import BookDetail from '@/components/books/BookDetail';
import { useTranslatedContent } from '@/lib/useTranslatedContent';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { getBookById } from '@/services/bookService';
import type { Book } from '@/types/book';
import { useParams } from 'next/navigation';


export default function BookDetailPage() {
  const { getTranslatedBook } = useTranslatedContent();
  const tMiBiblioteca = useTranslations('miBiblioteca');
  const tBookDetail = useTranslations('bookDetail');

  const { id } = useParams() as { id: string };

  const [book, setBook] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const b: any = await getBookById(id);

        console.log('API Response:', b);

        if (!b || !b.title) {
          setError("notfound");
          return;
        }

        const bookData: Book = {
          id: b.id,
          title: b.title,
          author: b.author.buffer ? 'Autor desconocido' : b.author,
          description: b.description,
          cover: b.cover,
          genres: b.genres || [],
          reviews: b.reviews || [],
        };

        //const translated = getTranslatedBook(bookData);
        //setBook(translated);
        setBook(bookData);
      } catch (e) {
        console.error(e);
        setError("error");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  if (loading) {
    return <div className="text-center py-20">Cargando libro...</div>;
  }

  if (error === "notfound" || !book) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold">{tBookDetail('errors.bookNotFound')}</h1>
        <p className="mt-4">{tBookDetail('errors.bookNotFoundDesc')}</p>
        <Link href="/miBiblioteca" className="mt-6 inline-block bg-[var(--colorPrincipal)] text-white px-6 py-2 rounded-md">
          {tBookDetail('errors.backToLibrary')}
        </Link>
      </div>
    );
  }

  return (
    <BookDetail
      book={book}
      initialReviews={book.reviews}
      previousPage={tMiBiblioteca('menu.myLibrary')}
      previousPageHref={'/miBiblioteca'}
    />
  );
}
