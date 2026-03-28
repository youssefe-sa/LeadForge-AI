// Utilitaires de validation pour la sécurité

/**
 * Valide et nettoie une entrée de texte
 */
export function sanitizeInput(input: unknown): string {
  if (typeof input !== 'string') return '';
  
  return input
    // Supprime les caractères dangereux
    .replace(/[<>]/g, '')
    // Limite la longueur
    .slice(0, 1000)
    // Supprime les espaces excessifs
    .trim();
}

/**
 * Valide un email
 */
export function validateEmail(email: unknown): boolean {
  if (typeof email !== 'string') return false;
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

/**
 * Valide une URL
 */
export function validateUrl(url: unknown): boolean {
  if (typeof url !== 'string') return false;
  
  try {
    const urlObj = new URL(url);
    return ['http:', 'https:'].includes(urlObj.protocol);
  } catch {
    return false;
  }
}

/**
 * Valide une clé API (format général)
 */
export function validateApiKey(key: unknown): boolean {
  if (typeof key !== 'string') return false;
  
  // Doit avoir entre 20 et 200 caractères
  if (key.length < 20 || key.length > 200) return false;
  
  // Contient uniquement des caractères alphanumériques et quelques symboles
  const apiKeyRegex = /^[a-zA-Z0-9._-]+$/;
  return apiKeyRegex.test(key);
}

/**
 * Nettoie et valide une clé API Serper
 */
export function sanitizeSerperKey(key: unknown): string | null {
  const sanitized = sanitizeInput(key);
  
  if (!validateApiKey(sanitized)) return null;
  
  // Vérifie le format spécifique à Serper (commence par certains préfixes)
  const validPrefixes = ['c5f', 'a1c', 'b2d', 'e3f'];
  const hasValidPrefix = validPrefixes.some(prefix => 
    sanitized.toLowerCase().startsWith(prefix)
  );
  
  return hasValidPrefix ? sanitized : null;
}

/**
 * Nettoie et valide une clé API Groq
 */
export function sanitizeGroqKey(key: unknown): string | null {
  const sanitized = sanitizeInput(key);
  
  if (!validateApiKey(sanitized)) return null;
  
  // Les clés Groq commencent par "gsk_"
  if (!sanitized.startsWith('gsk_')) return null;
  
  return sanitized;
}

/**
 * Nettoie et valide une clé API Resend
 */
export function sanitizeResendKey(key: unknown): string | null {
  const sanitized = sanitizeInput(key);
  
  if (!validateApiKey(sanitized)) return null;
  
  // Les clés Resend commencent par "re_"
  if (!sanitized.startsWith('re_')) return null;
  
  return sanitized;
}

/**
 * Validation XSS - échappe le HTML
 */
export function escapeHtml(unsafe: unknown): string {
  if (typeof unsafe !== 'string') return '';
  
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Validation pour les noms de fichiers
 */
export function validateFileName(fileName: unknown): boolean {
  if (typeof fileName !== 'string') return false;
  
  // Pas de caractères dangereux
  const dangerousChars = /[<>:"|?*\\]/;
  if (dangerousChars.test(fileName)) return false;
  
  // Pas de noms réservés Windows
  const reservedNames = /^(CON|PRN|AUX|NUL|COM[1-9]|LPT[1-9])$/i;
  if (reservedNames.test(fileName.split('.')[0])) return false;
  
  return fileName.length > 0 && fileName.length <= 255;
}

/**
 * Rate limiting simple en mémoire
 */
class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  
  constructor(private maxRequests: number, private windowMs: number) {}
  
  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const requests = this.requests.get(identifier) || [];
    
    // Nettoie les anciennes requêtes
    const validRequests = requests.filter(time => now - time < this.windowMs);
    
    if (validRequests.length >= this.maxRequests) {
      return false;
    }
    
    validRequests.push(now);
    this.requests.set(identifier, validRequests);
    return true;
  }
}

export const rateLimiter = new RateLimiter(100, 60000); // 100 requêtes par minute
