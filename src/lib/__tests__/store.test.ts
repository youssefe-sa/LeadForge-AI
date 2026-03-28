import { renderHook, act } from '@testing-library/react';
import { useLeads, useApiConfig, useEmailTemplates } from '../store';

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

describe('Store Hooks', () => {
  beforeEach(() => {
    mockLocalStorage.getItem.mockClear();
    mockLocalStorage.setItem.mockClear();
    mockLocalStorage.removeItem.mockClear();
    mockLocalStorage.clear.mockClear();
  });

  describe('useLeads', () => {
    it('devrait retourner les leads initiaux vides', () => {
      mockLocalStorage.getItem.mockReturnValue('[]');
      
      const { result } = renderHook(() => useLeads());
      
      expect(result.current.leads).toEqual([]);
      expect(result.current.leads.length).toBe(0);
    });

    it('devrait ajouter un lead', () => {
      mockLocalStorage.getItem.mockReturnValue('[]');
      
      const { result } = renderHook(() => useLeads());
      const newLead = {
        id: '1',
        name: 'Test Lead',
        email: 'test@example.com',
        phone: '+33612345678',
        website: 'https://example.com',
        sector: 'Technology',
        stage: 'new',
        temperature: '',
        score: 0,
        tags: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      act(() => {
        result.current.addLeads([newLead]);
      });

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'leads',
        JSON.stringify([newLead])
      );
    });

    it('devrait mettre à jour un lead', () => {
      const existingLead = {
        id: '1',
        name: 'Test Lead',
        email: 'test@example.com',
        phone: '+33612345678',
        website: 'https://example.com',
        sector: 'Technology',
        stage: 'new',
        temperature: '',
        score: 0,
        tags: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify([existingLead]));
      
      const { result } = renderHook(() => useLeads());
      
      act(() => {
        result.current.updateLead('1', { name: 'Updated Lead' });
      });

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'leads',
        JSON.stringify([{ ...existingLead, name: 'Updated Lead' }])
      );
    });

    it('devrait supprimer des leads', () => {
      const existingLeads = [
        { id: '1', name: 'Lead 1' },
        { id: '2', name: 'Lead 2' },
      ];
      
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(existingLeads));
      
      const { result } = renderHook(() => useLeads());
      
      act(() => {
        result.current.deleteLeads(['1', '2']);
      });

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('leads', '[]');
    });
  });

  describe('useApiConfig', () => {
    it('devrait retourner la configuration initiale vide', () => {
      mockLocalStorage.getItem.mockReturnValue('{}');
      
      const { result } = renderHook(() => useApiConfig());
      
      expect(result.current.config).toEqual({});
      expect(Object.keys(result.current.config)).toHaveLength(0);
    });

    it('devrait mettre à jour la configuration', () => {
      mockLocalStorage.getItem.mockReturnValue('{}');
      
      const { result } = renderHook(() => useApiConfig());
      
      act(() => {
        result.current.updateConfig({
          serperKey: 'test-key-123',
          groqKey: 'gsk_test-key-456'
        });
      });

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'apiConfig',
        JSON.stringify({
          serperKey: 'test-key-123',
          groqKey: 'gsk_test-key-456'
        })
      );
    });

    it('devrait gérer les statuts des APIs', () => {
      mockLocalStorage.getItem.mockReturnValue('{}');
      
      const { result } = renderHook(() => useApiConfig());
      
      act(() => {
        result.current.setStatus('serper', 'active');
      });

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'apiStatuses',
        JSON.stringify({ serper: 'active' })
      );
    });
  });

  describe('useEmailTemplates', () => {
    it('devrait retourner les templates par défaut', () => {
      mockLocalStorage.getItem.mockReturnValue('[]');
      
      const { result } = renderHook(() => useEmailTemplates());
      
      expect(result.current.templates).toHaveLength(3); // Templates par défaut
      expect(result.current.templates[0]).toHaveProperty('id');
      expect(result.current.templates[0]).toHaveProperty('name');
      expect(result.current.templates[0]).toHaveProperty('subject');
      expect(result.current.templates[0]).toHaveProperty('body');
    });

    it('devrait ajouter un template', () => {
      mockLocalStorage.getItem.mockReturnValue('[]');
      
      const { result } = renderHook(() => useEmailTemplates());
      const newTemplate = {
        id: 'custom-1',
        name: 'Custom Template',
        subject: 'Test Subject',
        body: 'Test body content',
      };

      act(() => {
        result.current.addTemplate(newTemplate);
      });

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'emailTemplates',
        JSON.stringify([newTemplate])
      );
    });
  });
});

describe('Helper Functions', () => {
  describe('safeStr', () => {
    it('devrait convertir les valeurs en string', () => {
      const { safeStr } = require('../store');
      
      expect(safeStr('test')).toBe('test');
      expect(safeStr(123)).toBe('123');
      expect(safeStr(true)).toBe('true');
      expect(safeStr(null)).toBe('');
      expect(safeStr(undefined)).toBe('');
      expect(safeStr(['a', 'b'])).toBe('a,b');
    });
  });

  describe('safeNum', () => {
    it('devrait convertir les valeurs en nombre', () => {
      const { safeNum } = require('../store');
      
      expect(safeNum(123)).toBe(123);
      expect(safeNum('456')).toBe(456);
      expect(safeNum('789.5')).toBe(789.5);
      expect(safeNum(null)).toBe(0);
      expect(safeNum(undefined)).toBe(0);
      expect(safeNum('invalid')).toBe(0);
      expect(safeNum(NaN)).toBe(0);
    });
  });

  describe('safeStrArr', () => {
    it('devrait convertir les valeurs en tableau de strings', () => {
      const { safeStrArr } = require('../store');
      
      expect(safeStrArr(['a', 'b'])).toEqual(['a', 'b']);
      expect(safeStrArr('single')).toEqual(['single']);
      expect(safeStrArr([])).toEqual([]);
      expect(safeStrArr(null)).toEqual([]);
      expect(safeStrArr(undefined)).toEqual([]);
      expect(safeStrArr([1, 2, 'a'])).toEqual(['a']);
    });
  });
});
