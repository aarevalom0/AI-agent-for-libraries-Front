// Setup file for tests
import '@testing-library/jest-dom'

// Extend Jest matchers with testing-library/jest-dom
declare global {
  namespace jest {
    interface Matchers<R = void> {
      toBeInTheDocument(): R
      toHaveClass(className: string): R
      toHaveAttribute(attr: string, value?: string): R
      toHaveTextContent(text: string | RegExp): R
      toHaveStyle(css: string | Record<string, any>): R
      toBeVisible(): R
      toBeDisabled(): R
      toBeEnabled(): R
      toHaveValue(value: string | number | string[]): R
      toBeChecked(): R
      toHaveFocus(): R
      toHaveDisplayValue(value: string | RegExp | (string | RegExp)[]): R
      toHaveLength(length: number): R
    }
  }
}