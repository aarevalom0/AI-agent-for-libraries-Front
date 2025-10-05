import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Excluir archivos estáticos y APIs
  matcher: [
    '/((?!api|_next|_vercel|.*\\..*).*)',
    '/',
    '/(es|en)/:path*'
  ]
};