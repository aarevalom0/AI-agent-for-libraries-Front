import '@testing-library/jest-dom';

declare global {
  namespace jest {
    interface Matchers<R = void> {
      toBeInTheDocument(): R;
      toHaveClass(className: string): R;
      toHaveAttribute(attr: string, value?: string): R;
      toHaveTextContent(text: string | RegExp): R;
      toHaveStyle(css: string | object): R;
      toBeVisible(): R;
      toBeDisabled(): R;
      toBeEnabled(): R;
      toHaveValue(value: string | number): R;
      toBeChecked(): R;
      toHaveFocus(): R;
      toHaveDisplayValue(value: string | RegExp | (string | RegExp)[]): R;
      toBeGreaterThan(expected: number): R;
      toBeLessThan(expected: number): R;
      toContainElement(element: HTMLElement | null): R;
      toHaveLength(length: number): R;
      toBeTruthy(): R;
      toBeFalsy(): R;
      toBeDefined(): R;
      toBeUndefined(): R;
      toBeNull(): R;
    }
  }
}

export {};
