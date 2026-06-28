// ============================================================
// LeadForge AI — Lead Scoring Algorithm
// ============================================================

import { Lead } from '../types';

export function calculateScore(lead: Lead): { score: number; temperature: Lead['temperature'] } {
  let score = 0;
  if (lead.name) score += 5;
  if (lead.email) score += 8;
  if (lead.phone) score += 5;
  if (lead.address) score += 3;
  if (lead.city) score += 3;
  if (lead.sector) score += 3;
  if (lead.description) score += 3;
  if (!lead.website || lead.tags.includes('Sans site')) score += 25;
  else if (lead.tags.includes('Site obsolète')) score += 15;
  if (lead.googleRating >= 4.5) score += 10;
  else if (lead.googleRating >= 4.0) score += 7;
  else if (lead.googleRating >= 3.0) score += 4;
  if (lead.googleReviews >= 50) score += 10;
  else if (lead.googleReviews >= 20) score += 7;
  else if (lead.googleReviews >= 5) score += 4;
  const highValueSectors = ['restaurant', 'hotel', 'riad', 'avocat', 'medecin', 'spa', 'clinique', 'dentiste'];
  const medValueSectors = ['commerce', 'boutique', 'garage', 'artisan', 'boulangerie', 'coiffeur', 'salon'];
  const sl = (lead.sector || lead.name || '').toLowerCase();
  if (highValueSectors.some(s => sl.includes(s))) score += 15;
  else if (medValueSectors.some(s => sl.includes(s))) score += 10;
  else score += 5;
  if (lead.images.length > 0) score += 5;
  if (lead.tags.includes('Prioritaire')) score += 5;
  score = Math.min(100, Math.max(0, score));
  let temperature: Lead['temperature'] = 'cold';
  if (score >= 80) temperature = 'very_hot';
  else if (score >= 60) temperature = 'hot';
  else if (score >= 40) temperature = 'warm';
  return { score, temperature };
}
