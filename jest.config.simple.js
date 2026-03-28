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
  
  // Modules à transformer
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
