import React from 'react';

interface Props {
  size?: 'small' | 'medium' | 'large';
  message?: string;
  fullScreen?: boolean;
}

const LoadingSpinner: React.FC<Props> = ({ 
  size = 'medium', 
  message = 'Chargement...', 
  fullScreen = false 
}) => {
  const sizes = {
    small: { width: 20, height: 20, border: 2 },
    medium: { width: 32, height: 32, border: 3 },
    large: { width: 48, height: 48, border: 4 },
  };

  const currentSize = sizes[size];

  const spinnerStyle: React.CSSProperties = {
    width: currentSize.width,
    height: currentSize.height,
    border: `${currentSize.border}px solid #E4E2DA`,
    borderTop: `${currentSize.border}px solid #D4500A`,
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  };

  const containerStyle: React.CSSProperties = fullScreen
    ? {
        position: 'fixed' as const,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(247, 246, 242, 0.9)',
        zIndex: 9999,
      }
    : {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      };

  return (
    <div style={containerStyle}>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      
      <div style={spinnerStyle} />
      
      {message && (
        <p style={{
          marginTop: '12px',
          fontSize: size === 'small' ? '12px' : size === 'medium' ? '14px' : '16px',
          color: '#5C5A53',
          fontWeight: 500,
          textAlign: 'center',
        }}>
          {message}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;
