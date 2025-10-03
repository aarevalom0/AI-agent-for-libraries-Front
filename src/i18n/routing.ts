import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  // Lista de todos los locales soportados
  locales: ['en', 'es'],
  
  // Locale por defecto
  defaultLocale: 'es',
  
  // Prefijo opcional en la URL
  localePrefix: 'always' // URLs serán /es/... y /en/...
});

// Exportar utilidades de navegación con tipos
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);