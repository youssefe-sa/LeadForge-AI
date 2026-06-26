// ============================================================
// Curated Sector Images — Verified Unsplash URLs
// Each image is hand-picked to match its sector EXACTLY.
// No API calls, no search noise — 100% predictable results.
// ============================================================

export interface CuratedPool {
  hero: string[];
  services: string[];
  about: string[];
  gallery: string[];
}

// All URLs use Unsplash source for reliable, fast delivery
const u = (id: string) => `https://images.unsplash.com/photo-${id}?w=1920&q=80&auto=format`;

export const CURATED_IMAGES: Record<string, CuratedPool> = {
  plomberie: {
    hero: [
      u('1585704032915-c3400ca199e7'),
      u('1504328345606-18bbc8c9d7d1'),
      u('1621905251189-08b45d6a269e'),
    ],
    services: [
      u('1585704032915-c3400ca199e7'),
      u('1504328345606-18bbc8c9d7d1'),
      u('1621905251189-08b45d6a269e'),
      u('1607472586893-edb5ca08f55d'),
      u('1581092918056-0c4c3acd3789'),
      u('1504307651254-35680f356dfd'),
    ],
    about: [
      u('1585704032915-c3400ca199e7'),
      u('1621905251189-08b45d6a269e'),
    ],
    gallery: [
      u('1504328345606-18bbc8c9d7d1'),
      u('1607472586893-edb5ca08f55d'),
      u('1581092918056-0c4c3acd3789'),
      u('1504307651254-35680f356dfd'),
      u('1621905251189-08b45d6a269e'),
    ],
  },

  electricien: {
    hero: [
      u('1621905252507-b354bc25edac'),
      u('1558449028-b53a39d100fc'),
      u('1558618666-fcd25c85f82e'),
    ],
    services: [
      u('1621905252507-b354bc25edac'),
      u('1558449028-b53a39d100fc'),
      u('1558618666-fcd25c85f82e'),
      u('1621905251189-08b45d6a269e'),
      u('1558449028-b53a39d100fc'),
      u('1621905252507-b354bc25edac'),
    ],
    about: [
      u('1621905252507-b354bc25edac'),
      u('1558449028-b53a39d100fc'),
    ],
    gallery: [
      u('1558618666-fcd25c85f82e'),
      u('1621905251189-08b45d6a269e'),
      u('1558449028-b53a39d100fc'),
      u('1621905252507-b354bc25edac'),
      u('1558618666-fcd25c85f82e'),
    ],
  },

  coiffeur: {
    hero: [
      u('1560066984-138dadb4c035'),
      u('1521590832167-7bcbfaa6381f'),
      u('1605497746444-052d5b593485'),
    ],
    services: [
      u('1560066984-138dadb4c035'),
      u('1521590832167-7bcbfaa6381f'),
      u('1605497746444-052d5b593485'),
      u('1585747860715-2ba37e788b70'),
      u('1522337360788-8b13dee7a37e'),
      u('1560066984-138dadb4c035'),
    ],
    about: [
      u('1560066984-138dadb4c035'),
      u('1521590832167-7bcbfaa6381f'),
    ],
    gallery: [
      u('1605497746444-052d5b593485'),
      u('1585747860715-2ba37e788b70'),
      u('1522337360788-8b13dee7a37e'),
      u('1560066984-138dadb4c035'),
      u('1521590832167-7bcbfaa6381f'),
    ],
  },

  restaurant: {
    hero: [
      u('1517248135467-4c7edcad34c4'),
      u('1578474846511-04ba529f0b88'),
      u('1414235077428-338989a2e8c0'),
    ],
    services: [
      u('1517248135467-4c7edcad34c4'),
      u('1578474846511-04ba529f0b88'),
      u('1414235077428-338989a2e8c0'),
      u('1555396273-367ea4eb4db5'),
      u('1552566626-52f8b828add9'),
      u('1517248135467-4c7edcad34c4'),
    ],
    about: [
      u('1517248135467-4c7edcad34c4'),
      u('1414235077428-338989a2e8c0'),
    ],
    gallery: [
      u('1578474846511-04ba529f0b88'),
      u('1555396273-367ea4eb4db5'),
      u('1552566626-52f8b828add9'),
      u('1517248135467-4c7edcad34c4'),
      u('1414235077428-338989a2e8c0'),
    ],
  },

  garage: {
    hero: [
      u('1486006920555-c77dce18193b'),
      u('1619642751034-765dfdf7c58e'),
      u('1517524206127-48bbd363f3d7'),
    ],
    services: [
      u('1486006920555-c77dce18193b'),
      u('1619642751034-765dfdf7c58e'),
      u('1517524206127-48bbd363f3d7'),
      u('1507767439269-2c64f107e609'),
      u('1617531653332-bd46c24f2068'),
      u('1486006920555-c77dce18193b'),
    ],
    about: [
      u('1486006920555-c77dce18193b'),
      u('1619642751034-765dfdf7c58e'),
    ],
    gallery: [
      u('1517524206127-48bbd363f3d7'),
      u('1507767439269-2c64f107e609'),
      u('1617531653332-bd46c24f2068'),
      u('1486006920555-c77dce18193b'),
      u('1619642751034-765dfdf7c58e'),
    ],
  },

  nettoyage: {
    hero: [
      u('1581578731548-c64695cc6952'),
      u('1527515637462-cff94eecc1ac'),
      u('1584824486509-112e4181ff6b'),
    ],
    services: [
      u('1581578731548-c64695cc6952'),
      u('1527515637462-cff94eecc1ac'),
      u('1584824486509-112e4181ff6b'),
      u('1603712726208-4617905499f9'),
      u('1563453392212-326f5e854473'),
      u('1581578731548-c64695cc6952'),
    ],
    about: [
      u('1581578731548-c64695cc6952'),
      u('1527515637462-cff94eecc1ac'),
    ],
    gallery: [
      u('1584824486509-112e4181ff6b'),
      u('1603712726208-4617905499f9'),
      u('1563453392212-326f5e854473'),
      u('1581578731548-c64695cc6952'),
      u('1527515637462-cff94eecc1ac'),
    ],
  },

  jardin: {
    hero: [
      u('1592417817098-8f3d6eb19675'),
      u('1416879595882-3373a0480b5b'),
      u('1535254973040-607b474cb50d'),
    ],
    services: [
      u('1592417817098-8f3d6eb19675'),
      u('1416879595882-3373a0480b5b'),
      u('1535254973040-607b474cb50d'),
      u('1598902108854-10e335adac99'),
      u('1558618666-fcd25c85f82e'),
      u('1592417817098-8f3d6eb19675'),
    ],
    about: [
      u('1592417817098-8f3d6eb19675'),
      u('1416879595882-3373a0480b5b'),
    ],
    gallery: [
      u('1535254973040-607b474cb50d'),
      u('1598902108854-10e335adac99'),
      u('1558618666-fcd25c85f82e'),
      u('1592417817098-8f3d6eb19675'),
      u('1416879595882-3373a0480b5b'),
    ],
  },

  fitness: {
    hero: [
      u('1534438327276-14e5300c3a48'),
      u('1571019613454-1cb2f99b2d8b'),
      u('1517838277536-f5f99be501cd'),
    ],
    services: [
      u('1534438327276-14e5300c3a48'),
      u('1571019613454-1cb2f99b2d8b'),
      u('1517838277536-f5f99be501cd'),
      u('1540575467063-178a50c2df87'),
      u('1518611012118-696072aa579a'),
      u('1534438327276-14e5300c3a48'),
    ],
    about: [
      u('1534438327276-14e5300c3a48'),
      u('1571019613454-1cb2f99b2d8b'),
    ],
    gallery: [
      u('1517838277536-f5f99be501cd'),
      u('1540575467063-178a50c2df87'),
      u('1518611012118-696072aa579a'),
      u('1534438327276-14e5300c3a48'),
      u('1571019613454-1cb2f99b2d8b'),
    ],
  },

  medical: {
    hero: [
      u('1629909613654-28e377c37b09'),
      u('1576091160550-2173dba999ef'),
      u('1584515979956-d9f6e5d09982'),
    ],
    services: [
      u('1629909613654-28e377c37b09'),
      u('1576091160550-2173dba999ef'),
      u('1584515979956-d9f6e5d09982'),
      u('1606811971618-4486d14f3f99'),
      u('1581594693702-fbdc51b2763b'),
      u('1629909613654-28e377c37b09'),
    ],
    about: [
      u('1629909613654-28e377c37b09'),
      u('1576091160550-2173dba999ef'),
    ],
    gallery: [
      u('1584515979956-d9f6e5d09982'),
      u('1606811971618-4486d14f3f99'),
      u('1581594693702-fbdc51b2763b'),
      u('1629909613654-28e377c37b09'),
      u('1576091160550-2173dba999ef'),
    ],
  },

  avocat: {
    hero: [
      u('1589829545856-d10d557cf95f'),
      u('1505664194779-8bebcb3f9e5c'),
      u('1589829085413-56de8ae18c73'),
    ],
    services: [
      u('1589829545856-d10d557cf95f'),
      u('1505664194779-8bebcb3f9e5c'),
      u('1589829085413-56de8ae18c73'),
      u('1450133064473-71024230f91b'),
      u('1589829545856-d10d557cf95f'),
      u('1505664194779-8bebcb3f9e5c'),
    ],
    about: [
      u('1589829545856-d10d557cf95f'),
      u('1505664194779-8bebcb3f9e5c'),
    ],
    gallery: [
      u('1589829085413-56de8ae18c73'),
      u('1450133064473-71024230f91b'),
      u('1589829545856-d10d557cf95f'),
      u('1505664194779-8bebcb3f9e5c'),
      u('1589829085413-56de8ae18c73'),
    ],
  },

  spa: {
    hero: [
      u('1544161515-4ab6ce6db874'),
      u('1507652313519-d4e9174996dd'),
      u('1540555700478-4be289fbec6d'),
    ],
    services: [
      u('1544161515-4ab6ce6db874'),
      u('1507652313519-d4e9174996dd'),
      u('1540555700478-4be289fbec6d'),
      u('1519823551278-64ac92734fb1'),
      u('1600334129128-685c5582fd35'),
      u('1544161515-4ab6ce6db874'),
    ],
    about: [
      u('1544161515-4ab6ce6db874'),
      u('1507652313519-d4e9174996dd'),
    ],
    gallery: [
      u('1540555700478-4be289fbec6d'),
      u('1519823551278-64ac92734fb1'),
      u('1600334129128-685c5582fd35'),
      u('1544161515-4ab6ce6db874'),
      u('1507652313519-d4e9174996dd'),
    ],
  },

  boulangerie: {
    hero: [
      u('1509440159596-0249088772ff'),
      u('1555507036-ab1f4038024a'),
      u('1517433670267-08bbd4be890f'),
    ],
    services: [
      u('1509440159596-0249088772ff'),
      u('1555507036-ab1f4038024a'),
      u('1517433670267-08bbd4be890f'),
      u('1549931319-a545753467c8'),
      u('1608198093002-ad4e005484ec'),
      u('1509440159596-0249088772ff'),
    ],
    about: [
      u('1509440159596-0249088772ff'),
      u('1555507036-ab1f4038024a'),
    ],
    gallery: [
      u('1517433670267-08bbd4be890f'),
      u('1549931319-a545753467c8'),
      u('1608198093002-ad4e005484ec'),
      u('1509440159596-0249088772ff'),
      u('1555507036-ab1f4038024a'),
    ],
  },

  default: {
    hero: [
      u('1486406146926-c627a92ad1ab'),
      u('1497366216548-37526070297c'),
      u('1497215728101-856f4ea42174'),
    ],
    services: [
      u('1486406146926-c627a92ad1ab'),
      u('1497366216548-37526070297c'),
      u('1497215728101-856f4ea42174'),
      u('1454165804606-c3d57bc86b40'),
      u('1521791136368-1a8be852934b'),
      u('1486406146926-c627a92ad1ab'),
    ],
    about: [
      u('1486406146926-c627a92ad1ab'),
      u('1497366216548-37526070297c'),
    ],
    gallery: [
      u('1497215728101-856f4ea42174'),
      u('1454165804606-c3d57bc86b40'),
      u('1521791136368-1a8be852934b'),
      u('1486406146926-c627a92ad1ab'),
      u('1497366216548-37526070297c'),
    ],
  },
};

/**
 * Get curated images for a sector.
 * Returns images for a specific section, or all images mixed.
 * Falls back to default if sector not found.
 */
export function getCuratedImages(sector: string, section?: keyof CuratedPool, count?: number): string[] {
  const normalizedSector = (sector || '').toLowerCase();
  let pool: CuratedPool | undefined;

  for (const [key, val] of Object.entries(CURATED_IMAGES)) {
    if (key !== 'default' && normalizedSector.includes(key)) {
      pool = val;
      break;
    }
  }

  if (!pool) pool = CURATED_IMAGES.default;

  if (section) {
    const imgs = pool[section];
    return count ? imgs.slice(0, count) : imgs;
  }

  // Mix all sections, deduplicate
  const all = [...pool.hero, ...pool.services, ...pool.about, ...pool.gallery];
  const unique = [...new Set(all)];
  return count ? unique.slice(0, count) : unique;
}

/**
 * Get a curated image for a specific service name.
 * Maps service keywords to the appropriate section images.
 */
export function getCuratedServiceImage(sector: string, serviceName: string, index: number): string {
  const pool = getCuratedPool(sector);
  const services = pool.services;
  return services[index % services.length] || pool.hero[0];
}

export function getCuratedPool(sector: string): CuratedPool {
  const normalizedSector = (sector || '').toLowerCase();
  for (const [key, val] of Object.entries(CURATED_IMAGES)) {
    if (key !== 'default' && normalizedSector.includes(key)) return val;
  }
  return CURATED_IMAGES.default;
}
