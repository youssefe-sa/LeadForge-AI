// --- EMAIL VALIDATION SYSTEM ---
// Vérifie si un email existe et est actif

interface EmailValidationResult {
  email: string;
  isValid: boolean;
  isDeliverable: boolean;
  reason?: string;
  score: number; // 0-100
}

// Services de validation email (gratuits et fiables)
const VALIDATION_APIS = [
  {
    name: 'abstractapi',
    url: 'https://emailvalidation.abstractapi.com/v1',
    keyParam: 'api_key',
    getResponse: (data: any) => ({
      isValid: data.is_valid_format?.value,
      isDeliverable: data.deliverability?.value === 'DELIVERABLE',
      reason: data.deliverability?.value,
      score: data.quality_score?.value || 0
    })
  },
  {
    name: 'hunter',
    url: 'https://api.hunter.io/v2/email-verifier',
    keyParam: 'api_key',
    getResponse: (data: any) => ({
      isValid: data.status !== 'invalid',
      isDeliverable: data.status === 'valid',
      reason: data.status,
      score: data.score || 0
    })
  },
  {
    name: 'zerobounce',
    url: 'https://api.zerobounce.net/v2/validate',
    keyParam: 'api_key',
    getResponse: (data: any) => ({
      isValid: data.status === 'valid',
      isDeliverable: data.status === 'valid',
      reason: data.sub_status || data.status,
      score: 100 - (data.catch_all ? 20 : 0)
    })
  }
];

// Validation via syntax et domain MX records (basique mais rapide)
export async function validateEmailBasic(email: string): Promise<EmailValidationResult> {
  const result: EmailValidationResult = {
    email,
    isValid: false,
    isDeliverable: false,
    score: 0
  };

  try {
    // 1. Validation syntaxique
    const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      result.reason = 'Invalid email format';
      return result;
    }

    // 2. Vérification du domaine
    const domain = email.split('@')[1];
    if (!domain) {
      result.reason = 'No domain found';
      return result;
    }

    // 3. Vérification MX records (via DNS lookup)
    try {
      // Pour le moment, on simule la vérification MX
      // En production, on pourrait utiliser une API DNS
      const commonDomains = ['gmail.com', 'outlook.com', 'yahoo.com', 'sfr.fr', 'orange.fr', 'wanadoo.fr'];
      const businessDomainPatterns = [/.fr$/, /.com$/, /.net$/, /.org$/];
      
      const isCommonPersonal = commonDomains.includes(domain);
      const isBusinessDomain = businessDomainPatterns.some(pattern => pattern.test(domain));
      
      if (!isCommonPersonal && !isBusinessDomain) {
        result.reason = 'Uncommon domain';
        result.score = 30;
        result.isValid = true; // Syntaxe valide mais domaine suspect
        return result;
      }

      result.isValid = true;
      result.score = isCommonPersonal ? 60 : 80; // Les domaines d'entreprise sont plus fiables
      
    } catch (error) {
      result.reason = 'Domain verification failed';
      result.score = 20;
      return result;
    }

  } catch (error) {
    result.reason = 'Validation error';
    result.score = 0;
  }

  return result;
}

// Validation avancée via API externe
export async function validateEmailAdvanced(
  email: string, 
  apiKey?: string,
  service: 'abstractapi' | 'hunter' | 'zerobounce' = 'abstractapi'
): Promise<EmailValidationResult> {
  
  const result: EmailValidationResult = {
    email,
    isValid: false,
    isDeliverable: false,
    score: 0
  };

  if (!apiKey) {
    // Fallback vers validation basique
    return validateEmailBasic(email);
  }

  const validationService = VALIDATION_APIS.find(s => s.name === service);
  if (!validationService) {
    return validateEmailBasic(email);
  }

  try {
    const url = `${validationService.url}?email=${encodeURIComponent(email)}&${validationService.keyParam}=${apiKey}`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    const apiResult = validationService.getResponse(data);
    
    return {
      email,
      isValid: apiResult.isValid,
      isDeliverable: apiResult.isDeliverable,
      reason: apiResult.reason,
      score: apiResult.score
    };

  } catch (error) {
    console.error(`Email validation failed with ${service}:`, error);
    result.reason = 'API validation failed';
    
    // Fallback vers validation basique
    return validateEmailBasic(email);
  }
}

// Validation multiple avec plusieurs services pour plus de fiabilité
export async function validateEmailComprehensive(
  email: string,
  apiKeys: {
    abstractapi?: string;
    hunter?: string;
    zerobounce?: string;
  }
): Promise<EmailValidationResult> {
  const results: EmailValidationResult[] = [];

  // Toujours commencer par la validation basique
  const basicResult = await validateEmailBasic(email);
  if (!basicResult.isValid) {
    return basicResult;
  }
  results.push(basicResult);

  // Essayer les services disponibles
  const services: Array<'abstractapi' | 'hunter' | 'zerobounce'> = ['abstractapi', 'hunter', 'zerobounce'];
  
  for (const service of services) {
    const apiKey = apiKeys[service];
    if (!apiKey) continue;

    try {
      const result = await validateEmailAdvanced(email, apiKey, service);
      results.push(result);
      
      // Si un service confirme la validité, on peut s'arrêter
      if (result.isDeliverable && result.score > 80) {
        return result;
      }
    } catch (error) {
      console.warn(`Service ${service} failed, trying next...`);
    }
  }

  // Combiner les résultats
  if (results.length === 0) {
    return basicResult;
  }

  // Calculer le score moyen
  const avgScore = results.reduce((sum, r) => sum + r.score, 0) / results.length;
  const isDeliverable = results.some(r => r.isDeliverable);
  const isValid = results.every(r => r.isValid);

  return {
    email,
    isValid,
    isDeliverable,
    reason: `Validated with ${results.length} service(s)`,
    score: Math.round(avgScore)
  };
}

// Fonction utilitaire pour filtrer les emails valides
export function filterValidEmails(
  emails: string[],
  apiKeys?: {
    abstractapi?: string;
    hunter?: string;
    zerobounce?: string;
  },
  minScore: number = 70
): Promise<{ email: string; result: EmailValidationResult }[]> {
  
  return Promise.all(
    emails.map(async (email) => {
      const result = apiKeys 
        ? await validateEmailComprehensive(email, apiKeys)
        : await validateEmailBasic(email);
      
      return { email, result };
    })
  ).then(results => 
    results.filter(({ result }) => 
      result.isValid && result.score >= minScore
    )
  );
}

// Export pour utilisation dans les autres modules
export type { EmailValidationResult };
