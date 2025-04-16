/// <reference types="vitest" />
/// <reference types="@testing-library/jest-dom" />

import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';

declare global {
  namespace Vi {
    interface JestAssertion<T = any>
      extends jest.Matchers<void, T>,
        TestingLibraryMatchers<T, void> {}
  }
}

// Re-export all types from Jest
declare global {
  namespace jest {
    interface Matchers<R, T> {
      toBeInTheDocument(): R;
      toHaveStyle(style: string): R;
    }
  }
}

// Make TypeScript recognize the global Jest functions
declare global {
  const describe: (typeof import('vitest'))['describe'];
  const it: (typeof import('vitest'))['it'];
  const expect: (typeof import('vitest'))['expect'];
  const beforeEach: (typeof import('vitest'))['beforeEach'];
  const afterEach: (typeof import('vitest'))['afterEach'];
  const beforeAll: (typeof import('vitest'))['beforeAll'];
  const afterAll: (typeof import('vitest'))['afterAll'];
  const vi: (typeof import('vitest'))['vi'];
}

export {};
