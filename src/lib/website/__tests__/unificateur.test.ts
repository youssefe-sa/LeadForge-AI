import { describe, it, expect } from '@jest/globals';

describe('Unificateur', () => {
  it('should generate valid HTML for a lead', async () => {
    const { generateSite } = await import('../unificateur');
    const lead = {
      id: 'test-1',
      name: 'Plomberie Test',
      sector: 'plomberie',
      city: 'Paris',
      description: 'Expert en plomberie',
      phone: '+33612345678',
      email: 'test@test.fr',
      address: 'Paris',
      images: [],
      websiteImages: [],
      googleReviewsData: [],
      googleRating: 0,
      googleReviews: 0,
      logo: '',
    } as any;

    const html = await generateSite(lead, {} as any);
    expect(html).toContain('<!DOCTYPE html>');
    expect(html).toContain('</html>');
    expect(html).toContain('Plomberie Test');
    expect(html.toLowerCase()).toContain('plomberie');
  });
});
