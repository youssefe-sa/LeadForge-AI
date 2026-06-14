import fs from 'fs/promises';
import path from 'path';
import { generateUltimateSiteAsync } from '../src/lib/ultimateTemplate';

const outDir = path.resolve('./out');

const sampleLead = {
  name: 'Atelier Test SARL',
  sector: 'plomberie',
  city: 'Lyon',
  phone: '+33 6 12 34 56 78',
  email: 'contact@testatelier.fr',
  address: '12 Rue de la République',
  website: 'https://example.com',
  description: 'Artisan plombier expérimenté, interventions rapides et garanties.',
  images: [
    'https://images.unsplash.com/photo-1509515837298-3f14d3b9c52b?w=1200&q=80',
    'https://images.pexels.com/photos/461428/pexels-photo-461428.jpeg'
  ],
  googleRating: 4.8,
  googleReviews: 124,
  googleReviewsData: []
};

async function run() {
  try {
    await fs.mkdir(outDir, { recursive: true });
    console.log('Generating sample site...');
    const html = await generateUltimateSiteAsync(sampleLead, null);
    const outPath = path.join(outDir, 'sample-site.html');
    await fs.writeFile(outPath, html, 'utf8');
    console.log('Wrote sample HTML to', outPath);
  } catch (err) {
    console.error('Generation failed:', err);
    process.exit(1);
  }
}

run();
