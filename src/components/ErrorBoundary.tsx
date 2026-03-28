import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    // Log l'erreur en développement uniquement
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI personnalisé
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '400px',
          padding: '40px',
          background: '#F7F6F2',
          borderRadius: '12px',
          border: '1px solid #E4E2DA',
          margin: '20px',
        }}>
          <div style={{
            fontSize: '48px',
            marginBottom: '16px',
          }}>⚠️</div>
          
          <h2 style={{
            fontSize: '24px',
            fontWeight: 600,
            color: '#1C1B18',
            margin: '0 0 8px 0',
            textAlign: 'center',
          }}>
            Une erreur est survenue
          </h2>
          
          <p style={{
            fontSize: '16px',
            color: '#5C5A53',
            margin: '0 0 24px 0',
            textAlign: 'center',
            maxWidth: '500px',
          }}>
            Nous nous excusons pour ce problème. Veuillez rafraîchir la page et réessayer.
          </p>

          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details style={{
              background: '#FFFFFF',
              border: '1px solid #E4E2DA',
              borderRadius: '8px',
              padding: '16px',
              maxWidth: '600px',
              width: '100%',
            }}>
              <summary style={{
                fontSize: '14px',
                fontWeight: 600,
                color: '#1C1B18',
                cursor: 'pointer',
                marginBottom: '8px',
              }}>
                Détails de l'erreur (développement)
              </summary>
              
              <div style={{
                fontSize: '12px',
                fontFamily: 'monospace',
                color: '#C0392B',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}>
                {this.state.error.toString()}
                {this.state.errorInfo && this.state.errorInfo.componentStack}
              </div>
            </details>
          )}

          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              background: '#D4500A',
              color: 'white',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#B45309';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#D4500A';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Rafraîchir la page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
