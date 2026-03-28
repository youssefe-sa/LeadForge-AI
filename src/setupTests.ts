import '@testing-library/jest-dom';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock window.open
Object.defineProperty(window, 'open', {
  value: jest.fn(),
});

// Mock CustomEvent
Object.defineProperty(window, 'CustomEvent', {
  value: class CustomEvent {
    type: string;
    detail: any;
    
    constructor(type: string, options?: { detail: any }) {
      this.type = type;
      this.detail = options?.detail;
    }
  },
});

// Mock fetch global
global.fetch = jest.fn();

// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));
