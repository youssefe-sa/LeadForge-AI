import { defaults } from 'jest-config';

export default {
  // Environment de test DOM
  testEnvironment: 'jsdom',
  
  // Setup des tests
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  
  // Extensions de fichiers
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/*.{test,spec}.{js,jsx,ts,tsx}'
  ],
  
  // Ignorer certains fichiers
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/',
    '<rootDir>/build/'
  ],
  
  // Transformation des fichiers
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest'
  },
  
  // Pas de transformIgnorePatterns pour éviter les problèmes Windows
  transformIgnorePatterns: [],
  
  // Modules à mapper
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  
  // Extensions
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  
  // Timeout
  testTimeout: 10000,
  
  // Verbose output
  verbose: true,
  
  // Désactiver coverage temporairement
  collectCoverage: false,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/main.tsx',
    '!src/vite-env.d.ts'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  
  // Mocks
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  
  // Extensions
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  
  // Timeout
  testTimeout: 10000,
  
  // Verbose output
  verbose: true
};
