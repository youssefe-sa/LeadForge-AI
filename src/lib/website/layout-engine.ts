import { Lead } from '../supabase-store';
import { LayoutModule } from './types';
import { classicLayout } from './layouts/classic';
import { modernLayout } from './layouts/modern';
import { boldLayout } from './layouts/bold';
import { magazineLayout } from './layouts/magazine';

const layouts: LayoutModule[] = [classicLayout, modernLayout, boldLayout, magazineLayout];

const SECTOR_LAYOUT_MAP: Record<string, string> = {
  plomberie: 'classic',
  electricien: 'classic',
  garage: 'classic',
  nettoyage: 'classic',
  coiffeur: 'bold',
  spa: 'bold',
  fitness: 'bold',
  beaute: 'bold',
  restaurant: 'modern',
  boulanger: 'modern',
  traiteur: 'modern',
  avocat: 'magazine',
  medecin: 'magazine',
  medical: 'magazine',
  hotel: 'magazine',
  notaire: 'magazine',
};

function getAlternateLayout(baseId: string, sector: string): string {
  const alternates: Record<string, string[]> = {
    'classic': ['modern', 'magazine'],
    'modern': ['classic', 'magazine'],
    'bold': ['modern', 'classic'],
    'magazine': ['classic', 'modern'],
  };
  const alts = alternates[baseId] || ['classic'];
  return alts[Math.abs(sector.split('').reduce((a, c) => a + c.charCodeAt(0), 0)) % alts.length];
}

export function selectLayout(lead: Lead, styleHint?: string): LayoutModule {
  if (styleHint) {
    const match = layouts.find(l => l.id === styleHint);
    if (match) return match;
  }

  const sector = (lead.sector || '').toLowerCase();
  let layoutId = 'classic';

  for (const [key, id] of Object.entries(SECTOR_LAYOUT_MAP)) {
    if (sector.includes(key)) { layoutId = id; break; }
  }

  const hash = (lead.name || lead.id).split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  if (hash % 10 === 0) {
    layoutId = getAlternateLayout(layoutId, sector);
  }

  return layouts.find(l => l.id === layoutId) || layouts[0];
}
