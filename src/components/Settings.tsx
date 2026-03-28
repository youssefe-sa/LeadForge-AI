import { useState, useEffect } from 'react';
import { ApiConfig, ApiStatus, useApiConfig } from '../lib/store';
import { sanitizeSerperKey, sanitizeGroqKey, sanitizeInput } from '../lib/validation';
import SimpleSerperGenerator from './SimpleSerperGenerator';

const C = {
  bg: '#F7F6F2', surface: '#FFFFFF', surface2: '#F2F1EC',
  border: '#E4E2DA', tx: '#1C1B18', tx2: '#5C5A53', tx3: '#9B9890',
  accent: '#D4500A', accent2: '#F0E8DF',
  green: '#1A7A4A', blue: '#1A4FA0', amber: '#B45309', red: '#C0392B',
};

interface Props {
  config: ApiConfig;
  updateConfig: (updates: Partial<ApiConfig>) => void;
  statuses: Record<string, ApiStatus>;
  setStatus: (id: string, status: ApiStatus) => void;
  onClearData: () => void;
}

interface Section {
  id: string;
  title: string;
  icon: string;
  color: string;
  required: boolean;
  agents: string[];
  shortDesc: string;
  longDesc: string;
  whyNeeded: string;
  freeInfo: string;
  fields: Array<{
    key: keyof ApiConfig;
    label: string;
    masked: boolean;
    placeholder: string;
    helpUrl?: string;
    helpText?: string;
  }>;
  testFn: (c: ApiConfig) => Promise<{ ok: boolean; msg: string }>;
}

export default function Settings({ config, updateConfig, statuses, setStatus, onClearData }: Props) {
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());
  const [testResults, setTestResults] = useState<Record<string, string>>({});
  const [showSerperManager, setShowSerperManager] = useState(false);

  const toggleVisible = (key: string) => {
    setVisibleKeys(prev => { const n = new Set(prev); n.has(key) ? n.delete(key) : n.add(key); return n; });
  };

  // Écouter les mises à jour de configuration API
  useEffect(() => {
    const handleConfigUpdate = (event: CustomEvent) => {
      // Log uniquement en développement
      if (process.env.NODE_ENV === 'development') {
        console.log('🔧 API Config updated event received:', event.detail);
      }
      updateConfig(event.detail);
    };

    window.addEventListener('apiConfigUpdated', handleConfigUpdate as EventListener);
    
    return () => {
      window.removeEventListener('apiConfigUpdated', handleConfigUpdate as EventListener);
    };
  }, [updateConfig]);

  const updateConfigWithValidation = (updates: Partial<ApiConfig>) => {
    const validatedUpdates: Partial<ApiConfig> = {};
    
    // Validation des clés API
    if (updates.serperKey !== undefined) {
      const sanitized = sanitizeSerperKey(updates.serperKey);
      validatedUpdates.serperKey = sanitized || '';
    }
    
    if (updates.groqKey !== undefined) {
      const sanitized = sanitizeGroqKey(updates.groqKey);
      validatedUpdates.groqKey = sanitized || '';
    }
    
    // Gmail SMTP validation
    if (updates.gmailSmtpUser !== undefined) {
      validatedUpdates.gmailSmtpUser = sanitizeInput(updates.gmailSmtpUser);
    }
    if (updates.gmailSmtpPassword !== undefined) {
      validatedUpdates.gmailSmtpPassword = sanitizeInput(updates.gmailSmtpPassword);
    }
    if (updates.gmailSmtpFromName !== undefined) {
      validatedUpdates.gmailSmtpFromName = sanitizeInput(updates.gmailSmtpFromName);
    }
    if (updates.gmailSmtpFromEmail !== undefined) {
      validatedUpdates.gmailSmtpFromEmail = sanitizeInput(updates.gmailSmtpFromEmail);
    }
    if (updates.gmailSmtpHost !== undefined) {
      validatedUpdates.gmailSmtpHost = sanitizeInput(updates.gmailSmtpHost) || 'smtp.gmail.com';
    }
    if (updates.gmailSmtpPort !== undefined) {
      validatedUpdates.gmailSmtpPort = typeof updates.gmailSmtpPort === 'number' ? updates.gmailSmtpPort : 587;
    }
    if (updates.gmailSmtpSecure !== undefined) {
      validatedUpdates.gmailSmtpSecure = !!updates.gmailSmtpSecure;
    }
    
    updateConfig(validatedUpdates);
  };

  const testApi = async (section: Section) => {
    setStatus(section.id, 'testing' as const);
    setTestResults(prev => ({ ...prev, [section.id]: 'Test en cours...' }));
    
    try {
      const result = await section.testFn(config);
      setTestResults(prev => ({ ...prev, [section.id]: result.msg }));
      setStatus(section.id, result.ok ? 'active' as const : 'error' as const);
    } catch (error) {
      setTestResults(prev => ({ ...prev, [section.id]: '❌ Erreur de test' }));
      setStatus(section.id, 'error' as const);
    }
  };

  // Sections API
  const sections: Section[] = [
    // SERPER
    {
      id: 'serper', title: 'Serper.dev API', icon: '🔍', color: C.green,
      required: true,
      agents: ['Agent 1'],
      shortDesc: 'Recherche Google + Google Maps + Images — enrichit chaque lead',
      longDesc: 'Serper est une API Google Search qui permet de rechercher les informations Google Maps (note, avis, photos, catégorie, adresse), les images du commerce, et des informations web complémentaires. C\'est la source principale d\'enrichissement des leads.',
      whyNeeded: 'OBLIGATOIRE. Sans Serper, pas de photos, pas de données Google Maps, pas d\'enrichissement web. Les sites générés seront génériques.',
      freeInfo: '✅ GRATUIT — 2 500 recherches gratuites à l\'inscription. Ensuite $50/mois pour 50 000 recherches.',
      fields: [
        { key: 'serperKey', label: 'API Key', masked: true, placeholder: 'Votre clé API Serper',
          helpText: 'Utilisez le générateur automatique ci-dessus' },
      ],
      testFn: async (c) => {
        if (!c.serperKey) return { ok: false, msg: '❌ Aucune clé' };
        try {
          const res = await fetch('https://google.serper.dev/search', {
            method: 'POST',
            headers: { 'X-API-KEY': c.serperKey, 'Content-Type': 'application/json' },
            body: JSON.stringify({ q: 'test', num: 1 }),
          });
          if (res.ok) return { ok: true, msg: '✅ Serper opérationnel ! Recherche Google fonctionnelle.' };
          return { ok: false, msg: `❌ Erreur ${res.status}: Clé invalide` };
        } catch {
          return { ok: false, msg: '❌ Erreur réseau' };
        }
      },
    },

    // GROQ
    {
      id: 'groq', title: 'Groq (Llama)', icon: '🚀', color: C.accent,
      required: true,
      agents: ['Agent 1', 'Agent 2', 'Agent 3', 'Agent 4'],
      shortDesc: 'LLM ultra-rapide — Agent principal',
      longDesc: 'Groq est une plateforme qui offre des modèles LLM (Llama, Mixtral, etc.) avec une vitesse d\'inférence exceptionnelle. Utilisé pour tous les agents IA : analyse de leads, scoring, génération de sites, emails personnalisés.',
      whyNeeded: 'OBLIGATOIRE. Sans Groq, aucun agent IA ne fonctionne. C\'est le moteur principal de l\'application.',
      freeInfo: '✅ GRATUIT — Très généreux : ~10 000 requêtes/jour avec modèles Llama 3.1 8B.',
      fields: [
        { key: 'groqKey', label: 'API Key', masked: true, placeholder: 'gsk_xxxxxxxxxxxxxxxxxxxx',
          helpUrl: 'https://console.groq.com/keys',
          helpText: 'console.groq.com → Keys → Create Key → Choisissez Llama 3.1 8B → Copiez la clé' },
      ],
      testFn: async (c) => {
        if (!c.groqKey) return { ok: false, msg: '❌ Aucune clé' };
        if (!c.groqKey.startsWith('gsk_')) return { ok: false, msg: '❌ Doit commencer par gsk_' };
        const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST', headers: { 'Authorization': `Bearer ${c.groqKey}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ model: 'llama-3.1-8b-instant', messages: [{ role: 'user', content: 'Say OK' }], max_tokens: 10 }),
        });
        if (res.ok) return { ok: true, msg: '✅ Groq opérationnel ! LLM ultra-rapide prêt.' };
        return { ok: false, msg: `❌ Erreur ${res.status}: Clé invalide` };
      },
    },

    // GMAIL SMTP
    {
      id: 'gmailSmtp', title: 'Gmail SMTP', icon: '📧', color: C.amber,
      required: true,
      agents: ['Agent 4'],
      shortDesc: 'Envoi d\'emails via Gmail SMTP — 100% gratuit',
      longDesc: 'Configuration SMTP Gmail pour envoyer des emails transactionnels. Utilise votre compte Gmail existant. Nécessite un mot de passe d\'application (App Password) pour la sécurité.',
      whyNeeded: 'OBLIGATOIRE. Permet d\'envoyer des séquences d\'emails aux leads qualifiés. Gratuit jusqu\'à 500 emails/jour.',
      freeInfo: '✅ 100% GRATUIT — Jusqu\'à 500 emails/jour. Nécessite un mot de passe d\'application Gmail.',
      fields: [
        { key: 'gmailSmtpUser', label: 'Email Gmail', masked: false, placeholder: 'votre.email@gmail.com',
          helpText: 'Votre adresse Gmail complète' },
        { key: 'gmailSmtpPassword', label: 'Mot de passe d\'application', masked: true, placeholder: 'xxxx xxxx xxxx xxxx',
          helpUrl: 'https://myaccount.google.com/apppasswords',
          helpText: 'myaccount.google.com → Sécurité → Mots de passe d\'application → Générer (16 caractères)' },
        { key: 'gmailSmtpFromName', label: 'Nom d\'expéditeur', masked: false, placeholder: 'Votre Nom',
          helpText: 'Le nom qui apparaîtra dans les emails envoyés' },
        { key: 'gmailSmtpFromEmail', label: 'Email d\'expéditeur', masked: false, placeholder: 'contact@votredomaine.com',
          helpText: 'Email de réponse (peut être différent de Gmail)' },
      ],
      testFn: async (c) => {
        if (!c.gmailSmtpUser || !c.gmailSmtpPassword) {
          return { ok: false, msg: '❌ Email et mot de passe requis' };
        }
        // Validation basique du format email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(c.gmailSmtpUser)) {
          return { ok: false, msg: '❌ Format email invalide' };
        }
        // Validation du mot de passe d'application (16 caractères)
        if (c.gmailSmtpPassword.replace(/\s/g, '').length !== 16) {
          return { ok: false, msg: '⚠️ Le mot de passe doit faire 16 caractères (sans espaces)' };
        }
        return { ok: true, msg: '✅ Configuration SMTP valide. Test d\'envoi disponible dans l\'agent Email.' };
      },
    },
  ];

  if (showSerperManager) {
    return <SimpleSerperGenerator onClose={() => setShowSerperManager(false)} />;
  }

  return (
    <div style={{ padding: 20, maxWidth: 800, margin: '0 auto' }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, color: C.tx, marginBottom: 8 }}>⚙️ Paramètres API</h1>
      <p style={{ fontSize: 14, color: C.tx3, marginBottom: 24 }}>
        Configurez vos clés API pour activer les fonctionnalités d'enrichissement des leads.
      </p>

      {/* API Status */}
      <div style={{
        background: C.surface, borderRadius: 10, padding: '20px 24px',
        border: `1px solid ${C.border}`, marginBottom: 20,
      }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, color: C.tx, marginBottom: 12 }}>🔊 État des APIs</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
          {Object.entries(statuses).map(([key, status]) => (
            <div key={key} style={{
              padding: '10px 14px', borderRadius: 6, background: C.bg,
              border: `1px solid ${status === 'active' ? C.green + '30' : status === 'testing' ? C.amber + '30' : C.border}`,
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <div style={{
                width: 8, height: 8, borderRadius: '50%',
                background: status === 'active' ? C.green : status === 'testing' ? C.amber : C.tx3,
              }} />
              <span style={{ fontSize: 12, fontWeight: 500, color: C.tx2 }}>
                {key} ({status === 'active' ? '✅' : status === 'testing' ? '⏳' : '❌'})
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* API Config */}
      <div style={{
        background: C.surface, borderRadius: 10, padding: '20px 24px',
        border: `1px solid ${C.border}`, marginBottom: 20,
      }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, color: C.tx, marginBottom: 12 }}>🔑 Configuration API</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {sections.map(section => (
            <div key={section.id} style={{
              background: C.bg, borderRadius: 8, padding: 16,
              border: `1px solid ${C.border}`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 8, background: section.color + '20',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
                }}>{section.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: C.tx }}>{section.title}</div>
                  <div style={{ fontSize: 12, color: C.tx3 }}>{section.shortDesc}</div>
                </div>
                <div style={{
                  padding: '4px 8px', borderRadius: 12, fontSize: 10, fontWeight: 600,
                  background: section.required ? C.red + '20' : C.green + '20',
                  color: section.required ? C.red : C.green,
                }}>
                  {section.required ? 'Obligatoire' : 'Optionnel'}
                </div>
              </div>

              {/* Fields */}
              <form onSubmit={e => e.preventDefault()} style={{ padding: '0 0px 0px' }}>
                {section.fields.map(field => (
                  <div key={field.key} style={{ marginBottom: 10 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                      <label style={{ fontSize: 12, fontWeight: 600, color: C.tx2 }}>{field.label}</label>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        {section.id === 'serper' && (
                          <button
                            onClick={() => setShowSerperManager(true)}
                            style={{
                              padding: '4px 8px', borderRadius: 4, border: '1px solid #10B981',
                              background: '#F0FDF4', color: '#065F46', fontSize: 10, fontWeight: 600,
                              cursor: 'pointer', transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={e => { 
                              (e.currentTarget as HTMLElement).style.background = '#E8F5E8'; 
                              (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
                            }}
                            onMouseLeave={e => { 
                              (e.currentTarget as HTMLElement).style.background = '#F0FDF4'; 
                              (e.currentTarget as HTMLElement).style.transform = 'translateY(0px)';
                            }}
                          >
                            🔑 Générateur
                          </button>
                        )}
                        {section.id === 'gmailSmtp' && field.key === 'gmailSmtpPassword' && (
                          <a
                            href="https://myaccount.google.com/apppasswords"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              padding: '4px 8px', borderRadius: 4, border: '1px solid #EA4335',
                              background: '#FCE8E6', color: '#C5221F', fontSize: 10, fontWeight: 600,
                              cursor: 'pointer', textDecoration: 'none',
                              transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={e => { 
                              (e.currentTarget as HTMLElement).style.background = '#FADBD8'; 
                            }}
                            onMouseLeave={e => { 
                              (e.currentTarget as HTMLElement).style.background = '#FCE8E6'; 
                            }}
                          >
                            🔐 Guide Gmail
                          </a>
                        )}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <input
                        type={field.masked && !visibleKeys.has(field.key) ? 'password' : 'text'}
                        autoComplete="off"
                        value={config[field.key] || ''}
                        onChange={e => updateConfigWithValidation({ [field.key]: e.target.value })}
                        placeholder={field.placeholder}
                        style={{
                          flex: 1, padding: '9px 13px', borderRadius: 6,
                          border: `1px solid ${C.border}`, fontSize: 13,
                          background: C.surface, color: C.tx,
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => toggleVisible(field.key)}
                        style={{
                          padding: '8px 10px', borderRadius: 4, border: `1px solid ${C.border}`,
                          background: visibleKeys.has(field.key) ? C.accent2 : C.surface,
                          color: visibleKeys.has(field.key) ? C.tx : C.tx3, fontSize: 11,
                          cursor: 'pointer',
                        }}
                      >
                        {visibleKeys.has(field.key) ? '👁' : '👁‍🗨'}
                      </button>
                      <button
                        type="button"
                        onClick={() => testApi(section)}
                        style={{
                          padding: '8px 12px', borderRadius: 4, border: 'none',
                          background: statuses[section.id] === 'active' ? C.green : statuses[section.id] === 'testing' ? C.amber : C.tx3,
                          color: 'white', fontSize: 11, fontWeight: 600, cursor: 'pointer',
                        }}
                      >
                        {statuses[section.id] === 'testing' ? '⏳' : statuses[section.id] === 'active' ? '✅' : '🧪'}
                      </button>
                    </div>
                    {testResults[section.id] && (
                      <div style={{
                        marginTop: 6, padding: '6px 10px', borderRadius: 4,
                        background: testResults[section.id].includes('✅') ? C.green + '20' : C.red + '20',
                        color: testResults[section.id].includes('✅') ? C.green : C.red,
                        fontSize: 11,
                      }}>
                        {testResults[section.id]}
                      </div>
                    )}
                  </div>
                ))}

                {/* Gmail SMTP Documentation Guide */}
                {section.id === 'gmailSmtp' && (
                  <div style={{
                    marginTop: 16,
                    padding: '16px',
                    borderRadius: 8,
                    background: '#FEF7F0',
                    border: '1px solid #EA4335',
                  }}>
                    <h4 style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: '#C5221F',
                      marginBottom: 12,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                    }}>
                      📖 Guide : Obtenir votre mot de passe Gmail
                    </h4>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {/* Step 1 */}
                      <div style={{
                        display: 'flex',
                        gap: 12,
                        alignItems: 'flex-start',
                        padding: '10px',
                        background: '#FFFFFF',
                        borderRadius: 6,
                        border: '1px solid #E8EAED',
                      }}>
                        <div style={{
                          width: 24,
                          height: 24,
                          borderRadius: '50%',
                          background: '#EA4335',
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 12,
                          fontWeight: 700,
                          flexShrink: 0,
                        }}>1</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 13, fontWeight: 600, color: C.tx, marginBottom: 3 }}>
                            Activez la Validation en 2 étapes
                          </div>
                          <div style={{ fontSize: 12, color: C.tx2, lineHeight: 1.5 }}>
                            Allez sur <a href="https://myaccount.google.com/signinoptions/two-step-verification" target="_blank" rel="noopener noreferrer" style={{ color: '#1A73E8', textDecoration: 'underline' }}>myaccount.google.com → Sécurité → Validation en 2 étapes</a>. C'est OBLIGATOIRE pour générer un mot de passe d'application.
                          </div>
                        </div>
                      </div>

                      {/* Step 2 */}
                      <div style={{
                        display: 'flex',
                        gap: 12,
                        alignItems: 'flex-start',
                        padding: '10px',
                        background: '#FFFFFF',
                        borderRadius: 6,
                        border: '1px solid #E8EAED',
                      }}>
                        <div style={{
                          width: 24,
                          height: 24,
                          borderRadius: '50%',
                          background: '#EA4335',
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 12,
                          fontWeight: 700,
                          flexShrink: 0,
                        }}>2</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 13, fontWeight: 600, color: C.tx, marginBottom: 3 }}>
                            Générez un mot de passe d'application
                          </div>
                          <div style={{ fontSize: 12, color: C.tx2, lineHeight: 1.5 }}>
                            Visitez <a href="https://myaccount.google.com/apppasswords" target="_blank" rel="noopener noreferrer" style={{ color: '#1A73E8', textDecoration: 'underline' }}>myaccount.google.com/apppasswords</a> → "Sélectionner l'application" → Choisissez <strong>Courriel</strong> → Générer.
                          </div>
                        </div>
                      </div>

                      {/* Step 3 */}
                      <div style={{
                        display: 'flex',
                        gap: 12,
                        alignItems: 'flex-start',
                        padding: '10px',
                        background: '#FFFFFF',
                        borderRadius: 6,
                        border: '1px solid #E8EAED',
                      }}>
                        <div style={{
                          width: 24,
                          height: 24,
                          borderRadius: '50%',
                          background: '#34A853',
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 12,
                          fontWeight: 700,
                          flexShrink: 0,
                        }}>3</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 13, fontWeight: 600, color: C.tx, marginBottom: 3 }}>
                            Copiez le mot de passe à 16 caractères
                          </div>
                          <div style={{ fontSize: 12, color: C.tx2, lineHeight: 1.5 }}>
                            Google affiche un mot de passe comme <code style={{ background: '#F1F3F4', padding: '2px 6px', borderRadius: 3, fontFamily: 'monospace', fontSize: 11 }}>abcd efgh ijkl mnop</code>. Copiez-le et collez-le dans le champ <strong>"Mot de passe d'application"</strong> ci-dessus. ⚠️ Ce mot de passe ne s'affiche qu'une seule fois !
                          </div>
                        </div>
                      </div>
                    </div>

                    <div style={{
                      marginTop: 12,
                      padding: '10px',
                      background: '#E8F0FE',
                      borderRadius: 6,
                      fontSize: 12,
                      color: '#1967D2',
                    }}>
                      <strong>💡 Astuce :</strong> Si vous perdez le mot de passe, vous pouvez en générer un nouveau à tout moment sur la même page.
                    </div>
                  </div>
                )}
              </form>
            </div>
          ))}
        </div>
      </div>

      {/* Info panel */}
      <div style={{
        background: C.surface, borderRadius: 10, padding: '20px 24px',
        border: `1px solid ${C.border}`, marginBottom: 20,
      }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, color: C.tx, marginBottom: 12 }}>📊 Agents & Utilisation</h3>
        <div style={{ marginBottom: 16 }}>
          <strong style={{ color: C.tx }}>🤖 Agents qui utilisent ces APIs :</strong>
          <div style={{ paddingLeft: 8, marginTop: 4 }}>
            <div>1️⃣ <strong>Groq</strong> — Agent 1 (Lead Enrichment), Agent 2 (AI Scoring), Agent 3 (Website Generation), Agent 4 (Email)</div>
            <div>2️⃣ <strong>Serper</strong> — Agent 1 (Google Search + Maps + Images)</div>
            <div>3️⃣ <strong>Gmail SMTP</strong> — Agent 4 (Email Sending)</div>
          </div>
        </div>
        <div style={{ marginBottom: 16 }}>
          <strong style={{ color: C.tx }}>🎯 Priorités suggérées :</strong>
          <div style={{ paddingLeft: 8, marginTop: 4 }}>
            <div>1️⃣ <strong>Groq</strong> — Essentiel pour tous les agents IA</div>
            <div>2️⃣ <strong>Serper</strong> — Indispensable pour l'enrichissement des leads</div>
            <div>3️⃣ <strong>Gmail SMTP</strong> — Nécessaire pour l'envoi d'emails (100% gratuit)</div>
          </div>
        </div>
        <div style={{ marginBottom: 16 }}>
          <strong style={{ color: C.tx }}>🖼️ Images — Sources en cascade :</strong>
          <div style={{ paddingLeft: 8, marginTop: 4 }}>
            <div>1️⃣ <strong>Serper</strong> — Photos Google Maps du commerce (gratuit)</div>
            <div>2️⃣ <strong>Images sectorielles</strong> — Bibliothèque d'images par défaut intégrée</div>
          </div>
        </div>
      </div>

      {/* Danger zone */}
      <div style={{
        background: C.surface, borderRadius: 10, padding: '20px 24px',
        border: `1px solid ${C.red}30`, marginTop: 12,
      }}>
        <h3 style={{ fontSize: 15, fontWeight: 600, color: C.red, marginBottom: 8 }}>⚠️ Zone Dangereuse</h3>
        <p style={{ fontSize: 13, color: C.tx3, marginBottom: 14, lineHeight: 1.5 }}>
          Supprimer toutes les données (leads, configurations, historique). Irréversible.
        </p>
        <button onClick={onClearData}
          style={{
            padding: '10px 20px', borderRadius: 6, border: `1px solid ${C.red}`,
            background: '#fff', color: C.red, fontWeight: 600, fontSize: 13, cursor: 'pointer',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#fef2f2'; }}
          onMouseLeave={e => { e.currentTarget.style.background = '#fff'; }}
        >🗑️ Supprimer toutes les données</button>
      </div>
      
      {/* Overlay du générateur Serper */}
      {showSerperManager && (
        <SimpleSerperGenerator onClose={() => setShowSerperManager(false)} />
      )}
    </div>
  );
}
