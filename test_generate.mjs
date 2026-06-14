// Test script to generate a sample site HTML
import { generateUltimateSite } from './src/lib/ultimateTemplate.ts';

const mockLead = {
  name: 'Test Plomberie Express',
  sector: 'plomberie',
  city: 'Lyon',
  phone: '+33 6 12 34 56 78',
  email: 'contact@test-plomberie.fr',
  address: 'Centre Ville, Lyon',
  website: 'https://test-plomberie.fr',
  googleRating: 4.5,
  googleReviews: 128,
  description: 'Artisan plombier professionnel depuis 15 ans',
  images: [],
  websiteImages: [],
  googleReviewsData: []
};

try {
  const html = generateUltimateSite(mockLead);
  
  // Check for key elements
  const checks = {
    tailwindCDN: html.includes('cdn.tailwindcss.com'),
    tailwindComment: html.includes('TailwindCSS CDN'),
    gridClassInSections: html.includes('class="py-20 bg-gray-50"'),
    serviceSection: html.includes('id="services"'),
    aboutSection: html.includes('id="about"'),
    testimonialSection: html.includes('id="testimonials"'),
    contactSection: html.includes('id="contact"'),
    noOrphanDiv: true, // check below
    heroImage: html.includes('heroImage') || html.includes('pexels') || html.includes('unsplash'),
    lucideIcons: html.includes('lucide'),
    layoutVariant: html.includes('layout-variant-'),
    variationCSS: html.includes('template-var-'),
    gridConflict: html.includes('.grid {') && html.includes('display: flex'),
    containerConflict: html.includes('.container {') && html.includes('max-width: 100%'),
    cardConflict: html.includes('.card {') && html.includes('margin-bottom: 1.5rem'),
    isProductionFixed: html.includes('isProduction') === false, // should not be in output
  };
  
  // Check for orphan </div> (a </div> not preceded by a matching <div>)
  const bodyStart = html.indexOf('<body');
  const bodyEnd = html.indexOf('</body>');
  const bodyContent = html.substring(bodyStart, bodyEnd);
  const openDivs = (bodyContent.match(/<div\b/g) || []).length;
  const closeDivs = (bodyContent.match(/<\/div>/g) || []).length;
  checks.noOrphanDiv = openDivs === closeDivs;
  
  console.log('=== HTML GENERATION TEST ===');
  console.log(`HTML length: ${html.length} chars`);
  console.log('');
  
  console.log('=== CRITICAL CHECKS ===');
  for (const [check, result] of Object.entries(checks)) {
    console.log(`${result ? '✅' : '❌'} ${check}: ${result}`);
  }
  
  console.log('');
  console.log('=== DIV BALANCE ===');
  console.log(`Open <div> tags in body: ${openDivs}`);
  console.log(`Close </div> tags in body: ${closeDivs}`);
  console.log(`Balance: ${openDivs === closeDivs ? '✅ MATCH' : '❌ MISMATCH'}`);
  
  // Write to file for inspection
  const fs = await import('fs');
  fs.writeFileSync('test_output.html', html, 'utf-8');
  console.log('\n✅ Written to test_output.html');
  
} catch (e) {
  console.error('❌ ERROR:', e.message);
  console.error(e.stack);
}
