import { describe, it, expect, jest, beforeEach } from '@jest/globals';

describe('ImageEngine', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('should return lead images when available', async () => {
    const { fetchImages } = await import('../image-engine');
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({})
      })
    ) as any;

    const lead = {
      id: 'test-1',
      name: 'Test Plumber',
      sector: 'plomberie',
      city: 'Paris',
      images: ['https://example.com/img1.jpg'],
      websiteImages: ['https://example.com/img2.jpg'],
      logo: ''
    } as any;

    const images = await fetchImages(lead, { pexelsKey: '' } as any);
    expect(images).toBeDefined();
    expect(images.gallery.length).toBeGreaterThan(0);
    expect(images.hero).toBe('https://example.com/img1.jpg');
  });

  it('should apply sector filter to exclude mismatched images', () => {
    const { filterImagesBySector } = require('../image-engine');
    const result = filterImagesBySector(
      ['https://example.com/car-engine.jpg', 'https://example.com/plumber-pipe.jpg'],
      'plomberie'
    );
    expect(result.length).toBeGreaterThan(0);
    expect(result).not.toContain('https://example.com/car-engine.jpg');
  });
});
