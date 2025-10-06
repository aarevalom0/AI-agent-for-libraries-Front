/// <reference types="@testing-library/jest-dom" />

// Add these types to override TypeScript linting issues
declare namespace jest {
  interface Matchers<R> {
    toBeInTheDocument(): R;
    toHaveClass(className: string): R;
    toHaveAttribute(attr: string, value?: any): R;
    toHaveTextContent(text: string | RegExp): R;
    toHaveStyle(css: object | string): R;
    toBeVisible(): R;
    toBeDisabled(): R;
    toBeEnabled(): R;
    toHaveValue(value: any): R;
    toBeChecked(): R;
    toHaveFocus(): R;
  }
}