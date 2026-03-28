import { sanitizeInput, validateEmail } from '../lib/validation';

describe('Basic Tests', () => {
  it('should sanitize input correctly', () => {
    expect(sanitizeInput('test')).toBe('test');
    expect(sanitizeInput('<script>alert("xss")</script>')).toBe('alert("xss")');
  });

  it('should validate email correctly', () => {
    expect(validateEmail('test@example.com')).toBe(true);
    expect(validateEmail('invalid')).toBe(false);
  });
});
