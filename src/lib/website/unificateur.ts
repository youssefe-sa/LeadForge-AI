import { Lead, ApiConfig } from '../supabase-store';
import { generateContent } from './content-engine';
import { fetchImages } from './image-engine';
import { selectLayout } from './layout-engine';
import { getPalette } from './data/palettes';

export async function generateSite(
  lead: Lead,
  apiConfig: ApiConfig,
  options?: { style?: string }
): Promise<string> {
  const palette = getPalette(lead.sector);
  const content = await generateContent(lead, apiConfig);
  const images = await fetchImages(lead, apiConfig);
  const layout = selectLayout(lead, options?.style);

  return layout.render(lead, content, images, palette);
}
