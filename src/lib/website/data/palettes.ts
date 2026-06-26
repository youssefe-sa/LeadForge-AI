import { Palette } from '../types';

const SECTOR_PALETTES: Record<string, Palette> = {
  plomberie: { primary: '#0f766e', secondary: '#115e59', accent: '#14b8a6', background: '#f0fdfa', "on-primary": '#ffffff', "on-accent": '#ffffff' },
  electricien: { primary: '#1e40af', secondary: '#1e3a8a', accent: '#2563eb', background: '#f8fafc', "on-primary": '#ffffff', "on-accent": '#ffffff' },
  coiffeur: { primary: '#6b21a8', secondary: '#581c87', accent: '#7c3aed', background: '#faf5ff', "on-primary": '#ffffff', "on-accent": '#ffffff' },
  restaurant: { primary: '#c2410c', secondary: '#9a3412', accent: '#ea580c', background: '#fff7ed', "on-primary": '#ffffff', "on-accent": '#ffffff' },
  garage: { primary: '#166534', secondary: '#14532d', accent: '#059669', background: '#f0fdf4', "on-primary": '#ffffff', "on-accent": '#ffffff' },
  nettoyage: { primary: '#059669', secondary: '#047857', accent: '#10b981', background: '#f0fdf4', "on-primary": '#ffffff', "on-accent": '#ffffff' },
  jardin: { primary: '#14532d', secondary: '#166534', accent: '#15803d', background: '#f0fdf4', "on-primary": '#ffffff', "on-accent": '#ffffff' },
  fitness: { primary: '#dc2626', secondary: '#b91c1c', accent: '#ef4444', background: '#fef2f2', "on-primary": '#ffffff', "on-accent": '#ffffff' },
  medical: { primary: '#1e40af', secondary: '#1e3a8a', accent: '#2563eb', background: '#eff6ff', "on-primary": '#ffffff', "on-accent": '#ffffff' },
  avocat: { primary: '#1e3a8a', secondary: '#172554', accent: '#2563eb', background: '#f8fafc', "on-primary": '#ffffff', "on-accent": '#ffffff' },
  default: { primary: '#1e293b', secondary: '#334155', accent: '#475569', background: '#f8fafc', "on-primary": '#ffffff', "on-accent": '#ffffff' },
};

export function getPalette(sector: string): Palette {
  const s = (sector || '').toLowerCase();
  for (const [key, palette] of Object.entries(SECTOR_PALETTES)) {
    if (s.includes(key)) return palette;
  }
  return SECTOR_PALETTES.default;
}
