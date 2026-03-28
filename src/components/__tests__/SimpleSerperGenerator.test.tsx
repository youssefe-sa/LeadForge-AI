import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SimpleSerperGenerator from '../SimpleSerperGenerator';

// Mock window.open
const mockOpen = jest.fn();
Object.defineProperty(window, 'open', { value: mockOpen });

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

describe('SimpleSerperGenerator Component', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('devrait rendre le titre principal', () => {
    render(<SimpleSerperGenerator onClose={mockOnClose} />);
    
    expect(screen.getByText('🔑 Générateur Serper.dev')).toBeInTheDocument();
    expect(screen.getByText('Configuration simple et sécurisée')).toBeInTheDocument();
  });

  it('devrait afficher la barre de progression', () => {
    render(<SimpleSerperGenerator onClose={mockOnClose} />);
    
    // Vérifier les étapes
    expect(screen.getByText('Email Temporaire')).toBeInTheDocument();
    expect(screen.getByText('Inscription Serper')).toBeInTheDocument();
    expect(screen.getByText('Vérification Email')).toBeInTheDocument();
    expect(screen.getByText('Récupérer la Clé')).toBeInTheDocument();
    expect(screen.getByText('Configuration')).toBeInTheDocument();
    expect(screen.getByText('Terminé !')).toBeInTheDocument();
  });

  it('devrait commencer à l\'étape 1', () => {
    render(<SimpleSerperGenerator onClose={mockOnClose} />);
    
    // L'étape 1 doit être active
    const step1Element = screen.getByText('Email Temporaire').closest('div');
    expect(step1Element).toHaveStyle({ color: '#1e293b' });
  });

  it('devrait ouvrir 10minutemail.com à l\'étape 1', async () => {
    render(<SimpleSerperGenerator onClose={mockOnClose} />);
    
    const stepButton = screen.getByText('Ouvrir Email Temporaire');
    await userEvent.click(stepButton);
    
    expect(mockOpen).toHaveBeenCalledWith(
      'https://10minutemail.com',
      '_blank',
      'width=900,height=700,scrollbars=yes,resizable=yes'
    );
  });

  it('devrait passer à l\'étape 2 au clic sur suivant', async () => {
    render(<SimpleSerperGenerator onClose={mockOnClose} />);
    
    const nextButton = screen.getByText('Suivant');
    await userEvent.click(nextButton);
    
    // L'étape 2 doit devenir active
    await waitFor(() => {
      const step2Element = screen.getByText('Inscription Serper').closest('div');
      expect(step2Element).toHaveStyle({ color: '#1e293b' });
    });
  });

  it('devrait ouvrir serper.dev à l\'étape 2', async () => {
    render(<SimpleSerperGenerator onClose={mockOnClose} />);
    
    // Passer à l'étape 2
    const nextButton = screen.getByText('Suivant');
    await userEvent.click(nextButton);
    
    await waitFor(() => {
      const step2Button = screen.getByText('S\'inscrire sur Serper.dev');
      userEvent.click(step2Button);
    });
    
    expect(mockOpen).toHaveBeenCalledWith(
      'https://serper.dev/signup',
      '_blank',
      'width=900,height=700,scrollbars=yes,resizable=yes'
    );
  });

  it('devrait afficher le champ de saisie de lien à l\'étape 3', async () => {
    render(<SimpleSerperGenerator onClose={mockOnClose} />);
    
    // Passer à l'étape 3
    for (let i = 0; i < 2; i++) {
      const nextButton = screen.getByText('Suivant');
      await userEvent.click(nextButton);
    }
    
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Collez le lien de vérification reçu par email...')).toBeInTheDocument();
      expect(screen.getByText('Lien de vérification email')).toBeInTheDocument();
    });
  });

  it('devrait permettre de saisir le lien de vérification', async () => {
    render(<SimpleSerperGenerator onClose={mockOnClose} />);
    
    // Passer à l'étape 3
    for (let i = 0; i < 2; i++) {
      const nextButton = screen.getByText('Suivant');
      await userEvent.click(nextButton);
    }
    
    await waitFor(() => {
      const linkInput = screen.getByPlaceholderText('Collez le lien de vérification reçu par email...');
      await userEvent.type(linkInput, 'https://serper.dev/verify?token=abc123');
      
      expect(linkInput).toHaveValue('https://serper.dev/verify?token=abc123');
    });
  });

  it('devrait ouvrir le lien de vérification', async () => {
    render(<SimpleSerperGenerator onClose={mockOnClose} />);
    
    // Passer à l'étape 3 et saisir un lien
    for (let i = 0; i < 2; i++) {
      const nextButton = screen.getByText('Suivant');
      await userEvent.click(nextButton);
    }
    
    await waitFor(() => {
      const linkInput = screen.getByPlaceholderText('Collez le lien de vérification reçu par email...');
      await userEvent.type(linkInput, 'https://serper.dev/verify?token=abc123');
      
      const openLinkButton = screen.getByText('📧 Ouvrir le lien de vérification');
      await userEvent.click(openLinkButton);
      
      expect(mockOpen).toHaveBeenCalledWith(
        'https://serper.dev/verify?token=abc123',
        '_blank',
        'width=900,height=700,scrollbars=yes,resizable=yes'
      );
    });
  });

  it('devrait afficher le champ API key à l\'étape 5', async () => {
    render(<SimpleSerperGenerator onClose={mockOnClose} />);
    
    // Passer à l'étape 5 (Configuration)
    for (let i = 0; i < 4; i++) {
      const nextButton = screen.getByText('Suivant');
      await userEvent.click(nextButton);
    }
    
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Collez votre clé API ici...')).toBeInTheDocument();
      expect(screen.getByText('Clé API Serper.dev')).toBeInTheDocument();
    });
  });

  it('devrait permettre de saisir la clé API', async () => {
    render(<SimpleSerperGenerator onClose={mockOnClose} />);
    
    // Passer à l'étape 5
    for (let i = 0; i < 4; i++) {
      const nextButton = screen.getByText('Suivant');
      await userEvent.click(nextButton);
    }
    
    await waitFor(() => {
      const apiKeyInput = screen.getByPlaceholderText('Collez votre clé API ici...');
      await userEvent.type(apiKeyInput, 'c5f123abc456def789');
      
      expect(apiKeyInput).toHaveValue('c5f123abc456def789');
    });
  });

  it('devrait sauvegarder la clé API dans localStorage', async () => {
    render(<SimpleSerperGenerator onClose={mockOnClose} />);
    
    // Passer à l'étape 5 et saisir une clé
    for (let i = 0; i < 4; i++) {
      const nextButton = screen.getByText('Suivant');
      await userEvent.click(nextButton);
    }
    
    await waitFor(() => {
      const apiKeyInput = screen.getByPlaceholderText('Collez votre clé API ici...');
      userEvent.type(apiKeyInput, 'c5f123abc456def789');
      
      const saveButton = screen.getByText('Sauvegarder');
      await userEvent.click(saveButton);
      
      // Vérifier que localStorage est mis à jour
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'apiConfig',
        expect.stringContaining('c5f123abc456def789')
      );
    });
  });

  it('devrait afficher le message de succès à l\'étape 6', async () => {
    render(<SimpleSerperGenerator onClose={mockOnClose} />);
    
    // Passer à l'étape 6 (Terminé)
    for (let i = 0; i < 5; i++) {
      const nextButton = screen.getByText('Suivant');
      await userEvent.click(nextButton);
    }
    
    await waitFor(() => {
      expect(screen.getByText('Configuration réussie !')).toBeInTheDocument();
      expect(screen.getByText(/Votre clé API Serper.dev est maintenant configurée/)).toBeInTheDocument();
    });
  });

  it('devrait fermer le modal au clic sur le bouton fermer', async () => {
    render(<SimpleSerperGenerator onClose={mockOnClose} />);
    
    const closeButton = screen.getByText('✕');
    await userEvent.click(closeButton);
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('devrait fermer le modal à l\'étape finale', async () => {
    render(<SimpleSerperGenerator onClose={mockOnClose} />);
    
    // Passer à l'étape 6
    for (let i = 0; i < 5; i++) {
      const nextButton = screen.getByText('Suivant');
      await userEvent.click(nextButton);
    }
    
    await waitFor(() => {
      const finalButton = screen.getByText('Fermer');
      await userEvent.click(finalButton);
      
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });

  it('devrait désactiver le bouton suivant si pas de clé API', async () => {
    render(<SimpleSerperGenerator onClose={mockOnClose} />);
    
    // Passer à l'étape 5 sans saisir de clé
    for (let i = 0; i < 4; i++) {
      const nextButton = screen.getByText('Suivant');
      await userEvent.click(nextButton);
    }
    
    await waitFor(() => {
      const saveButton = screen.getByText('Sauvegarder');
      expect(saveButton).toBeDisabled();
    });
  });

  it('devrait permettre la navigation avec le bouton précédent', async () => {
    render(<SimpleSerperGenerator onClose={mockOnClose} />);
    
    // Passer à l'étape 3
    for (let i = 0; i < 2; i++) {
      const nextButton = screen.getByText('Suivant');
      await userEvent.click(nextButton);
    }
    
    await waitFor(() => {
      expect(screen.getByText('Précédent')).toBeInTheDocument();
      
      // Cliquer sur précédent
      const prevButton = screen.getByText('Précédent');
      await userEvent.click(prevButton);
      
      // Retour à l'étape 2
      const step2Element = screen.getByText('Inscription Serper').closest('div');
      expect(step2Element).toHaveStyle({ color: '#1e293b' });
    });
  });
});
