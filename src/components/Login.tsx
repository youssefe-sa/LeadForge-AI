import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

const C = {
  bg: '#F7F6F2',
  surface: '#FFFFFF',
  surface2: '#F2F1EC',
  border: '#E4E2DA',
  tx: '#1C1B18',
  tx2: '#5C5A53',
  tx3: '#9B9890',
  accent: '#D4500A',
  accent2: '#F0E8DF',
  green: '#1A7A4A',
  blue: '#1A4FA0',
  amber: '#B45309',
  red: '#C0392B',
  gradient: 'linear-gradient(135deg, #D4500A 0%, #B45309 100%)',
};

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: C.bg,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    }}>
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        {/* Colonne gauche - Présentation LeadForge AI */}
        <div style={{
          flex: 1,
          background: C.gradient,
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '60px 40px',
          color: 'white'
        }}>
          {/* Pattern de fond subtil */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%), 
                            radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)`,
            pointerEvents: 'none'
          }} />
          
          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '500px' }}>
            {/* Logo et titre alignés horizontalement */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              gap: 20,
              marginBottom: 32
            }}>
              {/* Logo */}
              <div style={{
                width: 64,
                height: 64,
                borderRadius: 16,
                background: 'rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(10px)',
                border: '2px solid rgba(255,255,255,0.3)',
                fontWeight: 700,
                fontSize: 28,
                fontFamily: "'Fraunces', serif",
                color: '#fff',
                filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))',
                flexShrink: 0
              }}>LF</div>
              
              {/* Titre */}
              <div style={{ textAlign: 'left' }}>
                <h1 style={{ 
                  fontSize: 48, 
                  fontWeight: 700, 
                  margin: '0 0 4px 0',
                  letterSpacing: '-0.3px',
                  background: 'linear-gradient(to right, #ffffff, #f0f9ff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  lineHeight: 1.4
                }}>
                  LeadForge AI
                </h1>
                <p style={{ 
                  fontSize: 18, 
                  color: 'rgba(255,255,255,0.9)',
                  margin: 0,
                  fontWeight: 400,
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase'
                }}>
                  Prospection B2B
                </p>
              </div>
            </div>
            
            <p style={{ 
              fontSize: 18, 
              lineHeight: 1.6, 
              margin: '0 0 40px 0',
              opacity: 0.85,
              fontWeight: 300
            }}>
              Système de prospection intelligente : scraping B2B, génération de sites web pour prospects et campagnes d'emailing automatisées
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ 
                  width: 24, 
                  height: 24, 
                  borderRadius: '50%', 
                  background: 'rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 14
                }}>+</div>
                <span style={{ fontSize: 16 }}>Scraping B2B multi-sources</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ 
                  width: 24, 
                  height: 24, 
                  borderRadius: '50%', 
                  background: 'rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 14
                }}>+</div>
                <span style={{ fontSize: 16 }}>Enrichissement IA des données</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ 
                  width: 24, 
                  height: 24, 
                  borderRadius: '50%', 
                  background: 'rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 14
                }}>+</div>
                <span style={{ fontSize: 16 }}>Sites web personnalisés</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ 
                  width: 24, 
                  height: 24, 
                  borderRadius: '50%', 
                  background: 'rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 14
                }}>+</div>
                <span style={{ fontSize: 16 }}>Campagnes emailing automatisées</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ 
                  width: 24, 
                  height: 24, 
                  borderRadius: '50%', 
                  background: 'rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 14
                }}>+</div>
                <span style={{ fontSize: 16 }}>Suivis intelligents adaptatifs</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ 
                  width: 24, 
                  height: 24, 
                  borderRadius: '50%', 
                  background: 'rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 14
                }}>+</div>
                <span style={{ fontSize: 16 }}>Scoring et qualification IA</span>
              </div>
            </div>
            
            {/* Crédits développeur */}
            <div style={{ 
              marginTop: 40,
              padding: '16px',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '12px',
              backdropFilter: 'blur(5px)',
              border: '1px solid rgba(255,255,255,0.1)',
              textAlign: 'center'
            }}>
              <p style={{ 
                fontSize: 12, 
                color: 'rgba(255,255,255,0.7)',
                margin: 0,
                fontStyle: 'italic',
                fontWeight: 300
              }}>
                Développé par S.Youssef
              </p>
            </div>
          </div>
        </div>

        {/* Colonne droite - Formulaire d'authentification */}
        <div style={{
          flex: 1,
          maxWidth: '600px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '60px 80px',
          background: C.surface
        }}>
          <div style={{ maxWidth: '400px', width: '100%', margin: '0 auto' }}>
            <div style={{ marginBottom: 40 }}>
              <h2 style={{ 
                fontSize: 32, 
                fontWeight: 700, 
                color: C.tx,
                margin: '0 0 8px 0',
                letterSpacing: '-0.5px'
              }}>
                Connexion Administrateur
              </h2>
              <p style={{ 
                fontSize: 16, 
                color: C.tx2,
                margin: 0,
                lineHeight: 1.5
              }}>
                Accédez à votre tableau de bord LeadForge AI
              </p>
            </div>

            {error && (
              <div style={{ 
                background: '#FEF2F2', 
                color: C.red, 
                padding: '12px 16px', 
                borderRadius: '8px', 
                fontSize: 14, 
                marginBottom: 24,
                border: `1px solid ${C.red}20`,
                display: 'flex',
                alignItems: 'center',
                gap: 8
              }}>
                <span style={{ fontSize: 16 }}>⚠️</span>
                {error}
              </div>
            )}

            <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div>
                <label style={{ 
                  display: 'block', 
                  fontSize: 14, 
                  fontWeight: 600, 
                  color: C.tx, 
                  marginBottom: 8 
                }}>
                  Adresse email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{ 
                    width: '100%', 
                    padding: '14px 16px', 
                    borderRadius: '8px', 
                    border: `1px solid ${C.border}`, 
                    fontSize: 15,
                    transition: 'all 0.2s ease',
                    background: C.surface,
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                  placeholder="admin@leadforge.ai"
                  onFocus={(e) => {
                    e.target.style.borderColor = C.accent;
                    e.target.style.boxShadow = `0 0 0 3px ${C.accent}15`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = C.border;
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
              
              <div>
                <label style={{ 
                  display: 'block', 
                  fontSize: 14, 
                  fontWeight: 600, 
                  color: C.tx, 
                  marginBottom: 8 
                }}>
                  Mot de passe
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{ 
                    width: '100%', 
                    padding: '14px 16px', 
                    borderRadius: '8px', 
                    border: `1px solid ${C.border}`, 
                    fontSize: 15,
                    transition: 'all 0.2s ease',
                    background: C.surface,
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                  placeholder="••••••••"
                  onFocus={(e) => {
                    e.target.style.borderColor = C.accent;
                    e.target.style.boxShadow = `0 0 0 3px ${C.accent}15`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = C.border;
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%', 
                  padding: '16px 20px', 
                  borderRadius: '8px', 
                  border: 'none',
                  background: C.accent, 
                  color: '#fff', 
                  fontSize: 16, 
                  fontWeight: 600,
                  cursor: loading ? 'wait' : 'pointer', 
                  marginTop: 8, 
                  opacity: loading ? 0.7 : 1,
                  transition: 'all 0.2s ease',
                  boxShadow: loading ? 'none' : `0 2px 8px ${C.accent}30`,
                  boxSizing: 'border-box'
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.currentTarget.style.background = '#B84709';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = `0 4px 12px ${C.accent}40`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    e.currentTarget.style.background = C.accent;
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = `0 2px 8px ${C.accent}30`;
                  }
                }}
              >
                {loading ? (
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                    <div style={{
                      width: 16,
                      height: 16,
                      border: '2px solid rgba(255,255,255,0.3)',
                      borderTop: '2px solid white',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }}></div>
                    Connexion en cours...
                  </span>
                ) : (
                  'Se connecter'
                )}
              </button>
            </form>

            
            {/* Informations de support */}
            <div style={{
              marginTop: 24,
              padding: '16px',
              background: C.surface2,
              borderRadius: '8px',
              border: `1px solid ${C.border}`
            }}>
              <div style={{ 
                fontSize: 12, 
                color: C.tx3,
                textAlign: 'center',
                lineHeight: 1.4
              }}>
                <div style={{ fontWeight: 600, marginBottom: 4, color: C.tx2 }}>Besoin d'aide ?</div>
                Contactez l'administrateur système pour accéder à LeadForge AI
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
