export const useTranslations = jest.fn((namespace) => (key) => {
  return `${namespace}.${key}`;
});

export const NextIntlClientProvider = ({ children }) => children;