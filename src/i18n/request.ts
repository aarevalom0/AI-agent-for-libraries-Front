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

      }
    : {
        mainPage: (await import('../messages/en/mainPage.json')).default,
    };

  return {
    locale,
    messages
  };
});