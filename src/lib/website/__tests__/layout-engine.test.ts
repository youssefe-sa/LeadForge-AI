import { describe, it, expect } from '@jest/globals';

describe('LayoutEngine', () => {
  it('should select classic for plumber', () => {
    const { selectLayout } = require('../layout-engine');
    const layout = selectLayout({ id: '1', sector: 'plomberie', name: 'Test' });
    expect(layout.id).toBe('classic');
  });

  it('should select bold for coiffeur', () => {
    const { selectLayout } = require('../layout-engine');
    const layout = selectLayout({ id: '1', sector: 'coiffeur', name: 'Test' });
    expect(layout.id).toBe('bold');
  });

  it('should respect styleHint override', () => {
    const { selectLayout } = require('../layout-engine');
    const layout = selectLayout({ id: '1', sector: 'plomberie', name: 'Test' }, 'magazine');
    expect(layout.id).toBe('magazine');
  });
});
