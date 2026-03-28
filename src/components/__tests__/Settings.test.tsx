import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Settings from '../Settings';

// Mock du hook useApiConfig
const mockConfig = {
  serperKey: '',
  groqKey: '',
  unsplashKey: '',
  pexelsKey: '',
  resendKey: '',
  geminiKey: '',
  openrouterKey: '',
};

const mockStatuses = {
  serper: 'inactive',
  groq: 'inactive',
  unsplash: 'inactive',
  pexels: 'inactive',
  resend: 'inactive',
  gemini: 'inactive',
  openrouter: 'inactive',
};

jest.mock('../../lib/store', () => ({
  useApiConfig: () => ({
    config: mockConfig,
    updateConfig: jest.fn(),
    statuses: mockStatuses,
    setStatus: jest.fn(),
  }),
}));

describe('Settings Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('devrait rendre le titre principal', () => {
    render(<Settings 
      config={mockConfig} 
      updateConfig={jest.fn()} 
      statuses={mockStatuses} 
      setStatus={jest.fn()} 
      onClearData={jest.fn()} 
    />);
    
    expect(screen.getByText('⚙️ Configuration API')).toBeInTheDocument();
  });

  it('devrait afficher toutes les sections API', () => {
    render(<Settings 
      config={mockConfig} 
      updateConfig={jest.fn()} 
      statuses={mockStatuses} 
      setStatus={jest.fn()} 
      onClearData={jest.fn()} 
    />);
    
    expect(screen.getByText('Serper.dev API')).toBeInTheDocument();
    expect(screen.getByText('Groq AI')).toBeInTheDocument();
    expect(screen.getByText('Unsplash')).toBeInTheDocument();
    expect(screen.getByText('Pexels')).toBeInTheDocument();
    expect(screen.getByText('Resend')).toBeInTheDocument();
    expect(screen.getByText('Gemini')).toBeInTheDocument();
  });

  it('devrait afficher le statut obligatoire pour Serper', () => {
    render(<Settings 
      config={mockConfig} 
      updateConfig={jest.fn()} 
      statuses={mockStatuses} 
      setStatus={jest.fn()} 
      onClearData={jest.fn()} 
    />);
    
    const serperSection = screen.getByText('Serper.dev API').closest('div');
    expect(serperSection).toHaveTextContent('Obligatoire');
  });

  it('devrait afficher le bouton générateur pour Serper', () => {
    render(<Settings 
      config={mockConfig} 
      updateConfig={jest.fn()} 
      statuses={mockStatuses} 
      setStatus={jest.fn()} 
      onClearData={jest.fn()} 
    />);
    
    expect(screen.getByText('🔑 Générateur')).toBeInTheDocument();
  });

  it('devrait ouvrir le modal SerperGenerator au clic', async () => {
    render(<Settings 
      config={mockConfig} 
      updateConfig={jest.fn()} 
      statuses={mockStatuses} 
      setStatus={jest.fn()} 
      onClearData={jest.fn()} 
    />);
    
    const generatorButton = screen.getByText('🔑 Générateur');
    await userEvent.click(generatorButton);
    
    // Vérifier que le modal s'ouvre (SimpleSerperGenerator)
    expect(screen.getByText('🔑 Générateur Serper.dev')).toBeInTheDocument();
  });

  it('devrait permettre de tester les APIs', async () => {
    const mockUpdateConfig = jest.fn();
    
    render(<Settings 
      config={mockConfig} 
      updateConfig={mockUpdateConfig} 
      statuses={mockStatuses} 
      setStatus={jest.fn()} 
      onClearData={jest.fn()} 
    />);
    
    // Trouver le premier bouton de test
    const testButtons = screen.getAllByText('🧪');
    expect(testButtons.length).toBeGreaterThan(0);
    
    // Simuler un clic sur le premier bouton de test
    await userEvent.click(testButtons[0]);
    
    // Vérifier que la fonction de test est appelée
    // (dépend de l'implémentation spécifique du test)
  });

  it('devrait afficher les descriptions des APIs', () => {
    render(<Settings 
      config={mockConfig} 
      updateConfig={jest.fn()} 
      statuses={mockStatuses} 
      setStatus={jest.fn()} 
      onClearData={jest.fn()} 
    />);
    
    // Vérifier la description de Serper
    expect(screen.getByText(/Recherche Google \+ Google Maps \+ Images/)).toBeInTheDocument();
    
    // Vérifier la description de Groq
    expect(screen.getByText(/LLM principal \- scoring, contenu, emails/)).toBeInTheDocument();
  });

  it('devrait gérer les champs masqués (password)', () => {
    render(<Settings 
      config={mockConfig} 
      updateConfig={jest.fn()} 
      statuses={mockStatuses} 
      setStatus={jest.fn()} 
      onClearData={jest.fn()} 
    />);
    
    // Trouver les champs de type password
    const passwordInputs = screen.getAllByDisplayValue('');
    const passwordFields = passwordInputs.filter(input => 
      input.getAttribute('type') === 'password'
    );
    
    // Devrait y avoir au moins un champ masqué (Serper)
    expect(passwordFields.length).toBeGreaterThan(0);
  });

  it('devrait afficher le compteur d\'APIs actives', () => {
    const activeStatuses = {
      ...mockStatuses,
      serper: 'active',
      groq: 'active',
    };
    
    jest.doMock('../../lib/store', () => ({
      useApiConfig: () => ({
        config: mockConfig,
        updateConfig: jest.fn(),
        statuses: activeStatuses,
        setStatus: jest.fn(),
      }),
    }));
    
    render(<Settings 
      config={mockConfig} 
      updateConfig={jest.fn()} 
      statuses={activeStatuses} 
      setStatus={jest.fn()} 
      onClearData={jest.fn()} 
    />);
    
    expect(screen.getByText('2/6 APIs')).toBeInTheDocument();
  });

  it('devrait afficher les messages d\'aide', () => {
    render(<Settings 
      config={mockConfig} 
      updateConfig={jest.fn()} 
      statuses={mockStatuses} 
      setStatus={jest.fn()} 
      onClearData={jest.fn()} 
    />);
    
    // Vérifier les messages d'aide
    expect(screen.getByText(/Utilisez le générateur automatique ci-dessus/)).toBeInTheDocument();
  });
});
