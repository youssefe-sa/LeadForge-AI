import { describe, it, expect } from '@jest/globals';

describe('ContentEngine', () => {
  it('should use enriched templates when no LLM key', async () => {
    const { generateContent } = await import('../content-engine');
    const lead = {
      id: 'test-1',
      name: 'Plomberie Pro',
      sector: 'plomberie',
      city: 'Paris',
      description: 'Expert en plomberie depuis 15 ans',
      googleReviewsData: [{ author: 'Jean', text: 'Excellent service', rating: 5, date: '2024-01-01' }],
      googleRating: 4.8,
      googleReviews: 23,
    } as any;

    const content = await generateContent(lead, {} as any);
    expect(content.heroTitle).toBe('Plomberie Pro');
    expect(content.services.length).toBeGreaterThan(0);
    expect(content.services[0].name).toBeDefined();
    expect(content.testimonials.length).toBe(1);
  });

  it('should include lead data in enriched text', async () => {
    const { generateContent } = await import('../content-engine');
    const lead = {
      id: 'test-2',
      name: 'Électricien Lyon',
      sector: 'electricien',
      city: 'Lyon',
      description: 'Électricien certifié depuis 10 ans',
      googleReviewsData: [],
      googleRating: 0,
      googleReviews: 0,
    } as any;

    const content = await generateContent(lead, {} as any);
    expect(content.heroSubtitle).toContain('Lyon');
    expect(content.whyChooseUs.some(w => w.includes('10'))).toBeTruthy();
  });
});
