import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  // Cargar mensajes con imports explícitos por locale
  const messages = locale === 'es'
    ? {
        mainPage: (await import('../messages/es/mainPage.json')).default,
        componentes: (await import('../messages/es/componentes.json')).default,
        navegacion: (await import('../messages/es/navegacion.json')).default,
        biblioteca: (await import('../messages/es/biblioteca.json')).default,
        formularios: (await import('../messages/es/formularios.json')).default,
        miBiblioteca: (await import('../messages/es/miBiblioteca.json')).default,
        bookDetail: (await import('../messages/es/bookDetail.json')).default,
        booksContent: (await import('../messages/es/booksContent.json')).default,
        communityPage: (await import('../messages/es/communityPage.json')).default,
        communityLayout: (await import('../messages/es/communityLayout.json')).default


      }
    : {
        mainPage: (await import('../messages/en/mainPage.json')).default,
        componentes: (await import('../messages/en/componentes.json')).default,
        navegacion: (await import('../messages/en/navegacion.json')).default,
        biblioteca: (await import('../messages/en/biblioteca.json')).default,
        formularios: (await import('../messages/en/formularios.json')).default,
        miBiblioteca: (await import('../messages/en/miBiblioteca.json')).default,
        bookDetail: (await import('../messages/en/bookDetail.json')).default,
        booksContent: (await import('../messages/en/booksContent.json')).default,
        communityPage: (await import('../messages/en/communityPage.json')).default,
        communityLayout: (await import('../messages/en/communityLayout.json')).default
    };

  return {
    locale,
    messages
  };
});