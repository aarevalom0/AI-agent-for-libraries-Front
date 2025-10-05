import { render, RenderOptions } from '@testing-library/react'
import { ReactElement, ReactNode } from 'react'

// Mock para next-intl provider si se necesita en el futuro
interface TestProviderProps {
  children: ReactNode
}

const TestProvider = ({ children }: TestProviderProps) => {
  // Aquí se pueden agregar providers adicionales como:
  // - NextIntlClientProvider
  // - Theme providers
  // - Context providers
  // - React Query providers, etc.
  return <>{children}</>
}

// Custom render function que incluye providers
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: TestProvider, ...options })

// Re-export todo de testing library
export * from '@testing-library/react'

// Override render method
export { customRender as render }

// Utilidades adicionales para testing
export const mockLocalStorage = () => {
  const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  }
  
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
    writable: true,
  })
  
  return localStorageMock
}

export const mockSessionStorage = () => {
  const sessionStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  }
  
  Object.defineProperty(window, 'sessionStorage', {
    value: sessionStorageMock,
    writable: true,
  })
  
  return sessionStorageMock
}

// Mock para window.matchMedia
export const mockMatchMedia = () => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  })
}

// Mock para IntersectionObserver
export const mockIntersectionObserver = () => {
  const mockIntersectionObserver = jest.fn()
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  })
  
  Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: mockIntersectionObserver,
  })
  
  Object.defineProperty(global, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: mockIntersectionObserver,
  })
  
  return mockIntersectionObserver
}

// Helper para crear eventos personalizados
export const createEvent = (eventName: string, detail?: unknown) => {
  return new CustomEvent(eventName, { detail })
}

// Helper para esperar un tiempo determinado en las pruebas
export const waitFor = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))