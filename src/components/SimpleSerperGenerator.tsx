import { useState } from 'react';
import { configService } from '../lib/supabase';

export default function SimpleSerperGenerator({ onClose }: { onClose: () => void }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [apiKey, setApiKey] = useState('');
  const [verificationLink, setVerificationLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const colors = {
    primary: '#1e40af',
    primaryLight: '#3b82f6',
    secondary: '#64748b',
    success: '#10b981',
    warning: '#f59e0b',
    background: '#f8fafc',
    surface: '#ffffff',
    border: '#e2e8f0',
    text: '#1e293b',
    textLight: '#64748b',
    textMuted: '#94a3b8',
  };

  const openTempMail = () => {
    window.open('https://10minutemail.com', '_blank', 'width=900,height=700,scrollbars=yes,resizable=yes');
  };

  const openSerperSignup = () => {
    window.open('https://serper.dev/signup', '_blank', 'width=900,height=700,scrollbars=yes,resizable=yes');
  };

  const openVerificationLink = () => {
    if (verificationLink) {
      // S'assurer que le lien est valide et l'ouvrir correctement
      const url = verificationLink.startsWith('http') ? verificationLink : `https://${verificationLink}`;
      window.open(url, '_blank', 'width=900,height=700,scrollbars=yes,resizable=yes');
    }
  };

  const openSerperDashboard = () => {
    window.open('https://serper.dev/dashboard', '_blank', 'width=900,height=700,scrollbars=yes,resizable=yes');
  };

  const saveApiKey = async () => {
    setIsLoading(true);
    
    // Sauvegarder dans localStorage
    const currentConfig = JSON.parse(localStorage.getItem('apiConfig') || '{}');
    currentConfig.serperKey = apiKey;
    localStorage.setItem('apiConfig', JSON.stringify(currentConfig));
    
    // Sauvegarder aussi dans Supabase
    try {
      await configService.update({ serperKey: apiKey });
      console.log('✅ Clé Serper sauvegardée dans Supabase');
    } catch (err) {
      console.error('❌ Erreur sauvegarde Supabase:', err);
    }
    
    // Dispatch event pour synchroniser avec Settings
    window.dispatchEvent(new CustomEvent('apiConfigUpdated', { detail: { serperKey: apiKey } }));
    
    // Simuler un délai pour l'UX
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep(6);
    }, 1000);
  };

  const steps = [
    {
      id: 1,
      title: 'Email Temporaire',
      description: 'Créez une adresse email temporaire',
      action: openTempMail,
      buttonText: 'Ouvrir Email Temporaire',
      icon: '📧',
      color: colors.primary,
    },
    {
      id: 2,
      title: 'Inscription Serper',
      description: 'Inscrivez-vous sur Serper.dev avec votre email',
      action: openSerperSignup,
      buttonText: 'S\'inscrire sur Serper.dev',
      icon: '🔑',
      color: colors.primaryLight,
    },
    {
      id: 3,
      title: 'Vérification Email',
      description: 'Entrez le lien de vérification reçu par email',
      action: openVerificationLink,
      buttonText: 'Ouvrir le lien',
      icon: '✉️',
      color: colors.warning,
    },
    {
      id: 4,
      title: 'Récupérer la Clé',
      description: 'Copiez votre clé API depuis le dashboard',
      action: openSerperDashboard,
      buttonText: 'Ouvrir Dashboard',
      icon: '🎯',
      color: colors.warning,
    },
    {
      id: 5,
      title: 'Configuration',
      description: 'Collez votre clé API ici',
      action: null,
      buttonText: 'Sauvegarder',
      icon: '⚙️',
      color: colors.success,
    },
    {
      id: 6,
      title: 'Terminé !',
      description: 'Votre clé API Serper est configurée',
      action: null,
      buttonText: 'Fermer',
      icon: '✅',
      color: colors.success,
    },
  ];

  const currentStepData = steps.find(s => s.id === currentStep);

  const handleStepAction = () => {
    if (currentStep === 5) {
      saveApiKey();
    } else if (currentStep === 6) {
      onClose();
    } else {
      currentStepData?.action?.();
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    }}>
      <div style={{
        background: colors.surface,
        borderRadius: '16px',
        padding: '32px',
        maxWidth: '520px',
        width: '90%',
        maxHeight: '80vh',
        overflow: 'auto',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
        }}>
          <div>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 700,
              color: colors.text,
              margin: '0 0 4px 0',
            }}>
              🔑 Générateur Serper.dev
            </h2>
            <p style={{
              fontSize: '14px',
              color: colors.textLight,
              margin: 0,
            }}>
              Configuration simple et sécurisée
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              border: 'none',
              background: colors.background,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              color: colors.textLight,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = colors.border;
              e.currentTarget.style.color = colors.text;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = colors.background;
              e.currentTarget.style.color = colors.textLight;
            }}
          >
            ✕
          </button>
        </div>

        {/* Progress Bar */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '12px',
          }}>
            {steps.map((step) => (
              <div key={step.id} style={{
                flex: 1,
                textAlign: 'center',
                position: 'relative',
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: currentStep >= step.id 
                    ? step.color 
                    : colors.background,
                  color: currentStep >= step.id 
                    ? 'white' 
                    : colors.textMuted,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  fontWeight: 600,
                  margin: '0 auto 8px auto',
                  transition: 'all 0.3s ease',
                }}>
                  {step.icon}
                </div>
                <div style={{
                  fontSize: '11px',
                  color: currentStep >= step.id ? colors.text : colors.textMuted,
                  fontWeight: currentStep === step.id ? 600 : 400,
                }}>
                  {step.title}
                </div>
              </div>
            ))}
          </div>
          <div style={{
            height: '2px',
            background: colors.border,
            borderRadius: '1px',
            position: 'relative',
            marginTop: '-20px',
            zIndex: -1,
          }}>
            <div style={{
              height: '100%',
              background: colors.primary,
              borderRadius: '1px',
              width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
              transition: 'width 0.3s ease',
            }} />
          </div>
        </div>

        {/* Step Content */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{
            padding: '24px',
            background: colors.background,
            borderRadius: '12px',
            border: `1px solid ${colors.border}`,
            marginBottom: '24px',
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: 600,
              color: colors.text,
              margin: '0 0 8px 0',
            }}>
              Étape {currentStep} : {currentStepData?.title}
            </h3>
            <p style={{
              fontSize: '14px',
              color: colors.textLight,
              margin: 0,
              lineHeight: 1.5,
            }}>
              {currentStepData?.description}
            </p>
          </div>

          {/* Step 3: Email Verification */}
          {currentStep === 3 && (
            <div style={{
              padding: '20px',
              background: colors.surface,
              borderRadius: '12px',
              border: `2px solid ${colors.border}`,
              marginBottom: '24px',
            }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: 600,
                color: colors.text,
                marginBottom: '8px',
              }}>
                Lien de vérification email
              </label>
              <input
                type="text"
                value={verificationLink}
                onChange={(e) => setVerificationLink(e.target.value)}
                placeholder="Collez le lien de vérification reçu par email..."
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: `1px solid ${colors.border}`,
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontFamily: 'monospace',
                  background: colors.background,
                  color: colors.text,
                  outline: 'none',
                  transition: 'border-color 0.2s ease',
                  marginBottom: '12px',
                  boxSizing: 'border-box',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = colors.primary;
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = colors.border;
                }}
              />
              <p style={{
                fontSize: '12px',
                color: colors.textMuted,
                margin: '0 0 12px 0',
              }}>
                💡 Copiez le lien complet de l'email de vérification que vous avez reçu
              </p>
            </div>
          )}

          {/* Step 5: API Key Input */}
          {currentStep === 5 && (
            <div style={{
              padding: '20px',
              background: colors.surface,
              borderRadius: '12px',
              border: `2px solid ${colors.border}`,
              marginBottom: '24px',
            }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: 600,
                color: colors.text,
                marginBottom: '8px',
              }}>
                Clé API Serper.dev
              </label>
              <input
                type="text"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Collez votre clé API ici..."
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: `1px solid ${colors.border}`,
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontFamily: 'monospace',
                  background: colors.background,
                  color: colors.text,
                  outline: 'none',
                  transition: 'border-color 0.2s ease',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = colors.primary;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = colors.border;
                }}
              />
              <p style={{
                fontSize: '12px',
                color: colors.textMuted,
                marginTop: '8px',
                margin: 0,
              }}>
                💡 Votre clé API commence généralement par "c5f..." ou "a1c..."
              </p>
            </div>
          )}

          {/* Step 6: Success Message */}
          {currentStep === 6 && (
            <div style={{
              padding: '20px',
              background: '#f0fdf4',
              borderRadius: '12px',
              border: '1px solid #86efac',
              marginBottom: '24px',
              textAlign: 'center',
            }}>
              <div style={{
                fontSize: '48px',
                marginBottom: '16px',
              }}>
                🎉
              </div>
              <h3 style={{
                fontSize: '18px',
                fontWeight: 600,
                color: colors.success,
                margin: '0 0 8px 0',
              }}>
                Configuration réussie !
              </h3>
              <p style={{
                fontSize: '14px',
                color: colors.textLight,
                margin: 0,
                lineHeight: 1.5,
              }}>
                Votre clé API Serper.dev est maintenant configurée et prête à être utilisée.
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div style={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'flex-end',
        }}>
          {currentStep > 1 && currentStep < 6 && (
            <button
              onClick={handlePrevious}
              style={{
                padding: '12px 24px',
                borderRadius: '8px',
                border: `1px solid ${colors.border}`,
                background: colors.surface,
                color: colors.text,
                fontSize: '14px',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = colors.background;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = colors.surface;
              }}
            >
              Précédent
            </button>
          )}
          <button
            onClick={handleStepAction}
            disabled={currentStep === 5 && !apiKey}
            style={{
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              background: currentStep === 5 && !apiKey 
                ? colors.textMuted 
                : currentStepData?.color || colors.primary,
              color: 'white',
              fontSize: '14px',
              fontWeight: 600,
              cursor: currentStep === 5 && !apiKey ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
              opacity: currentStep === 5 && !apiKey ? 0.5 : 1,
            }}
            onMouseEnter={(e) => {
              if (!(currentStep === 5 && !apiKey)) {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {isLoading ? 'Sauvegarde...' : currentStepData?.buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}
