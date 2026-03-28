import {
  sanitizeInput,
  validateEmail,
  validateUrl,
  validateApiKey,
  sanitizeSerperKey,
  sanitizeGroqKey,
  sanitizeResendKey,
  escapeHtml,
  validateFileName,
  rateLimiter,
} from '../validation';

describe('Validation Utils', () => {
  describe('sanitizeInput', () => {
    it('devrait nettoyer les entrées valides', () => {
      expect(sanitizeInput('valid input')).toBe('valid input');
      expect(sanitizeInput('test@example.com')).toBe('test@example.com');
      expect(sanitizeInput(123)).toBe('123');
      expect(sanitizeInput(true)).toBe('true');
    });

    it('devrait supprimer les caractères dangereux', () => {
      expect(sanitizeInput('test<script>alert("xss")</script>')).toBe('testalert("xss")');
      expect(sanitizeInput('test<div>content</div>')).toBe('testcontent');
      expect(sanitizeInput('test<img src=x onerror=alert(1)>')).toBe('testimg src=x onerror=alert(1)');
    });

    it('devrait limiter la longueur', () => {
      const longInput = 'a'.repeat(1500);
      expect(sanitizeInput(longInput)).toBe('a'.repeat(1000));
    });

    it('devrait gérer les types invalides', () => {
      expect(sanitizeInput(null)).toBe('');
      expect(sanitizeInput(undefined)).toBe('');
      expect(sanitizeInput({})).toBe('');
      expect(sanitizeInput([])).toBe('');
    });
  });

  describe('validateEmail', () => {
    it('devrait valider les emails valides', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name+tag@domain.co.uk')).toBe(true);
      expect(validateEmail('user123@test-domain.org')).toBe(true);
    });

    it('devrait rejeter les emails invalides', () => {
      expect(validateEmail('invalid')).toBe(false);
      expect(validateEmail('test@')).toBe(false);
      expect(validateEmail('@example.com')).toBe(false);
      expect(validateEmail('test..test@example.com')).toBe(false);
      expect(validateEmail('test@example')).toBe(false);
    });

    it('devrait gérer les types invalides', () => {
      expect(validateEmail(null)).toBe(false);
      expect(validateEmail(undefined)).toBe(false);
      expect(validateEmail(123)).toBe(false);
      expect(validateEmail([])).toBe(false);
    });

    it('devrait respecter la longueur maximale', () => {
      const longEmail = 'a'.repeat(250) + '@example.com';
      expect(validateEmail(longEmail)).toBe(false);
    });
  });

  describe('validateUrl', () => {
    it('devrait valider les URLs valides', () => {
      expect(validateUrl('https://example.com')).toBe(true);
      expect(validateUrl('http://test.org')).toBe(true);
      expect(validateUrl('https://sub.domain.co.uk/path')).toBe(true);
    });

    it('devrait rejeter les URLs invalides', () => {
      expect(validateUrl('not-a-url')).toBe(false);
      expect(validateUrl('ftp://example.com')).toBe(false);
      expect(validateUrl('javascript:alert(1)')).toBe(false);
      expect(validateUrl('')).toBe(false);
    });

    it('devrait gérer les types invalides', () => {
      expect(validateUrl(null)).toBe(false);
      expect(validateUrl(undefined)).toBe(false);
      expect(validateUrl(123)).toBe(false);
    });
  });

  describe('validateApiKey', () => {
    it('devrait valider les clés API valides', () => {
      expect(validateApiKey('gsk_test123456789')).toBe(true);
      expect(validateApiKey('c5fabc123def456')).toBe(true);
      expect(validateApiKey('re_send123456789')).toBe(true);
    });

    it('devrait rejeter les clés trop courtes', () => {
      expect(validateApiKey('short')).toBe(false);
      expect(validateApiKey('12345')).toBe(false);
    });

    it('devrait rejeter les clés trop longues', () => {
      const longKey = 'a'.repeat(250);
      expect(validateApiKey(longKey)).toBe(false);
    });

    it('devrait rejeter les caractères invalides', () => {
      expect(validateApiKey('test@key')).toBe(false);
      expect(validateApiKey('test#key')).toBe(false);
      expect(validateApiKey('test key')).toBe(false);
      expect(validateApiKey('test/key')).toBe(false);
    });
  });

  describe('sanitizeSerperKey', () => {
    it('devrait valider et nettoyer les clés Serper valides', () => {
      expect(sanitizeSerperKey('c5fabc123def456')).toBe('c5fabc123def456');
      expect(sanitizeSerperKey('a1cxyz789abc123')).toBe('a1cxyz789abc123');
    });

    it('devrait rejeter les clés Serper invalides', () => {
      expect(sanitizeSerperKey('invalid123')).toBe(null);
      expect(sanitizeSerperKey('xyzabc123def456')).toBe(null);
      expect(sanitizeSerperKey('')).toBe(null);
    });

    it('devrait appliquer la sanitization', () => {
      expect(sanitizeSerperKey('c5f<script>alert(1)</script>abc123')).toBe('c5falert(1)abc123');
    });
  });

  describe('sanitizeGroqKey', () => {
    it('devrait valider les clés Groq valides', () => {
      expect(sanitizeGroqKey('gsk_abc123def456')).toBe('gsk_abc123def456');
      expect(sanitizeGroqKey('gsk_xyz789abc123')).toBe('gsk_xyz789abc123');
    });

    it('devrait rejeter les clés Groq invalides', () => {
      expect(sanitizeGroqKey('abc123def456')).toBe(null);
      expect(sanitizeGroqKey('sk_abc123def456')).toBe(null);
      expect(sanitizeGroqKey('')).toBe(null);
    });
  });

  describe('sanitizeResendKey', () => {
    it('devrait valider les clés Resend valides', () => {
      expect(sanitizeResendKey('re_abc123def456')).toBe('re_abc123def456');
      expect(sanitizeResendKey('re_xyz789abc123')).toBe('re_xyz789abc123');
    });

    it('devrait rejeter les clés Resend invalides', () => {
      expect(sanitizeResendKey('abc123def456')).toBe(null);
      expect(sanitizeResendKey('send_abc123def456')).toBe(null);
      expect(sanitizeResendKey('')).toBe(null);
    });
  });

  describe('escapeHtml', () => {
    it('devrait échapper les caractères HTML dangereux', () => {
      expect(escapeHtml('<script>alert("xss")</script>')).toBe('&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;');
      expect(escapeHtml('<div>content</div>')).toBe('&lt;div&gt;content&lt;/div&gt;');
      expect(escapeHtml('test"quote\'single')).toBe('test&quot;quote&#039;single');
      expect(escapeHtml('test & more')).toBe('test &amp; more');
    });

    it('devrait gérer les types invalides', () => {
      expect(escapeHtml(null)).toBe('');
      expect(escapeHtml(undefined)).toBe('');
      expect(escapeHtml(123)).toBe('123');
    });
  });

  describe('validateFileName', () => {
    it('devrait valider les noms de fichiers valides', () => {
      expect(validateFileName('document.pdf')).toBe(true);
      expect(validateFileName('image.jpg')).toBe(true);
      expect(validateFileName('data.csv')).toBe(true);
      expect(validateFileName('file-with-dashes.txt')).toBe(true);
    });

    it('devrait rejeter les noms avec caractères dangereux', () => {
      expect(validateFileName('file<name>.txt')).toBe(false);
      expect(validateFileName('file"name>.txt')).toBe(false);
      expect(validateFileName('file|pipe.txt')).toBe(false);
      expect(validateFileName('file?question.txt')).toBe(false);
    });

    it('devrait rejeter les noms réservés Windows', () => {
      expect(validateFileName('CON.txt')).toBe(false);
      expect(validateFileName('PRN.doc')).toBe(false);
      expect(validateFileName('AUX.pdf')).toBe(false);
      expect(validateFileName('COM1.txt')).toBe(false);
    });

    it('devrait respecter la longueur maximale', () => {
      const longName = 'a'.repeat(260);
      expect(validateFileName(longName)).toBe(false);
    });
  });

  describe('rateLimiter', () => {
    beforeEach(() => {
      // Reset le rate limiter avant chaque test
      (rateLimiter as any).requests.clear();
    });

    it('devrait autoriser les requêtes dans la limite', () => {
      expect(rateLimiter.isAllowed('user1')).toBe(true);
      expect(rateLimiter.isAllowed('user1')).toBe(true);
      expect(rateLimiter.isAllowed('user1')).toBe(true);
    });

    it('devrait bloquer les requêtes excessives', () => {
      // Simuler 100 requêtes rapides
      for (let i = 0; i < 100; i++) {
        rateLimiter.isAllowed('user1');
      }
      
      // La 101ème devrait être bloquée
      expect(rateLimiter.isAllowed('user1')).toBe(false);
    });

    it('devrait gérer différents utilisateurs séparément', () => {
      // Utilisateur 1 fait 100 requêtes
      for (let i = 0; i < 100; i++) {
        rateLimiter.isAllowed('user1');
      }
      
      // Utilisateur 2 peut toujours faire des requêtes
      expect(rateLimiter.isAllowed('user2')).toBe(true);
    });
  });
});
