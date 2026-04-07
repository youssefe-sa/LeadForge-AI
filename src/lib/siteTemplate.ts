// ============================================================
// LeadForge AI — Professional Website Generator v4
// Bootstrap 5 + Bootstrap Icons + Animate.css + Google Fonts
// CURATED real Unsplash images (source.unsplash.com is DEAD)
// ============================================================
import { Lead, safeStr, proxyImg } from "./supabase-store";

interface SiteContent {
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
  services: Array<{ name: string; description: string; icon?: string }>;
  cta: string;
  testimonials: Array<{
    author: string;
    text: string;
    rating: number;
    date: string;
  }>;
  galleryTitle?: string;
  aboutTitle?: string;
  servicesTitle?: string;
  contactTitle?: string;
  whyChooseUs?: string[];
}

// ══════════════════════════════════════════════════════════════
// CURATED UNSPLASH IMAGES — These are PERMANENT CDN URLs
// source.unsplash.com is DEPRECATED. These always work.
// ══════════════════════════════════════════════════════════════
const CURATED: Record<string, string[]> = {
  restaurant: [
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1550966871-3ed3cdb51f3a?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=1200&fit=crop&q=80",
  ],
  coiffeur: [
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1521590832167-7228fcb8c1b5?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=1200&fit=crop&q=80",
  ],
  salon: [
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1596178060810-72f53ce9a65c?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1629397685944-7073580d3832?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1457972729786-0411a3b2b626?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=1200&fit=crop&q=80",
  ],
  spa: [
    "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1540555700478-4be289fbec6e?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1519824145371-296894a0daa9?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1552693673-1bf958298935?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1591343395082-e120087004b4?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1470259078422-826894b933aa?w=1200&fit=crop&q=80",
  ],
  médecin: [
    "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1551076805-e1869033e561?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=1200&fit=crop&q=80",
  ],
  dentiste: [
    "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1571772996211-2f02c9727629?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1445527815219-ecbfec67492e?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1600170311833-c2cf5280ce49?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1579684453423-f84349ef60b0?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&fit=crop&q=80",
  ],
  avocat: [
    "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1521791055366-0d553872125f?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1479142506502-19b3a3b7ff33?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1575505586569-646b2ca898fc?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&fit=crop&q=80",
  ],
  hôtel: [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1455587734955-081b22074882?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1618773928121-c32f218e9e4e?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1590490360182-c33d93a4a7d4?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1200&fit=crop&q=80",
  ],
  garage: [
    "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1606577924006-27d39b132ae2?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1541348263662-e068662d82af?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1596256884885-45a3e191e3d8?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=1200&fit=crop&q=80",
  ],
  boulangerie: [
    "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1555507036-ab1f4038024a?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1549931319-a545753467c8?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1586444248879-bc604bc77f32?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1483695028939-5bb13f8648b0?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1590137876181-2a5a7e340308?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1612240498936-65f5101365d2?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1568254183919-78a4f43a2877?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1600398190788-5f22deca3543?w=1200&fit=crop&q=80",
  ],
  immobilier: [
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=1200&fit=crop&q=80",
  ],
  commerce: [
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1528698827591-e19cef51d163?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1555529771-835f59fc5efa?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1481437156560-3205f6a55acc?w=1200&fit=crop&q=80",
  ],
  default: [
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&fit=crop&q=80",
  ],
};

function getCuratedImages(sector: string): string[] {
  const s = (sector || "").toLowerCase();
  for (const [k, v] of Object.entries(CURATED)) {
    if (k !== "default" && s.includes(k)) return v;
  }
  if (
    s.includes("beauté") ||
    s.includes("beauty") ||
    s.includes("esthéti") ||
    s.includes("ongle")
  )
    return CURATED.salon;
  if (
    s.includes("hotel") ||
    s.includes("riad") ||
    s.includes("resort") ||
    s.includes("gîte")
  )
    return CURATED.hôtel;
  if (
    s.includes("médec") ||
    s.includes("medec") ||
    s.includes("cliniq") ||
    s.includes("pharma")
  )
    return CURATED.médecin;
  if (s.includes("barb")) return CURATED.coiffeur;
  if (
    s.includes("café") ||
    s.includes("cafe") ||
    s.includes("traiteur") ||
    s.includes("pizza")
  )
    return CURATED.restaurant;
  return CURATED.default;
}

// ── SECTOR COLOR SCHEMES ──
interface Scheme {
  p: string;
  p2: string;
  pRgb: string;
  dark: string;
  light: string;
  grd: string;
  heroOverlay: string;
  accent: string;
}
const SCHEMES: Record<string, any> = {
  "charcoal-blue": { p: "#65839a", p2: "#849cae", pRgb: "101,131,154", dark: "#141a1f", light: "#f0f3f5", grd: "linear-gradient(135deg, #65839a, #849cae)", heroOverlay: "rgba(20,26,31,0.85)", accent: "#51697b" },
  "baltic-blue": { p: "#3e88c1", p2: "#65a0cd", pRgb: "62,136,193", dark: "#0c1b27", light: "#ecf3f9", grd: "linear-gradient(135deg, #3e88c1, #65a0cd)", heroOverlay: "rgba(12,27,39,0.85)", accent: "#326d9a" },
  "oxford-navy": { p: "#0d78f2", p2: "#3d93f5", pRgb: "13,120,242", dark: "#031830", light: "#e7f1fe", grd: "linear-gradient(135deg, #0d78f2, #3d93f5)", heroOverlay: "rgba(3,24,48,0.85)", accent: "#0a60c2" },
  "linen": { p: "#be8841", p2: "#cba067", pRgb: "190,136,65", dark: "#261b0d", light: "#f8f3ec", grd: "linear-gradient(135deg, #be8841, #cba067)", heroOverlay: "rgba(38,27,13,0.85)", accent: "#986d34" },
  "lavender": { p: "#2f2fd0", p2: "#5959d9", pRgb: "47,47,208", dark: "#09092a", light: "#eaeafa", grd: "linear-gradient(135deg, #2f2fd0, #5959d9)", heroOverlay: "rgba(9,9,42,0.85)", accent: "#2626a6" },
  "bright-ocean": { p: "#1d7fe2", p2: "#4a99e8", pRgb: "29,127,226", dark: "#06192d", light: "#e8f2fc", grd: "linear-gradient(135deg, #1d7fe2, #4a99e8)", heroOverlay: "rgba(6,25,45,0.85)", accent: "#1766b5" },
  "celadon": { p: "#30cf80", p2: "#5ad899", pRgb: "48,207,128", dark: "#0a291a", light: "#eafaf2", grd: "linear-gradient(135deg, #30cf80, #5ad899)", heroOverlay: "rgba(10,41,26,0.85)", accent: "#27a566" }
};

// 🎯 GÉNÉRATION DE PHRASES UNIQUES POUR TITRE HERO
const generateHeroAccent = (lead: Lead): string => {
  const seed = lead.name + (lead.city || '') + (lead.sector || '');
  const hash = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  const accentPhrases = [
    'Qualité Garantie', 'Expertise Locale', 'Service Premium', 'Excellence Confirmée',
    'Professionnalisme Absolu', 'Rapport Qualité/Prix', 'Innovation Continue', 'Satisfaction Client',
    'Réactivité Exceptionnelle', 'Fiabilité Totale', 'Modernité Avancée', 'Approche Personnalisée',
    'Résultats Garantis', 'Engagement Fort', 'Passion du Métier', 'Savoir-Faire Unique',
    'Excellence Opérationnelle', 'Maîtrise Technique', 'Service Client Premium', 'Innovation Constante'
  ];
  
  return accentPhrases[hash % accentPhrases.length];
};

// 🎯 LIMITATION DU NOM À 2 MOTS MAX (SANS ARTICLES)
const getLogoName = (fullName: string): string => {
  const skip = ['le', 'la', 'les', 'de', 'du', 'des', 'l\'', 'à', 'a'];
  const words = fullName.trim().split(/\s+/).filter(w => !skip.includes(w.toLowerCase()));
  return words.slice(0, 2).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
};

function generateUniquePalette(lead: Lead, offset: number = 0): Scheme {
  const seed = lead.name + (lead.city || '') + (lead.sector || '');
  const hash = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) + offset;
  
  const keys = Object.keys(SCHEMES);
  const schemeKey = keys[hash % keys.length];
  return SCHEMES[schemeKey];
}

// 🎯 GÉNÉRATION DE CONTENU UNIQUE PAR PROSPECT
const generateUniqueContent = (lead: Lead, content: any) => {
  const seed = lead.name + (lead.city || '') + (lead.sector || '');
  const hash = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  // Variations de titres de sections
  const aboutTitles = [
    'Notre Histoire', 'Notre Expertise', 'À Propos de Nous', 'Notre Engagement',
    'Notre Passion', 'Notre Savoir-Faire', 'Notre Mission', 'Notre Vision'
  ];
  
  const servicesTitles = [
    'Nos Services', 'Nos Prestations', 'Nos Solutions', 'Nos Compétences',
    'Notre offre', 'Nos Réalisations', 'Nos Expertises', 'Nos Spécialités'
  ];
  
  const galleryTitles = [
    'Nos Réalisations', 'Notre Portfolio', 'Nos Projets', 'Nos Créations',
    'Nos Prestations', 'Nos Références', 'Nos Accomplissements', 'Nos Success Stories'
  ];
  
  const contactTitles = [
    'Contactez-nous', 'Prendre Contact', 'Nous Contacter', 'Entrer en Contact',
    'Demande de Devis', 'Contact Rapide', 'Contact Direct', 'Contactez l\'Équipe'
  ];
  
  // Variations de descriptions
  const descriptions = [
    `${lead.name} est votre ${lead.sector || 'partenaire professionnel'} de confiance${lead.city ? ` à ${lead.city}` : ''}. Nous combinons expertise et savoir-faire pour vous offrir un service d'excellence.`,
    `Spécialiste ${lead.sector || 'professionnel'}${lead.city ? ` basé à ${lead.city}` : ''}, ${lead.name} s'engage à vous fournir des solutions sur mesure adaptées à vos besoins spécifiques.`,
    `Avec une expérience reconnue dans le domaine ${lead.sector || 'professionnel'}, ${lead.name} garantit des prestations de qualité${lead.city ? ` sur toute la région de ${lead.city}` : ''}.`,
    `Professionnel du secteur ${lead.sector || 'spécialisé'}, ${lead.name} met son expertise à votre disposition pour réaliser tous vos projets${lead.city ? ` à ${lead.city}` : ''}.`
  ];
  
  return {
    ...content,
    aboutTitle: aboutTitles[hash % aboutTitles.length],
    servicesTitle: servicesTitles[hash % servicesTitles.length],
    galleryTitle: galleryTitles[hash % galleryTitles.length],
    contactTitle: contactTitles[hash % contactTitles.length],
    aboutText: descriptions[hash % descriptions.length]
  };
};

function getScheme(sector: string): Scheme {
  const s = (sector || "").toLowerCase();
  for (const [k, v] of Object.entries(SCHEMES)) {
    if (s.includes(k)) return v;
  }
  return {
    p: "#D4500A",
    p2: "#F97316",
    pRgb: "212,80,10",
    dark: "#1c1917",
    light: "#FFF7ED",
    grd: "#D4500A",
    heroOverlay: "rgba(28,25,23,0.85)",
    accent: "#D4500A",
  };
}

function getBI(sector: string): string[] {
  const s = (sector || "").toLowerCase();
  if (s.includes("restaurant") || s.includes("boulanger") || s.includes("café"))
    return [
      "bi-cup-hot-fill",
      "bi-egg-fried",
      "bi-calendar-heart",
      "bi-star-fill",
      "bi-truck",
      "bi-gift",
    ];
  if (
    s.includes("coiff") ||
    s.includes("salon") ||
    s.includes("beauté") ||
    s.includes("barb")
  )
    return [
      "bi-scissors",
      "bi-palette-fill",
      "bi-stars",
      "bi-gem",
      "bi-flower1",
      "bi-heart-fill",
    ];
  if (s.includes("spa"))
    return [
      "bi-droplet-fill",
      "bi-flower2",
      "bi-heart-pulse-fill",
      "bi-sun-fill",
      "bi-peace-fill",
      "bi-wind",
    ];
  if (s.includes("médec") || s.includes("dentist") || s.includes("cliniq"))
    return [
      "bi-heart-pulse-fill",
      "bi-shield-plus",
      "bi-capsule",
      "bi-clipboard2-pulse-fill",
      "bi-bandaid-fill",
      "bi-hospital",
    ];
  if (s.includes("avocat") || s.includes("immobil"))
    return [
      "bi-briefcase-fill",
      "bi-building",
      "bi-file-earmark-text-fill",
      "bi-shield-check",
      "bi-graph-up-arrow",
      "bi-bank",
    ];
  if (s.includes("hôtel") || s.includes("hotel") || s.includes("riad"))
    return [
      "bi-house-heart-fill",
      "bi-key-fill",
      "bi-sunrise-fill",
      "bi-cup-straw",
      "bi-water",
      "bi-star-fill",
    ];
  if (s.includes("garage"))
    return [
      "bi-wrench-adjustable-circle-fill",
      "bi-car-front-fill",
      "bi-tools",
      "bi-gear-fill",
      "bi-speedometer2",
      "bi-shield-fill-check",
    ];
  return [
    "bi-star-fill",
    "bi-lightning-charge-fill",
    "bi-award-fill",
    "bi-patch-check-fill",
    "bi-hand-thumbs-up-fill",
    "bi-trophy-fill",
  ];
}

function px(url: string) {
  return proxyImg(url, 1200);
}
function stars(n: number) {
  return (
    "★".repeat(Math.min(5, Math.max(0, Math.round(n)))) +
    "☆".repeat(Math.max(0, 5 - Math.round(n)))
  );
}
function esc(s: string) {
  return s.replace(/'/g, "\\'").replace(/"/g, "&quot;").replace(/\n/g, " ");
}

function getImgs(lead: Lead): string[] {
  const raw = [
    ...new Set(
      [...(lead.images || []), ...(lead.websiteImages || [])].filter(
        (u) => typeof u === "string" && u.startsWith("http"),
      ),
    ),
  ];
  const imgs = raw.map((u) => px(u));
  // Fill remaining with CURATED images (not dead source.unsplash.com)
  const curated = getCuratedImages(lead.sector);
  let ci = 0;
  while (imgs.length < 12 && ci < curated.length) {
    imgs.push(curated[ci]);
    ci++;
  }
  return imgs;
}

function getLogo(lead: Lead, scheme: Scheme): string {
  const n = safeStr(lead.name);
  const words = n.split(/\s+/).filter(Boolean);
  const initials =
    words.length >= 2
      ? (words[0][0] + words[1][0]).toUpperCase()
      : n.substring(0, 2).toUpperCase();
  const brandText = words.slice(0, 2).join(" ");

  if (lead.logo) {
    return `<a class="navbar-brand d-flex align-items-center gap-3" href="#home">
      <img src="${px(lead.logo)}" alt="${esc(n)}" style="height:45px;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,0.1)" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
      <div style="display:none;width:45px;height:45px;border-radius:12px;background:${scheme.grd};color:#fff;font-weight:800;font-size:18px;align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(var(--prgb),.3)">${initials}</div>
      <span class="fw-bold fs-4" style="color:#fff;margin-left:8px">${esc(brandText)}</span>
    </a>`;
  }
  return `<a class="navbar-brand d-flex align-items-center gap-3" href="#home">
    <div style="display:flex;width:45px;height:45px;border-radius:12px;background:${scheme.grd};color:#fff;font-weight:800;font-size:18px;align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(var(--prgb),.3);letter-spacing:-0.5px">${initials}</div>
    <span class="fw-bold fs-4" style="color:#fff;margin-left:8px">${esc(brandText)}</span>
  </a>`;
}

// ════════════════════════════════════════════════════════════
// MAIN TEMPLATE GENERATOR — Bootstrap 5 Professional
// ════════════════════════════════════════════════════════════

export function generatePremiumSiteHtml(lead: Lead, content: SiteContent, colorSeedOffset: number = 0): string {
  const scheme = generateUniquePalette(lead, colorSeedOffset); // 🎨 PALETTE UNIQUE PAR PROSPECT
  const imgs = getImgs(lead);
  const n = safeStr(lead.name);
  const sector = safeStr(lead.sector) || 'Professionnel';
  const city = safeStr(lead.city);
  const ph = safeStr(lead.phone);
  const em = safeStr(lead.email);
  const addr = safeStr(lead.address);
  const wa = ph.replace(/[^0-9+]/g, '');
  
  // 🎯 CONTENU UNIQUE PAR PROSPECT
  const uniqueContent = generateUniqueContent(lead, content);
  
  // 🎯 STYLES UNIQUES PAR PROSPECT
  const seed = lead.name + (lead.city || '') + (lead.sector || '');
  const hash = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  // Typographies uniques
  const fontFamilies = [
    "'Inter', sans-serif",
    "'Roboto', sans-serif", 
    "'Poppins', sans-serif",
    "'Montserrat', sans-serif",
    "'Nunito', sans-serif",
    "'Raleway', sans-serif"
  ];
  const headingFonts = [
    "'Playfair Display', serif",
    "'Montserrat', serif",
    "'Roboto Slab', serif",
    "'Merriweather', serif",
    "'Lora', serif"
  ];
  
  const bodyFont = fontFamilies[hash % fontFamilies.length];
  const headingFont = headingFonts[(hash + 1) % headingFonts.length];
  
  // Tailles de texte uniques
  const baseSize = 16 + (hash % 4); // 16-19px
  const h1Size = 2.5 + ((hash % 5) * 0.3); // 2.5-3.8rem
  const h2Size = 2.0 + ((hash % 4) * 0.2); // 2.0-2.6rem
  
  // Espacements uniques
  const baseSpacing = 8 + (hash % 8); // 8-16px
  
  // Styles de boutons uniques
  const buttonStyles = [
    { radius: '8px', shadow: '0 4px 15px rgba(0,0,0,0.2)' },
    { radius: '12px', shadow: '0 6px 20px rgba(0,0,0,0.15)' },
    { radius: '25px', shadow: '0 8px 25px rgba(0,0,0,0.25)' },
    { radius: '4px', shadow: '0 2px 10px rgba(0,0,0,0.3)' },
    { radius: '50px', shadow: '0 10px 30px rgba(0,0,0,0.2)' }
  ];
  const buttonStyle = buttonStyles[hash % buttonStyles.length];
  
  // Génération du logo SVG professionnel
  const initials = n.split(' ').map(word => word[0]).join('').substring(0, 2).toUpperCase();
  const svgLogo = `<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${scheme.p};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${scheme.p2};stop-opacity:1" />
        </linearGradient>
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
          <feOffset dx="0" dy="2" result="offsetblur"/>
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.2"/>
          </feComponentTransfer>
          <feMerge>
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <rect width="60" height="60" rx="12" fill="url(#logoGradient)" filter="url(#shadow)"/>
      <text x="30" y="38" font-family="Arial, sans-serif" font-size="24" font-weight="bold" text-anchor="middle" fill="white">${initials}</text>
    </svg>`;
  
  // 🎯 NOM LIMITÉ À 2 MOTS + PHRASE UNIQUE
  const logoName = getLogoName(n);
  const heroAccent = generateHeroAccent(lead);
  
  return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${n} - ${sector}${city ? ' à ' + city : ''}</title>
    <meta name="description" content="${safeStr(content.heroSubtitle).substring(0, 160)}">
    
    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Bootstrap Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css">
    <!-- AOS Animation Library -->
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    
    <style>
        :root {
            --primary: ${scheme.p};
            --primary-rgb: ${scheme.pRgb};
            --secondary: ${scheme.p2};
            --dark: ${scheme.dark};
            --light: ${scheme.light};
            --accent: ${scheme.accent};
        }
        
        * { 
            margin: 0; 
            padding: 0; 
            box-sizing: border-box; 
        }
        
        /* Font cohérentes - INTER PARTOUT */
        body {
            font-family: 'Inter', sans-serif !important;
            font-size: ${baseSize}px;
            line-height: 1.6;
            color: var(--dark);
            overflow-x: hidden;
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        }
        
        h1, h2, h3, h4, h5, h6 {
            font-family: 'Inter', sans-serif !important;
            font-weight: 800;
            line-height: 1.2;
        }
        
        h1 {
            font-size: ${h1Size}rem;
            font-weight: 800;
            margin-bottom: ${baseSpacing * 3}px;
        }
        
        h2 {
            font-size: ${h2Size}rem;
            font-weight: 700;
            margin-bottom: ${baseSpacing * 2.5}px;
        }
        
        /* Section titles - MÊME STYLE QUE HERO */
        .section-title {
            font-family: ${headingFont};
            font-size: ${h2Size}rem;
            font-weight: 700;
            line-height: 1.2;
            margin-bottom: ${baseSpacing * 2.5}px;
        }
        
        p {
            font-size: ${baseSize}px;
            margin-bottom: ${baseSpacing * 1.5}px;
        }
        
        /* Boutons uniques - COULEURS COHÉRENTES */
        .btn-premium-primary {
            background: var(--primary);
            color: white;
            border: none;
            padding: ${baseSpacing * 1.5}px ${baseSpacing * 3}px;
            border-radius: ${buttonStyle.radius};
            font-weight: 600;
            font-size: ${baseSize + 2}px;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: ${buttonStyle.shadow};
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: ${baseSpacing}px;
        }
        
        .btn-premium-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(var(--primary-rgb), 0.4);
            background: var(--secondary);
        }
        
        /* Chat bot et autres éléments - MÊMES COULEURS QUE BOUTONS */
        .chat-bubble {
            background: var(--primary);
            color: white;
        }
        
        .chat-bubble:hover {
            background: var(--secondary);
        }
        
        .brand-slogan {
            color: var(--primary);
            font-weight: 600;
        }
        
        .footer-brand-slogan {
            color: var(--primary);
            font-weight: 600;
        }
        
        /* Chat bot externe - FORCER COULEURS DU SITE */
        .chat-widget {
            background: var(--primary) !important;
            color: white !important;
        }
        
        .chat-widget:hover {
            background: var(--secondary) !important;
        }
        
        .chat-message {
            background: var(--primary) !important;
            color: white !important;
        }
        
        .chat-input {
            border-color: var(--primary) !important;
        }
        
        .chat-send {
            background: var(--primary) !important;
            color: white !important;
        }
        
        .chat-send:hover {
            background: var(--secondary) !important;
        }
        
        /* CORRECTIFS GLOBAUX PREMIUM */
        .testimonial-card {
            margin-bottom: 30px !important;
        }
        
        .process-card h5 {
            font-family: 'Inter', sans-serif !important;
            font-weight: 800 !important;
        }
        
        .section-title {
            font-family: 'Inter', sans-serif !important;
            font-weight: 800 !important;
            color: var(--dark);
        }
        
        /* Chatbot Global Force */
        .chatbot-toggle, .chatbot-input-area button {
            border-radius: 50% !important;
        }
        
        /* Espacements uniques */
        .section {
            padding: ${baseSpacing * 10}px 0;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 ${baseSpacing * 2}px;
        }
        
        .mb-4 { margin-bottom: ${baseSpacing * 2}px !important; }
        .mb-5 { margin-bottom: ${baseSpacing * 3}px !important; }
        .mt-4 { margin-top: ${baseSpacing * 2}px !important; }
        .mt-5 { margin-top: ${baseSpacing * 3}px !important; }
        .py-4 { padding-top: ${baseSpacing * 2}px !important; padding-bottom: ${baseSpacing * 2}px !important; }
        .py-5 { padding-top: ${baseSpacing * 3}px !important; padding-bottom: ${baseSpacing * 3}px !important; }
        
        /* Animations personnalisées */
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.05); opacity: 0.8; }
        }
        
        @keyframes slideInLeft {
            from { transform: translateX(-100px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideInRight {
            from { transform: translateX(100px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes gradientShift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
        }
        
        .gradient-bg {
            background: linear-gradient(-45deg, ${scheme.p}, ${scheme.p2}, ${scheme.accent});
            background-size: 400% 400%;
            animation: gradientShift 8s ease infinite;
        }
        
        /* Barre de notification professionnelle */
        .notification-bar {
            background: var(--dark);
            color: white;
            padding: 8px 0;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1050;
            overflow: hidden;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            animation: scroll 30s linear infinite;
            white-space: nowrap;
        }
        
        .notification-content:hover {
            animation-play-state: paused;
        }
        
        .notification-item {
            display: inline-flex;
            align-items: center;
            margin-right: 50px;
            font-size: 0.85rem;
        }
        
        .notification-item i {
            margin-right: 8px;
            color: var(--accent);
        }
        
        @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }
        
        /* Navigation améliorée */
        .navbar {
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(20px);
            box-shadow: 0 4px 20px rgba(0,0,0,0.08);
            transition: all 0.3s ease;
            padding: 8px 0;
            border-bottom: 1px solid rgba(255,255,255,0.1);
            margin-top: 35px;
        }
        
        .navbar-brand {
            display: flex;
            align-items: center;
            gap: 10px;
            font-weight: 700;
            font-size: 1.2rem;
            color: var(--primary) !important;
            font-family: 'Montserrat', sans-serif;
        }
        
        .brand-text {
            display: flex;
            flex-direction: column;
            line-height: 1.1;
        }
        
        .brand-name {
            font-size: 1.1rem;
            font-weight: 700;
            color: var(--primary);
        }
        
        .brand-slogan {
            font-size: 0.65rem;
            color: var(--accent);
            font-weight: 500;
            font-style: italic;
            margin-top: 2px;
            opacity: 0.9;
        }
        
        .navbar-nav .nav-link {
            font-weight: 500;
            font-size: 0.85rem;
            padding: 6px 12px !important;
            border-radius: 6px;
            transition: all 0.3s ease;
            margin: 0 1px;
            color: var(--dark) !important;
        }
        
        .navbar-nav .nav-link:hover {
            background: rgba(var(--primary-rgb), 0.08);
            color: var(--primary) !important;
            transform: translateY(-1px);
        }
        
        .navbar-nav .nav-link.active {
            background: var(--primary);
            color: white !important;
        }
        
        .navbar .btn {
            padding: 6px 14px !important;
            font-size: 0.8rem !important;
            font-weight: 600 !important;
            border-radius: 15px !important;
            transition: all 0.3s ease;
            margin: 0 2px;
        }
        
        .navbar .btn:hover {
            transform: translateY(-1px);
            box-shadow: 0 3px 10px rgba(0,0,0,0.15);
        }
        
        .nav-link:hover::after,
        .nav-link.active::after {
            width: 100%;
        }
        
        .nav-link:hover {
            color: var(--primary) !important;
            transform: translateY(-2px);
        }
        
        /* Hero Section Premium - Design Moderne */
        .hero-premium {
            min-height: 100vh;
            background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 50%, #ffffff 100%);
            position: relative;
            overflow: hidden;
            padding-top: 120px;
            display: flex;
            align-items: center;
        }
        
        .hero-premium::before {
            content: '';
            position: absolute;
            top: -50%;
            right: -10%;
            width: 60%;
            height: 200%;
            background: linear-gradient(45deg, rgba(var(--primary-rgb), 0.05) 0%, rgba(var(--accent-rgb), 0.08) 100%);
            transform: rotate(45deg);
            pointer-events: none;
        }
        
        .hero-content-premium {
            position: relative;
            z-index: 2;
        }
        
        .hero-badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: var(--primary);
            color: white;
            padding: 8px 16px;
            border-radius: 25px;
            font-size: 0.85rem;
            font-weight: 600;
            margin-bottom: 25px;
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
        
        .hero-title-premium {
            font-size: 3.5rem;
            font-weight: 800;
            line-height: 1.1;
            color: #2c3e50;
            margin-bottom: 20px;
            font-family: 'Inter', sans-serif;
        }
        
        .hero-title-accent {
            background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            font-weight: 900;
        }
        
        .hero-description-premium {
            font-size: 1.2rem;
            color: #6c757d;
            line-height: 1.7;
            margin-bottom: 35px;
            font-weight: 400;
            max-width: 500px;
        }
        
        .hero-actions {
            display: flex;
            gap: 15px;
            margin-bottom: 40px;
            flex-wrap: wrap;
        }
        
        .btn-premium-primary {
            display: flex;
            align-items: center;
            gap: 10px;
            background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
            color: white;
            padding: 12px 20px;
            border-radius: 12px;
            text-decoration: none;
            font-weight: 700;
            font-size: 1.1rem;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 8px 25px rgba(var(--primary-rgb), 0.4);
            width: 80%;
            justify-content: center;
            border: 2px solid rgba(255,255,255,0.1);
        }
        
        .btn-premium-primary:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 35px rgba(var(--primary-rgb), 0.4);
        }
        
        .btn-premium-secondary {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            background: white;
            color: var(--primary);
            padding: 16px 32px;
            border-radius: 12px;
            text-decoration: none;
            font-weight: 600;
            font-size: 1rem;
            border: 2px solid var(--primary);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .btn-premium-secondary:hover {
            background: var(--primary);
            color: white;
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(var(--primary-rgb), 0.3);
        }
        
        .hero-stats {
            display: flex;
            gap: 30px;
            flex-wrap: wrap;
        }
        
        .stat-item {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
        }
        
        .stat-number {
            font-size: 2rem;
            font-weight: 800;
            color: var(--primary);
            line-height: 1;
            margin-bottom: 5px;
        }
        
        .stat-label {
            font-size: 0.9rem;
            color: #6c757d;
            font-weight: 500;
        }
        
        .rating-container {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .rating-stars {
            display: flex;
            gap: 2px;
        }
        
        .rating-stars i {
            color: #ffc107;
            font-size: 0.9rem;
        }
        
        .rating-text {
            display: flex;
            align-items: baseline;
            gap: 5px;
        }
        
        .rating-score {
            font-size: 1.2rem;
            font-weight: 700;
            color: var(--primary);
        }
        
        .rating-max {
            font-size: 0.8rem;
            color: #6c757d;
            font-weight: 400;
        }
        
        .rating-reviews {
            font-size: 0.75rem;
            color: #6c757d;
            font-weight: 400;
            font-style: italic;
        }
        
        .hero-visual-premium {
            position: relative;
            height: 600px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .hero-image-wrapper {
            position: relative;
            width: 100%;
            max-width: 500px;
            height: 500px;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 25px 80px rgba(0,0,0,0.15);
            transform: perspective(1000px) rotateY(-5deg);
            transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .hero-image-wrapper:hover {
            transform: perspective(1000px) rotateY(0deg) scale(1.02);
            box-shadow: 0 35px 100px rgba(0,0,0,0.2);
        }
        
        .hero-image-premium {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.6s ease;
        }
        
        .hero-image-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, rgba(var(--primary-rgb), 0.1) 0%, rgba(var(--accent-rgb), 0.05) 100%);
            pointer-events: none;
        }
        
        .hero-decorations {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            pointer-events: none;
        }
        
        .decoration-circle {
            position: absolute;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
            opacity: 0.1;
        }
        
        .decoration-1 {
            width: 120px;
            height: 120px;
            top: 10%;
            left: -60px;
            animation: float 6s ease-in-out infinite;
        }
        
        .decoration-2 {
            width: 80px;
            height: 80px;
            bottom: 20%;
            right: -40px;
            animation: float 8s ease-in-out infinite reverse;
        }
        
        .decoration-line {
            position: absolute;
            width: 200px;
            height: 3px;
            background: linear-gradient(90deg, transparent 0%, var(--accent) 50%, transparent 100%);
            top: 50%;
            right: -100px;
            transform: rotate(45deg);
            opacity: 0.3;
            animation: slideLine 4s ease-in-out infinite;
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes slideLine {
            0%, 100% { transform: translateX(0) rotate(45deg); }
            50% { transform: translateX(30px) rotate(45deg); }
        }
        
        @media (max-width: 768px) {
            .hero-title-premium {
                font-size: 2.5rem;
            }
            
            .hero-description-premium {
                font-size: 1.1rem;
            }
            
            .hero-actions {
                flex-direction: column;
                align-items: flex-start;
            }
            
            .hero-stats {
                gap: 20px;
            }
            
            .hero-visual-premium {
                height: 400px;
                margin-top: 50px;
            }
            
            .hero-image-wrapper {
                max-width: 350px;
                height: 350px;
            }
        }
        
        .btn-primary {
            background: ${scheme.grd};
            border: none;
            padding: 18px 45px;
            border-radius: 50px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 15px 40px rgba(var(--primary-rgb), 0.3);
            position: relative;
            overflow: hidden;
            font-family: 'Montserrat', sans-serif;
        }
        
        .btn-primary::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            transition: left 0.5s;
        }
        
        .btn-primary:hover::before {
            left: 100%;
        }
        
        .btn-primary:hover {
            transform: translateY(-5px) scale(1.02);
            box-shadow: 0 20px 50px rgba(var(--primary-rgb), 0.4);
        }
        
        .btn-outline-primary {
            border: 3px solid var(--primary);
            color: var(--primary);
            padding: 18px 45px;
            border-radius: 50px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            background: transparent;
            font-family: 'Montserrat', sans-serif;
        }
        
        .btn-outline-primary:hover {
            background: var(--primary);
            border-color: var(--primary);
            transform: translateY(-5px) scale(1.02);
            box-shadow: 0 20px 50px rgba(var(--primary-rgb), 0.4);
        }
        
        /* Sections améliorées */
        .section {
            padding: 120px 0;
            position: relative;
        }
        
        .section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 1px;
            background: linear-gradient(90deg, transparent, var(--primary), transparent);
            opacity: 0.3;
        }
        
        .section-title {
            font-size: 3.5rem;
            font-weight: 900;
            text-align: center;
            margin-bottom: 80px;
            position: relative;
            font-family: 'Playfair Display', serif;
        }
        
        .section-title::after {
            content: '';
            position: absolute;
            bottom: -30px;
            left: 50%;
            transform: translateX(-50%);
            width: 100px;
            height: 4px;
            background: ${scheme.grd};
            border-radius: 2px;
        }
        
        /* Service Cards premium */
        .service-card {
            background: white;
            padding: 50px 40px;
            border-radius: 25px;
            box-shadow: 0 15px 50px rgba(0,0,0,0.08);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            height: 100%;
            border: 1px solid rgba(0,0,0,0.03);
            position: relative;
            overflow: hidden;
        }
        
        .service-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: ${scheme.grd};
            transform: scaleX(0);
            transition: transform 0.4s ease;
        }
        
        .service-card:hover::before {
            transform: scaleX(1);
        }
        
        .service-card:hover {
            transform: translateY(-15px) scale(1.02);
            box-shadow: 0 25px 70px rgba(0,0,0,0.15);
        }
        
        .service-icon {
            width: 90px;
            height: 90px;
            background: ${scheme.grd};
            border-radius: 25px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 30px;
            font-size: 2.5rem;
            color: white;
            box-shadow: 0 10px 30px rgba(var(--primary-rgb), 0.2);
        }
        
        /* Gallery ultra-HD avec overlay */
        .gallery-item {
            position: relative;
            overflow: hidden;
            border-radius: 20px;
            box-shadow: 0 15px 40px rgba(0,0,0,0.1);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: pointer;
        }
        
        .gallery-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(45deg, rgba(var(--primary-rgb), 0.9) 0%, rgba(var(--primary-rgb), 0.7) 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.4s ease;
        }
        
        .gallery-content {
            color: white;
            text-align: center;
            padding: 20px;
        }
        
        .gallery-item:hover::before {
            opacity: 1;
        }
        
        .gallery-item:hover .gallery-overlay {
            opacity: 1;
        }
        
        .gallery-item:hover {
            transform: scale(1.05) translateY(-10px);
            box-shadow: 0 25px 60px rgba(0,0,0,0.2);
        }
        
        .gallery-item img {
            width: 100%;
            height: 350px;
            object-fit: cover;
            transition: transform 0.4s ease;
            display: block;
        }
        
        .gallery-item:hover img {
            transform: scale(1.1);
        }
        
        .gallery-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(45deg, rgba(var(--primary-rgb), 0.95) 0%, rgba(var(--primary-rgb), 0.85) 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.4s ease;
            padding: 20px;
        }
        
        .gallery-content {
            color: white;
            text-align: center;
            transform: translateY(20px);
            transition: transform 0.4s ease;
        }
        
        .gallery-item:hover .gallery-overlay {
            opacity: 1;
        }
        
        .gallery-item:hover .gallery-content {
            transform: translateY(0);
        }
        
        .gallery-content h5 {
            font-size: 1.3rem;
            font-weight: 700;
            margin-bottom: 15px;
            color: white;
        }
        
        .gallery-content p {
            font-size: 0.95rem;
            line-height: 1.5;
            margin: 0;
            color: rgba(255,255,255,0.95);
        }
        
        .gallery-item:hover::before {
            opacity: 1;
        }
        
        /* Testimonials premium améliorés */
        .testimonials-header {
            margin-bottom: 60px;
        }
        
        .google-badge {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            padding: 10px 20px;
            background: white;
            border-radius: 50px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.1);
        }
        
        .badge-stars {
            color: #ffc107;
            font-size: 1.1rem;
        }
        
        .badge-text {
            font-weight: 600;
            color: var(--dark);
        }
        
        .testimonial-card {
            background: white;
            padding: 50px;
            border-radius: 25px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
            position: relative;
            height: 100%;
            min-height: 400px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            border: 1px solid rgba(0,0,0,0.03);
            margin-bottom: 30px; /* Espace entre les lignes */
        }
        
        .testimonial-text p {
            font-size: ${baseSize}px;
            line-height: 1.6;
            margin-bottom: 15px;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            position: relative;
        }
        
        .testimonial-text p.expanded {
            -webkit-line-clamp: unset;
            display: block;
        }
        
        .testimonial-text p::after {
            content: '';
            position: absolute;
            bottom: 0;
            right: 0;
            width: 30px;
            height: ${baseSize}px;
            background: linear-gradient(to right, transparent, white 70%);
            pointer-events: none;
        }
        
        .testimonial-text p.expanded::after {
            display: none;
        }
        
        .read-more {
            color: var(--primary);
            text-decoration: none;
            font-weight: 600;
            font-size: ${baseSize - 2}px;
            margin-top: 8px;
            display: inline-block;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .read-more:hover {
            color: var(--secondary);
            text-decoration: underline;
        }
        
        .testimonial-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }
        
        .google-verified {
            display: flex;
            align-items: center;
            gap: 5px;
        }
        
        .testimonial-card::before {
            content: '"';
            position: absolute;
            top: 20px;
            left: 30px;
            font-size: 4rem;
            color: var(--primary);
            opacity: 0.08;
            font-family: 'Playfair Display', serif;
            line-height: 1;
        }
        
        .stars {
            color: #ffc107;
            font-size: 1.3rem;
            margin-bottom: 20px;
            text-shadow: 0 2px 4px rgba(255,193,7,0.2);
        }
        
        /* Section Process */
        .process-card {
            background: white;
            padding: 40px 30px;
            border-radius: 20px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.08);
            text-align: center;
            position: relative;
            transition: all 0.4s ease;
            height: 100%;
        }
        
        .process-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 60px rgba(0,0,0,0.15);
        }
        
        .process-number {
            position: absolute;
            top: -15px;
            left: 50%;
            transform: translateX(-50%);
            width: 40px;
            height: 40px;
            background: var(--primary);
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 1.2rem;
        }
        
        .process-icon {
            width: 80px;
            height: 80px;
            background: ${scheme.grd};
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 20px auto;
            font-size: 2rem;
            color: white;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
        }
        
        .process-card:hover .process-icon {
            transform: translateY(-5px);
            box-shadow: 0 15px 40px rgba(0,0,0,0.15);
        }
        
        .process-card h5 {
            font-family: 'Inter', sans-serif !important;
            line-height: 1;
            font-weight: 800;
        }
        
        .stars {
            color: #ffc107;
            font-size: 1.3rem;
            margin-bottom: 20px;
            text-shadow: 0 2px 4px rgba(255,193,7,0.2);
        }
        
        /* Statistics Section */
        .stat-card {
            text-align: center;
            padding: 40px 20px;
            background: white;
            border-radius: 20px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.08);
            transition: all 0.4s ease;
            height: 100%;
        }
        
        .stat-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 60px rgba(0,0,0,0.15);
        }
        
        .stat-icon {
            width: 80px;
            height: 80px;
            background: ${scheme.grd};
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px;
            font-size: 2rem;
            color: white;
        }
        
        .stat-number {
            font-size: 3rem;
            font-weight: 900;
            color: var(--primary);
            margin-bottom: 10px;
            background: ${scheme.grd};
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .stat-label {
            font-size: 1.1rem;
            font-weight: 600;
            color: var(--dark);
        }
        
        /* Expertise Section */
        .expertise-list {
            margin-top: 30px;
        }
        
        .expertise-item {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
            padding: 15px;
            background: rgba(var(--primary-rgb), 0.05);
            border-radius: 12px;
            transition: all 0.3s ease;
        }
        
        .expertise-item:hover {
            background: rgba(var(--primary-rgb), 0.1);
            transform: translateX(10px);
        }
        
        .value-card {
            background: white;
            padding: 40px 30px;
            border-radius: 20px;
            text-align: center;
            box-shadow: 0 10px 40px rgba(0,0,0,0.08);
            transition: all 0.4s ease;
            height: 100%;
        }
        
        .value-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 60px rgba(0,0,0,0.15);
        }
        
        .value-icon {
            width: 70px;
            height: 70px;
            background: ${scheme.grd};
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px;
            font-size: 1.8rem;
            color: white;
        }
        
        .value-card h5 {
            font-weight: 700;
            margin-bottom: 15px;
            color: var(--dark);
        }
        
        .value-card p {
            color: var(--dark);
            opacity: 0.8;
            line-height: 1.6;
        }
        
        /* Gallery Section Professionnelle */
        .gallery-professional {
            margin-top: 50px;
        }
        
        .gallery-row {
            display: flex;
            gap: 20px;
            margin-bottom: 20px;
            justify-content: center;
        }
        
        .gallery-item-pro {
            flex: 1;
            max-width: 280px;
            position: relative;
            overflow: hidden;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .gallery-item-pro:hover {
            transform: translateY(-10px) scale(1.02);
            box-shadow: 0 20px 50px rgba(0,0,0,0.2);
        }
        
        .gallery-image-wrapper {
            position: relative;
            width: 100%;
            height: 200px;
            overflow: hidden;
            border-radius: 15px;
        }
        
        .gallery-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .gallery-item-pro:hover .gallery-image {
            transform: scale(1.1);
            filter: brightness(0.8);
        }
        
        .gallery-overlay-pro {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, rgba(var(--primary-rgb), 0.8) 0%, rgba(var(--accent-rgb), 0.9) 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .gallery-item-pro:hover .gallery-overlay-pro {
            opacity: 1;
        }
        
        .gallery-number {
            position: absolute;
            top: 15px;
            left: 15px;
            background: rgba(255,255,255,0.9);
            color: var(--primary);
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 0.9rem;
            z-index: 2;
        }
        
        .gallery-icon {
            background: white;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--primary);
            font-size: 1.2rem;
            transform: translateY(30px);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .gallery-item-pro:hover .gallery-icon {
            transform: translateY(0);
        }
        
        /* Technology Section */
        .tech-features {
            margin-top: 30px;
        }
        
        .tech-feature {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
            padding: 20px;
            background: white;
            border-radius: 15px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.05);
            transition: all 0.3s ease;
        }
        
        .tech-feature:hover {
            transform: translateX(10px);
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        
        .tech-icon {
            width: 50px;
            height: 50px;
            background: rgba(var(--primary-rgb), 0.1);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 20px;
            color: var(--primary);
            font-size: 1.3rem;
        }
        
        .tech-content h6 {
            font-weight: 600;
            margin-bottom: 5px;
            color: var(--dark);
        }
        
        /* Engagements Section */
        .engagement-card {
            background: white;
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
            height: 100%;
            text-align: center;
        }
        
        .engagement-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 40px rgba(0,0,0,0.15);
        }
        
        .engagement-icon {
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px;
        }
        
        .engagement-icon i {
            color: white;
            font-size: 1.5rem;
        }
        
        .engagement-card h4 {
            color: var(--primary);
            margin-bottom: 15px;
            font-weight: 700;
        }
        
        .engagement-card p {
            color: #6c757d;
            line-height: 1.6;
            margin: 0;
        }
        
        /* Team Section (remplacée par Engagements) */
        .team-card {
            text-align: center;
            padding: 40px 25px;
            background: white;
            border-radius: 20px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.08);
            transition: all 0.4s ease;
            height: 100%;
        }
        
        .team-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 60px rgba(0,0,0,0.15);
        }
        
        .team-avatar {
            width: 100px;
            height: 100px;
            background: ${scheme.grd};
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px;
            font-size: 3rem;
            color: white;
        }
        
        .team-card h5 {
            font-weight: 700;
            margin-bottom: 5px;
            color: var(--dark);
        }
        
        /* Certifications Section */
        .certifications-grid-inline {
            display: flex;
            gap: 30px;
            justify-content: center;
            flex-wrap: wrap;
        }
        
        .certification-item-inline {
            background: white;
            padding: 25px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
            text-align: center;
            flex: 1;
            min-width: 200px;
            max-width: 250px;
        }
        
        .certification-item-inline:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 40px rgba(0,0,0,0.15);
        }
        
        .certification-item-inline .cert-icon {
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 15px;
        }
        
        .certification-item-inline .cert-icon i {
            color: white;
            font-size: 1.5rem;
        }
        
        .certification-item-inline p {
            color: var(--primary);
            font-weight: 600;
            margin: 0;
        }
        
        /* Certifications Section (original) */
        .certifications-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-top: 30px;
        }
        
        .certification-item {
            text-align: center;
            padding: 30px 20px;
            background: white;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.08);
            transition: all 0.4s ease;
        }
        
        .certification-item:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 40px rgba(0,0,0,0.15);
        }
        
        .cert-icon {
            width: 60px;
            height: 60px;
            background: ${scheme.grd};
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 15px;
            font-size: 1.5rem;
            color: white;
        }
        
        .contact-form {
            background: white;
            padding: 60px;
            border-radius: 30px;
            box-shadow: 0 25px 70px rgba(0,0,0,0.1);
            border: 1px solid rgba(0,0,0,0.03);
        }
        
        /* Contact Section Professionnelle */
        .map-section {
            margin-bottom: 60px;
        }
        
        .map-wrapper {
            position: relative;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(0,0,0,0.15);
            background: white;
        }
        
        .map-iframe {
            border: none;
            border-radius: 20px;
        }
        
        .map-overlay {
            position: absolute;
            top: 20px;
            right: 20px;
            background: white;
            padding: 20px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            z-index: 10;
            min-width: 200px;
        }
        
        .map-info {
            text-align: center;
        }
        
        .map-info i {
            color: var(--primary);
            font-size: 2rem;
            margin-bottom: 10px;
            display: block;
        }
        
        .map-info h5 {
            color: var(--dark);
            font-weight: 700;
            margin-bottom: 5px;
        }
        
        .map-info p {
            color: #6c757d;
            margin: 0;
            font-size: 0.9rem;
        }
        
        .contact-info-professional {
            padding: 40px;
            background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
            border-radius: 20px;
            box-shadow: 0 15px 40px rgba(0,0,0,0.08);
            height: 100%;
        }
        
        .contact-title {
            color: var(--dark);
            font-weight: 800;
            margin-bottom: 10px;
            font-size: 2rem;
        }
        
        .contact-subtitle {
            color: #6c757d;
            margin-bottom: 40px;
            font-size: 1.1rem;
        }
        
        .contact-grid {
            display: grid;
            gap: 20px;
            margin-bottom: 40px;
        }
        
        .contact-card-professional {
            display: flex;
            align-items: center;
            padding: 20px;
            background: white;
            border-radius: 15px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.05);
            transition: all 0.3s ease;
        }
        
        .contact-card-professional:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        
        .contact-icon-professional {
            width: 50px;
            height: 50px;
            background: ${scheme.grd};
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 20px;
            flex-shrink: 0;
        }
        
        .contact-icon-professional i {
            color: white;
            font-size: 1.3rem;
        }
        
        .contact-info-text {
            flex: 1;
        }
        
        .contact-info-text h6 {
            color: var(--dark);
            font-weight: 600;
            margin-bottom: 5px;
            font-size: 0.9rem;
        }
        
        .contact-link {
            color: var(--primary);
            text-decoration: none;
            font-weight: 500;
            transition: all 0.3s ease;
        }
        
        .contact-link:hover {
            color: var(--accent);
            text-decoration: underline;
        }
        
        .contact-address, .contact-hours {
            color: #6c757d;
            margin: 0;
            font-size: 0.9rem;
            line-height: 1.4;
        }
        
        .social-section h6 {
            color: var(--dark);
            font-weight: 600;
            margin-bottom: 15px;
        }
        
        .social-links-professional {
            display: flex;
            gap: 15px;
        }
        
        .social-link-professional {
            width: 40px;
            height: 40px;
            background: rgba(var(--primary-rgb), 0.1);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--primary);
            text-decoration: none;
            transition: all 0.3s ease;
        }
        
        .social-link-professional:hover {
            background: var(--primary);
            color: white;
            transform: translateY(-3px);
        }
        
        .contact-form-professional {
            padding: 40px;
            background: white;
            border-radius: 20px;
            box-shadow: 0 15px 40px rgba(0,0,0,0.08);
            height: 100%;
        }
        
        .form-title {
            color: var(--dark);
            font-weight: 800;
            margin-bottom: 10px;
            font-size: 2rem;
        }
        
        .form-subtitle {
            color: #6c757d;
            margin-bottom: 40px;
            font-size: 1.1rem;
        }
        
        .form-label-modern {
            color: var(--dark);
            font-weight: 600;
            margin-bottom: 8px;
            display: block;
        }
        
        .form-control-modern {
            border: 2px solid #e9ecef;
            border-radius: 12px;
            padding: 15px 20px;
            font-size: 1rem;
            transition: all 0.3s ease;
            background: #fafbfc;
            width: 100%;
        }
        
        .form-control-modern:focus {
            border-color: var(--primary);
            box-shadow: 0 0 0 0.25rem rgba(var(--primary-rgb), 0.15);
            background: white;
            outline: none;
        }
        
        .btn-submit-professional {
            background: ${scheme.grd};
            color: white;
            border: none;
            padding: 15px 40px;
            border-radius: 12px;
            font-weight: 600;
            font-size: 1.1rem;
            cursor: pointer;
            transition: all 0.3s ease;
            display: inline-flex;
            align-items: center;
            justify-content: center;
        }
        
        .btn-submit-professional:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 30px rgba(var(--primary-rgb), 0.3);
        }
        
        /* Carte Google Maps en dessous */
        .map-section-bottom {
            margin-top: 60px;
        }
        
        .map-wrapper-bottom {
            position: relative;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(0,0,0,0.15);
            background: white;
        }
        
        .map-iframe-bottom {
            border: none;
            border-radius: 20px;
        }
        
        .map-overlay-bottom {
            position: absolute;
            top: 20px;
            right: 20px;
            background: white;
            padding: 20px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            z-index: 10;
            min-width: 200px;
        }
        
        .map-info-bottom {
            text-align: center;
        }
        
        .map-info-bottom i {
            color: var(--primary);
            font-size: 2rem;
            margin-bottom: 10px;
            display: block;
        }
        
        .map-info-bottom h5 {
            color: var(--dark);
            font-weight: 700;
            margin-bottom: 5px;
        }
        
        .map-info-bottom p {
            color: #6c757d;
            margin: 0;
            font-size: 0.9rem;
        }
        
        .form-control, .form-select {
            border: 2px solid #e9ecef;
            border-radius: 15px;
            padding: 18px 20px;
            font-size: 1rem;
            transition: all 0.3s ease;
            background: #fafbfc;
        }
        
        .form-control:focus, .form-select:focus {
            border-color: var(--primary);
            box-shadow: 0 0 0 0.25rem rgba(var(--primary-rgb), 0.25);
            background: white;
            transform: translateY(-2px);
        }
        
        /* Footer professionnel */
        footer {
            background: linear-gradient(135deg, var(--dark) 0%, #1a1a1a 100%);
            color: white;
            padding: 80px 0 40px;
            position: relative;
        }
        
        footer::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 1px;
            background: linear-gradient(90deg, transparent, var(--primary), transparent);
        }
        
        .footer-link {
            color: rgba(255,255,255,0.7);
            text-decoration: none;
            transition: all 0.3s ease;
            padding: 2px 0;
            border-bottom: 1px solid transparent;
        }
        
        .footer-link:hover {
            color: white;
            border-bottom-color: var(--primary);
            transform: translateY(-1px);
        }
        
        /* Footer Brand Styles - Identique au Header avec SVG devant */
        .footer-brand {
            display: flex;
            align-items: center;
            gap: 15px;
            margin-bottom: 20px;
        }
        
        .footer-logo {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        .footer-brand-text {
            display: flex;
            flex-direction: column;
            line-height: 1.1;
        }
        
        .footer-brand-name {
            font-size: 1.1rem;
            font-weight: 700;
            color: white;
            margin-bottom: 2px;
        }
        
        .footer-brand-slogan {
            font-size: 0.65rem;
            color: rgba(255,255,255,0.8);
            font-weight: 500;
            font-style: italic;
        }
        
        .footer-description {
            color: rgba(255,255,255,0.7);
            font-size: 0.95rem;
            line-height: 1.6;
        }
        
        .footer-logo-link {
            text-decoration: none;
            transition: all 0.3s ease;
            display: inline-block;
        }
        
        .footer-logo-link:hover {
            transform: translateY(-2px);
            opacity: 0.9;
        }
        
        .footer-logo-link:hover .footer-brand-name {
            color: rgba(255,255,255,0.95);
        }
        
        .footer-logo-link:hover .footer-brand-slogan {
            color: rgba(255,255,255,0.9);
        }
        
        /* WhatsApp Button amélioré - Plus petit */
        .whatsapp-float {
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: linear-gradient(45deg, #25d366, #128c7e);
            color: white;
            width: 56px;
            height: 56px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            box-shadow: 0 12px 32px rgba(37, 211, 102, 0.3);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 1000;
            text-decoration: none;
        }
        
        .whatsapp-float:hover {
            transform: scale(1.1) rotate(10deg);
            box-shadow: 0 16px 40px rgba(37, 211, 102, 0.4);
        }
        
        /* Responsive */
        @media (max-width: 768px) {
            .hero h1 { font-size: 3rem; }
            .hero-content { padding: 50px 30px; }
            .section-title { font-size: 2.5rem; }
            .section { padding: 80px 0; }
            .contact-form { padding: 40px 25px; }
            .service-card { padding: 35px 25px; }
            .brand-slogan { display: none; }
            .hero-buttons { flex-direction: column; align-items: center; }
            .btn-primary, .btn-outline-primary { width: 100%; max-width: 300px; }
        }
    </style>
</head>
<body>
    <!-- Barre de notification professionnelle -->
    <div class="notification-bar">
        <div class="notification-content">
            <div class="notification-item">
                <i class="bi bi-clock-fill"></i>
                <span>Horaires: Lun-Ven 8h-18h, Sam 9h-12h</span>
            </div>
            <div class="notification-item">
                <i class="bi bi-telephone-fill"></i>
                <span>${ph || 'Téléphone'}</span>
            </div>
            <div class="notification-item">
                <i class="bi bi-envelope-fill"></i>
                <span>${em || 'Email'}</span>
            </div>
            <div class="notification-item">
                <i class="bi bi-geo-alt-fill"></i>
                <span>${addr || 'Adresse'}</span>
            </div>
            <div class="notification-item">
                <i class="bi bi-shield-check-fill"></i>
                <span>Qualité garantie</span>
            </div>
            <div class="notification-item">
                <i class="bi bi-truck"></i>
                <span>Intervention rapide</span>
            </div>
            <!-- Duplication pour défilement continu -->
            <div class="notification-item">
                <i class="bi bi-clock-fill"></i>
                <span>Horaires: Lun-Ven 8h-18h, Sam 9h-12h</span>
            </div>
            <div class="notification-item">
                <i class="bi bi-telephone-fill"></i>
                <span>${ph || 'Téléphone'}</span>
            </div>
            <div class="notification-item">
                <i class="bi bi-envelope-fill"></i>
                <span>${em || 'Email'}</span>
            </div>
            <div class="notification-item">
                <i class="bi bi-geo-alt-fill"></i>
                <span>${addr || 'Adresse'}</span>
            </div>
            <div class="notification-item">
                <i class="bi bi-shield-check-fill"></i>
                <span>Qualité garantie</span>
            </div>
            <div class="notification-item">
                <i class="bi bi-truck"></i>
                <span>Intervention rapide</span>
            </div>
        </div>
    </div>

    <!-- Navigation professionnelle -->
    <nav class="navbar navbar-expand-lg fixed-top">
        <div class="container">
            <a class="navbar-brand" href="#home">
                ${svgLogo.replace('width="60" height="60"', 'width="35" height="35"')}
                <div class="brand-text">
                    <span class="brand-name">${logoName}</span>
                    <span class="brand-slogan">${heroAccent}</span>
                </div>
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item"><a class="nav-link" href="#about">À Propos</a></li>
                    <li class="nav-item"><a class="nav-link" href="#services">Services</a></li>
                    <li class="nav-item"><a class="nav-link" href="#process">Démarche</a></li>
                    <li class="nav-item"><a class="nav-link" href="#gallery">Réalisations</a></li>
                    <li class="nav-item"><a class="nav-link" href="#testimonials">Témoignages</a></li>
                    <li class="nav-item"><a class="nav-link" href="#contact">Contact</a></li>
                    <li class="nav-item ms-3">
                        <a href="tel:${ph}" class="btn btn-primary btn-sm">
                            <i class="bi bi-telephone-fill me-1"></i>Appeler
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Hero Section Premium -->
    <section class="hero-premium" id="home">
        <div class="container">
            <div class="row align-items-center min-vh-100">
                <!-- Colonne gauche -->
                <div class="col-lg-6">
                    <div class="hero-content-premium" data-aos="fade-right" data-aos-duration="1000">
                        <!-- Badge premium -->
                        <div class="hero-badge">
                            <i class="bi bi-award-fill"></i>
                            <span>${city ? `Leader ${sector} à ${city} depuis 10 ans` : `Leader ${sector} depuis 10 ans`}</span>
                        </div>
                        
                        <!-- Titre principal -->
                        <h1 class="hero-title-premium">
                            ${logoName}<br>
                            <span class="hero-title-accent">${heroAccent}</span>
                        </h1>
                        
                        <!-- Description -->
                        <p class="hero-description-premium">
                            ${uniqueContent.heroSubtitle}
                        </p>
                        
                        <!-- Actions -->
                        <div class="hero-actions">
                            <a href="#contact" class="btn-premium-primary">
                                <i class="bi bi-chat-dots-fill"></i>
                                ${uniqueContent.cta}
                            </a>
                        </div>
                        
                        <!-- Stats rapides -->
                        <div class="hero-stats">
                            <div class="stat-item">
                                <div class="rating-container">
                                    <div class="rating-stars">
                                        <i class="bi bi-star-fill"></i>
                                        <i class="bi bi-star-fill"></i>
                                        <i class="bi bi-star-fill"></i>
                                        <i class="bi bi-star-fill"></i>
                                        <i class="bi bi-star-half"></i>
                                    </div>
                                    <div class="rating-text">
                                        <span class="rating-score">${lead.googleRating || '4.9'}</span>
                                        <span class="rating-max">/5</span>
                                        <span class="rating-reviews">${lead.googleRating || '4.9'} sur 5 basé sur ${lead.googleReviews || '234'} avis</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Colonne droite -->
                <div class="col-lg-6">
                    <div class="hero-visual-premium" data-aos="fade-left" data-aos-duration="1000">
                        <!-- Image principale -->
                        <div class="hero-image-wrapper">
                            <img src="${imgs[0]}" alt="${n}" class="hero-image-premium">
                            <div class="hero-image-overlay"></div>
                        </div>
                        
                        <!-- Éléments décoratifs -->
                        <div class="hero-decorations">
                            <div class="decoration-circle decoration-1"></div>
                            <div class="decoration-circle decoration-2"></div>
                            <div class="decoration-line decoration-3"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Statistics Section -->
    <section class="section bg-light" id="statistics">
        <div class="container">
            <h2 class="section-title" data-aos="fade-up">Nos Chiffres Clés</h2>
            <div class="row">
                ${[
                    { number: `${lead.googleReviews || '450'}+`, label: "Avis Clients", icon: "bi-people-fill" },
                    { number: `${lead.googleRating || '4.9'}/5`, label: "Note Globale", icon: "bi-star-fill" },
                    { number: "100%", label: "Satisfaction", icon: "bi-patch-check-fill" },
                    { number: "24/7", label: "Disponibilité", icon: "bi-clock-fill" }
                ].map((stat, index) => `
                    <div class="col-lg-3 col-md-6">
                        <div class="stat-card" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="${index * 100}">
                            <div class="stat-icon">
                                <i class="bi ${stat.icon}"></i>
                            </div>
                            <div class="stat-number" style="font-size: 2.5rem; font-weight: 800; color: var(--primary);">${stat.number}</div>
                            <div class="stat-label">${stat.label}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>

    <!-- Expertise Section -->
    <section class="section" id="expertise">
        <div class="container">
            <h2 class="section-title" data-aos="fade-up">Notre Expertise</h2>
            <div class="row align-items-center">
                <div class="col-lg-6">
                    <div data-aos="fade-right" data-aos-duration="1000">
                        <h3 class="mb-4">Une Excellence Reconnue</h3>
                        <p class="lead mb-4">
                            Avec plus de 10 ans d'expérience dans le secteur ${sector.toLowerCase()}, 
                            nous avons développé un savoir-faire unique qui garantit des résultats exceptionnels.
                        </p>
                        <div class="expertise-list">
                            ${[
                                "Qualité professionnelle certifiée",
                                "Équipe d'experts dédiés", 
                                "Matériels de dernière génération",
                                "Suivi personnalisé",
                                "Garantie satisfaction",
                                "Intervention rapide"
                            ].map(item => `
                                <div class="expertise-item">
                                    <i class="bi bi-check-circle-fill text-success me-3"></i>
                                    <span>${item}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div data-aos="fade-left" data-aos-duration="1000">
                        <img src="${imgs[1]}" alt="Notre Expertise" class="img-fluid rounded-4 shadow-lg">
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Values Section -->
    <section class="section bg-light" id="values">
        <div class="container">
            <h2 class="section-title" data-aos="fade-up">Nos Valeurs</h2>
            <div class="row">
                ${[
                    { icon: "bi-check-circle-fill", title: "Fiabilité", description: "Nous tenons nos promesses avec rigueur et transparence." },
                    { icon: "bi-lightbulb-fill", title: "Innovation", description: "Nous intégrons les dernières technologies et méthodes." },
                    { icon: "bi-heart-fill", title: "Passion", description: "Notre passion pour le métier se reflète dans chaque projet." },
                    { icon: "bi-trophy-fill", title: "Excellence", description: "Nous visons toujours la perfection dans nos réalisations." }
                ].map((value, index) => `
                    <div class="col-lg-3 col-md-6">
                        <div class="value-card" data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="${index * 100}">
                            <div class="value-icon">
                                <i class="bi ${value.icon}"></i>
                            </div>
                            <h5>${value.title}</h5>
                            <p>${value.description}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>

    <!-- Technology Section -->
    <section class="section" id="technology">
        <div class="container">
            <h2 class="section-title" data-aos="fade-up">Technologie & Innovation</h2>
            <div class="row align-items-center">
                <div class="col-lg-6 order-lg-2">
                    <div data-aos="fade-left" data-aos-duration="1000">
                        <img src="${imgs[2]}" alt="Technologie" class="img-fluid rounded-4 shadow-lg">
                    </div>
                </div>
                <div class="col-lg-6 order-lg-1">
                    <div data-aos="fade-right" data-aos-duration="1000">
                        <h3 class="mb-4">Au Coeur de l'Innovation</h3>
                        <p class="lead mb-4">
                            Nous investissons continuellement dans les technologies les plus avancées 
                            pour vous offrir des solutions d'avant-garde.
                        </p>
                        <div class="tech-features">
                            ${[
                                "Équipements de pointe",
                                "Méthodes innovantes",
                                "Formation continue",
                                "R&D permanente"
                            ].map(feature => `
                                <div class="tech-feature">
                                    <div class="tech-icon">
                                        <i class="bi bi-cpu-fill"></i>
                                    </div>
                                    <div class="tech-content">
                                        <h6>${feature}</h6>
                                        <p class="mb-0 text-muted">Technologie de dernière génération</p>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Engagements Section -->
    <section class="section bg-light" id="engagements">
        <div class="container">
            <h2 class="section-title" data-aos="fade-up">Nos Engagements</h2>
            <div class="row">
                <div class="col-lg-4 col-md-6 mb-4">
                    <div class="engagement-card" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="0">
                        <div class="engagement-icon">
                            <i class="bi bi-shield-check"></i>
                        </div>
                        <h4>Qualité Garantie</h4>
                        <p>Intervention réalisée selon les normes les plus strictes avec garantie décennale sur tous nos travaux.</p>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 mb-4">
                    <div class="engagement-card" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="100">
                        <div class="engagement-icon">
                            <i class="bi bi-clock-history"></i>
                        </div>
                        <h4>Réactivité</h4>
                        <p>Intervention rapide sous 24h maximum. Disibilité 7j/7 et 24h/24 pour les urgences.</p>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 mb-4">
                    <div class="engagement-card" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
                        <div class="engagement-icon">
                            <i class="bi bi-hand-thumbs-up"></i>
                        </div>
                        <h4>Satisfaction Client</h4>
                        <p>Plus de 234 clients satisfaits. Note moyenne de 4.9/5 basée sur des avis authentiques.</p>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 mb-4">
                    <div class="engagement-card" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300">
                        <div class="engagement-icon">
                            <i class="bi bi-award"></i>
                        </div>
                        <h4>Expertise Certifiée</h4>
                        <p>Formation continue et certifications professionnelles garantissent une expertise à la pointe du secteur.</p>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 mb-4">
                    <div class="engagement-card" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">
                        <div class="engagement-icon">
                            <i class="bi bi-piggy-bank"></i>
                        </div>
                        <h4>Transparence</h4>
                        <p>Devis détaillé et gratuit. Aucun frais caché. Paiement sécurisé et facturation claire.</p>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 mb-4">
                    <div class="engagement-card" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="500">
                        <div class="engagement-icon">
                            <i class="bi bi-tools"></i>
                        </div>
                        <h4>Matériel Professionnel</h4>
                        <p>Équipements de dernière génération et techniques modernes pour des résultats durables.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Certifications Section -->
    <section class="section" id="certifications">
        <div class="container">
            <h2 class="section-title" data-aos="fade-up">Garanties & Assurances</h2>
            <div class="row">
                <div class="col-lg-12 mx-auto text-center">
                    <div data-aos="fade-up" data-aos-duration="1000">
                        <p class="lead mb-5">
                            Votre tranquillité d'esprit est notre priorité. Toutes nos interventions sont couvertes par des garanties complètes.
                        </p>
                        <div class="certifications-grid-inline">
                            ${[
                                "Garantie Décennale",
                                "Assurance Responsabilité Civile", 
                                "Certification Qualité",
                                "Assurance Tous Risques"
                            ].map((cert, index) => `
                                <div class="certification-item-inline" data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="${index * 100}">
                                    <div class="cert-icon">
                                        <i class="bi bi-shield-check"></i>
                                    </div>
                                    <p class="mb-0 fw-600">${cert}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- About Section -->
    <section class="section" id="about">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-6 mb-4">
                    <div data-aos="fade-right" data-aos-duration="1000">
                        <h2 class="section-title">${uniqueContent.aboutTitle}</h2>
                        <p class="lead fs-4">${uniqueContent.aboutText}</p>
                        ${content.whyChooseUs ? `
                        <div class="mt-5">
                            <h4 class="mb-4 fs-3">Pourquoi nous choisir ?</h4>
                            <div class="row g-3">
                                ${content.whyChooseUs.map((reason, index) => `
                                    <div class="col-md-6">
                                        <div class="d-flex align-items-start mb-3">
                                            <div class="service-icon me-3" style="width: 40px; height: 40px; font-size: 1.2rem;">
                                                <i class="bi bi-check-circle-fill"></i>
                                            </div>
                                            <div>
                                                <h6 class="mb-2">${reason}</h6>
                                            </div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        ` : ''}
                    </div>
                </div>
                <div class="col-lg-6 mb-4">
                    <div data-aos="fade-left" data-aos-duration="1000">
                        <img src="${imgs[1]}" alt="${n}" class="img-fluid rounded-4 shadow-lg">
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Services Section -->
    <section class="section bg-light" id="services">
        <div class="container">
            <h2 class="section-title" data-aos="fade-up">${uniqueContent.servicesTitle}</h2>
            <div class="row g-4">
                ${content.services.map((service, index) => `
                    <div class="col-lg-4 col-md-6">
                        <div class="service-card" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="${index * 100}">
                            <div class="service-icon">
                                <i class="bi ${getBI(lead.sector)[index] || 'bi-star-fill'}"></i>
                            </div>
                            <h4 class="mb-3">${service.name}</h4>
                            <p class="mb-0">${service.description}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>

    <!-- Gallery Section -->
    <section class="section" id="gallery">
        <div class="container">
            <h2 class="section-title" data-aos="fade-up">${uniqueContent.galleryTitle}</h2>
            <div class="gallery-professional">
                <div class="gallery-row" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="100">
                    ${imgs.slice(2, 6).map((img, index) => `
                        <div class="gallery-item-pro" data-aos="zoom-in" data-aos-duration="800" data-aos-delay="${index * 150}">
                            <div class="gallery-image-wrapper">
                                <img src="${img}" alt="Réalisation ${index + 1}" loading="lazy" class="gallery-image">
                                <div class="gallery-overlay-pro">
                                    <div class="gallery-number">${index + 1}</div>
                                    <div class="gallery-icon">
                                        <i class="bi bi-search"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="gallery-row" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
                    ${imgs.slice(6, 10).map((img, index) => `
                        <div class="gallery-item-pro" data-aos="zoom-in" data-aos-duration="800" data-aos-delay="${index * 150}">
                            <div class="gallery-image-wrapper">
                                <img src="${img}" alt="Réalisation ${index + 5}" loading="lazy" class="gallery-image">
                                <div class="gallery-overlay-pro">
                                    <div class="gallery-number">${index + 5}</div>
                                    <div class="gallery-icon">
                                        <i class="bi bi-search"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    </section>

    <!-- Testimonials Section -->
    <section class="section bg-light" id="testimonials">
        <div class="container">
            <h2 class="section-title" data-aos="fade-up">Témoignages Clients</h2>
            <div class="testimonials-header text-center mb-5" data-aos="fade-up" data-aos-delay="100">
                <p class="lead fs-4">Avis authentiques vérifiés Google Maps</p>
                <div class="google-badge mx-auto">
                    <div class="badge-stars">
                        ${Array(5).fill('<i class="bi bi-star-fill"></i>').join('')}
                    </div>
                    <div class="badge-text">${lead.googleRating || '4.9'} sur 5 basé sur ${lead.googleReviews || '234'} avis</div>
                </div>
            </div>
            <div class="row">
                ${content.testimonials && content.testimonials.length > 0 ? 
                    content.testimonials.map((testimonial, index) => `
                        <div class="col-lg-4 col-md-6">
                            <div class="testimonial-card" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="${index * 100}">
                                <div class="testimonial-header">
                                    <div class="stars">${stars(testimonial.rating)}</div>
                                    <div class="google-verified">
                                        <i class="bi bi-patch-check-fill text-primary"></i>
                                        <small>Avis Google Maps vérifié</small>
                                    </div>
                                </div>
                                <div class="testimonial-text">
                                    <p class="mb-4 fs-5">${testimonial.text}</p>
                                    ${testimonial.text.length > 150 ? `
                                        <a href="#" class="read-more" onclick="this.closest('.testimonial-card').querySelector('.testimonial-text p').classList.toggle('expanded'); this.textContent = this.textContent === 'Lire plus' ? 'Lire moins' : 'Lire plus'; return false;">Lire plus</a>
                                    ` : ''}
                                </div>
                                <div class="d-flex align-items-center justify-content-between">
                                    <div>
                                        <h6 class="mb-1">${testimonial.author}</h6>
                                        <small class="text-muted">${testimonial.date}</small>
                                    </div>
                                    <div class="google-logo">
                                        <small class="text-muted">Google</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).join('') :
                    // Fallback si pas de témoignages réels
                    [
                        { author: "Client Satisfait", text: `Excellent service ${sector.toLowerCase()} ! Très professionnel et disponible.`, rating: 5, date: "Il y a 2 jours" },
                        { author: "Client Fidèle", text: `Intervention rapide et efficace. Je recommande vivement pour vos besoins en ${sector.toLowerCase()}.`, rating: 5, date: "Il y a 1 semaine" },
                        { author: "Client Ravi", text: `Expertise confirmée et résultat parfait. Le meilleur ${sector.toLowerCase()} de la région !`, rating: 5, date: "Il y a 2 semaines" }
                    ].map((testimonial, index) => `
                        <div class="col-lg-4 col-md-6">
                            <div class="testimonial-card" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="${index * 100}">
                                <div class="testimonial-header">
                                    <div class="stars">${stars(testimonial.rating)}</div>
                                    <div class="google-verified">
                                        <i class="bi bi-patch-check-fill text-primary"></i>
                                        <small>Avis Google Maps vérifié</small>
                                    </div>
                                </div>
                                <div class="testimonial-text">
                                    <p class="mb-4 fs-5">${testimonial.text}</p>
                                    ${testimonial.text.length > 150 ? `
                                        <a href="#" class="read-more" onclick="this.closest('.testimonial-card').querySelector('.testimonial-text p').classList.toggle('expanded'); this.textContent = this.textContent === 'Lire plus' ? 'Lire moins' : 'Lire plus'; return false;">Lire plus</a>
                                    ` : ''}
                                </div>
                                <div class="d-flex align-items-center justify-content-between">
                                    <div>
                                        <h6 class="mb-1">${testimonial.author}</h6>
                                        <small class="text-muted">${testimonial.date}</small>
                                    </div>
                                    <div class="google-logo">
                                        <small class="text-muted">Google</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).join('')
                }
            </div>
        </div>
    </section>

    <!-- Section Notre Démarche -->
    <section class="section" id="process">
        <div class="container">
            <h2 class="section-title" data-aos="fade-up">Notre Démarche</h2>
            <div class="row">
                ${[
                    { step: "1", icon: "bi-telephone-fill", title: "Contact Initial", description: "Nous écoutons vos besoins et définissons ensemble les objectifs de votre projet." },
                    { step: "2", icon: "bi-clipboard-check-fill", title: "Devis Personnalisé", description: "Nous établissons un devis détaillé et transparent adapté à votre budget." },
                    { step: "3", icon: "bi-building-fill", title: "Réalisation", description: "Notre équipe intervient avec professionnalisme et respect des délais." },
                    { step: "4", icon: "bi-check-circle-fill", title: "Livraison", description: "Nous vous livrons un travail de qualité et assurons votre satisfaction." }
                ].map((process, index) => `
                    <div class="col-lg-3 col-md-6">
                        <div class="process-card" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="${index * 100}">
                            <div class="process-number">${process.step}</div>
                            <div class="process-icon">
                                <i class="bi ${process.icon}"></i>
                            </div>
                            <h5>${process.title}</h5>
                            <p>${process.description}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>

    <!-- Contact Section Professionnelle -->
    <section class="section contact-section" id="contact">
        <div class="container">
            <h2 class="section-title" data-aos="fade-up">${uniqueContent.contactTitle}</h2>
            
            <!-- Informations de contact et formulaire -->
            <div class="row">
                <!-- Colonne 1: Informations de contact -->
                <div class="col-lg-5">
                    <div class="contact-info-professional" data-aos="fade-right" data-aos-duration="1000">
                        <h3 class="contact-title">Contactez-nous</h3>
                        <p class="contact-subtitle">Nous sommes à votre disposition pour répondre à toutes vos questions</p>
                        
                        <div class="contact-grid">
                            <div class="contact-card-professional">
                                <div class="contact-icon-professional">
                                    <i class="bi bi-telephone-fill"></i>
                                </div>
                                <div class="contact-info-text">
                                    <h6>Téléphone</h6>
                                    <a href="tel:${ph}" class="contact-link">${ph || 'Non renseigné'}</a>
                                </div>
                            </div>
                            
                            <div class="contact-card-professional">
                                <div class="contact-icon-professional">
                                    <i class="bi bi-envelope-fill"></i>
                                </div>
                                <div class="contact-info-text">
                                    <h6>Email</h6>
                                    <a href="mailto:${em}" class="contact-link">${em || 'Non renseigné'}</a>
                                </div>
                            </div>
                            
                            <div class="contact-card-professional">
                                <div class="contact-icon-professional">
                                    <i class="bi bi-geo-alt-fill"></i>
                                </div>
                                <div class="contact-info-text">
                                    <h6>Adresse</h6>
                                    <p class="contact-address">${addr || 'Non renseigné'}</p>
                                </div>
                            </div>
                            
                            <div class="contact-card-professional">
                                <div class="contact-icon-professional">
                                    <i class="bi bi-clock-fill"></i>
                                </div>
                                <div class="contact-info-text">
                                    <h6>Horaires</h6>
                                    <p class="contact-hours">Lun-Ven: 8h-19h<br>Sam: 9h-17h</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Colonne 2: Formulaire de contact -->
                <div class="col-lg-7">
                    <div class="contact-form-professional" data-aos="fade-left" data-aos-duration="1000">
                        <h3 class="form-title">Envoyez-nous un message</h3>
                        <p class="form-subtitle">Nous vous répondrons dans les plus brefs délais</p>
                        
                        <form id="contactForm" class="contact-form-modern">
                            <div class="row g-4">
                                <div class="col-md-6">
                                    <label class="form-label-modern">Nom Complet *</label>
                                    <input type="text" class="form-control-modern" required>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label-modern">Email *</label>
                                    <input type="email" class="form-control-modern" required>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label-modern">Téléphone</label>
                                    <input type="tel" class="form-control-modern">
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label-modern">Service</label>
                                    <select class="form-control-modern">
                                        <option>Choisir un service</option>
                                        ${content.services.map(service => `
                                            <option>${service.name}</option>
                                        `).join('')}
                                    </select>
                                </div>
                                <div class="col-12">
                                    <label class="form-label-modern">Message *</label>
                                    <textarea class="form-control-modern" rows="6" required></textarea>
                                </div>
                                <div class="col-12">
                                    <button type="submit" class="btn-submit-professional">
                                        <i class="bi bi-send-fill me-2"></i>
                                        Envoyer le message
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            
            <!-- Carte Google Maps en dessous -->
            <div class="map-section-bottom" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
                <div class="map-wrapper-bottom">
                    <iframe 
                        src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(addr || 'Paris, France')}&zoom=15&maptype=roadmap"
                        width="100%" 
                        height="400" 
                        style="border:0; border-radius: 20px;" 
                        allowfullscreen="" 
                        loading="lazy"
                        class="map-iframe-bottom">
                    </iframe>
                    <div class="map-overlay-bottom">
                        <div class="map-info-bottom">
                            <i class="bi bi-geo-alt-fill"></i>
                            <h5>${n}</h5>
                            <p>${addr || 'Adresse non renseignée'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer professionnel amélioré -->
    <footer>
        <div class="container">
            <div class="row">
                <!-- Logo et description -->
                <div class="col-lg-5 mb-4">
                    <div class="footer-brand">
                        <a href="#home" class="footer-logo-link">
                            <div class="footer-logo">
                                ${svgLogo.replace('width="60" height="60"', 'width="40" height="40"')}
                                <div class="footer-brand-text">
                                    <span class="footer-brand-name">${logoName}</span>
                                    <span class="footer-brand-slogan">${heroAccent}</span>
                                </div>
                            </div>
                        </a>
                    </div>
                    <p class="footer-description">
                        ${sector} professionnel${city ? ' à ' + city : ''} avec plus de 10 ans d'expérience. 
                        Nous mettons notre expertise au service de votre satisfaction pour des résultats 
                        qui dépassent vos attentes. Qualité, fiabilité et innovation sont nos maîtres-mots.
                    </p>
                </div>
                
                <!-- Menu principal -->
                <div class="col-lg-4 mb-4">
                    <h5 class="footer-title">Navigation</h5>
                    <ul class="footer-menu">
                        <li><a href="#about" class="footer-link">À Propos</a></li>
                        <li><a href="#services" class="footer-link">Services</a></li>
                        <li><a href="#process" class="footer-link">Notre Démarche</a></li>
                        <li><a href="#gallery" class="footer-link">Nos Réalisations</a></li>
                        <li><a href="#testimonials" class="footer-link">Témoignages</a></li>
                        <li><a href="#contact" class="footer-link">Contact</a></li>
                    </ul>
                </div>
                
                <!-- Nos Coordonnées -->
                <div class="col-lg-3 mb-4">
                    <h5 class="footer-title">Nos Coordonnées</h5>
                    <div class="footer-contact-info">
                        <p><i class="bi bi-telephone-fill me-2"></i>${ph || 'Téléphone'}</p>
                        <p><i class="bi bi-envelope-fill me-2"></i>${em || 'Email'}</p>
                        <p><i class="bi bi-geo-alt-fill me-2"></i>${addr || 'Adresse'}</p>
                    </div>
                </div>
            </div>
            
            <!-- Pages de privacy avec contenu long -->
            <div class="footer-legal-content" style="display: none;">
                <div id="privacy" class="legal-section">
                    <h4>Politique de Confidentialité</h4>
                    <p>
                        Chez ${n}, nous nous engageons à protéger et respecter votre vie privée. 
                        Cette politique de confidentialité décrit comment nous collectons, utilisons, 
                        stockons et protégeons vos informations personnelles lorsque vous utilisez nos services.
                    </p>
                    <h5>Collecte des informations</h5>
                    <p>
                        Nous collectons uniquement les informations nécessaires à la fourniture de nos services : 
                        nom, coordonnées, préférences et historique des services. Ces informations sont collectées 
                        de manière transparente et avec votre consentement explicite.
                    </p>
                    <h5>Utilisation des données</h5>
                    <p>
                        Vos données personnelles sont utilisées exclusivement pour : fournir nos services, 
                        améliorer notre offre, communiquer avec vous et respecter nos obligations légales. 
                        Nous ne partageons jamais vos données avec des tiers sans votre autorisation.
                    </p>
                    <h5>Sécurité et conservation</h5>
                    <p>
                        Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles 
                        appropriées pour protéger vos données contre la perte, l'accès non autorisé 
                        ou la divulgation. Vos données sont conservées uniquement pendant la durée 
                        nécessaire à l'accomplissement de nos finalités.
                    </p>
                    <h5>Vos droits</h5>
                    <p>
                        Conformément au RGPD, vous disposez d'un droit d'accès, de modification, 
                        de suppression et de portabilité sur vos données. Vous pouvez exercer ces droits 
                        en nous contactant par email ou téléphone.
                    </p>
                </div>
                
                <div id="terms" class="legal-section">
                    <h4>Conditions Générales d'Utilisation</h4>
                    <p>
                        Les présentes conditions régissent l'utilisation de nos services. 
                        En utilisant nos services, vous acceptez sans réserve ces conditions générales.
                    </p>
                    <h5>Objet du service</h5>
                    <p>
                        ${n} fournit des services professionnels de ${sector.toLowerCase()} 
                        avec engagement de qualité et de respect des délais convenus.
                    </p>
                    <h5>Obligations des parties</h5>
                    <p>
                        Le client s'engage à fournir toutes les informations nécessaires à la bonne 
                        exécution des prestations. ${n} s'engage à réaliser les travaux 
                        conformément aux standards professionnels et aux délais convenus.
                    </p>
                    <h5>Prix et paiement</h5>
                    <p>
                        Les prix sont établis sur devis préalable et accepté par le client. 
                        Les modalités de paiement sont précisées dans chaque devis. 
                        Tout retard de paiement entraînera des pénalités de retard.
                    </p>
                </div>
                
                <div id="cookies" class="legal-section">
                    <h4>Politique de Cookies</h4>
                    <p>
                        Notre site utilise des cookies pour améliorer votre expérience de navigation 
                        et analyser l'utilisation de nos services.
                    </p>
                    <h5>Qu'est-ce qu'un cookie ?</h5>
                    <p>
                        Un cookie est un petit fichier texte stocké sur votre appareil lorsque vous 
                        visitez notre site. Il nous permet de vous reconnaître lors de vos visites 
                        ultérieures et d'améliorer nos services.
                    </p>
                    <h5>Types de cookies utilisés</h5>
                    <p>
                        - Cookies essentiels : nécessaires au fonctionnement du site<br>
                        - Cookies de performance : pour analyser l'utilisation du site<br>
                        - Cookies fonctionnels : pour mémoriser vos préférences
                    </p>
                </div>
                
                <div id="legal" class="legal-section">
                    <h4>Mentions Légales</h4>
                    <p>
                        <strong>${n}</strong><br>
                        ${sector} professionnel<br>
                        ${addr || 'Adresse à compléter'}<br>
                        ${ph || 'Téléphone à compléter'}<br>
                        ${em || 'Email à compléter'}<br>
                        SIRET : [Numéro SIRET]<br>
                        N° TVA : [Numéro TVA]
                    </p>
                    <h5>Propriété intellectuelle</h5>
                    <p>
                        L'ensemble du contenu de ce site (textes, images, logos, designs) 
                        est la propriété exclusive de ${n} et est protégé par le droit 
                        de la propriété intellectuelle.
                    </p>
                    <h5>Responsabilité</h5>
                    <p>
                        ${n} s'efforce de fournir des informations précises et à jour. 
                        Cependant, nous ne pouvons garantir l'exactitude absolue de toutes 
                        les informations présentes sur ce site.
                    </p>
                </div>
                
                <div id="gdpr" class="legal-section">
                    <h4>RGPD - Protection des Données Personnelles</h4>
                    <p>
                        Le Règlement Général sur la Protection des Données (RGPD) 
                        renforce la protection des données personnelles des citoyens de l'UE.
                    </p>
                    <h5>Notre engagement RGPD</h5>
                    <p>
                        ${n} s'engage à respecter les principes fondamentaux du RGPD : 
                        licéité, loyauté, transparence, limitation des finalités, 
                        minimisation des données, exactitude, limitation de conservation, 
                        intégrité, confidentialité et responsabilité.
                    </p>
                    <h5>Délégué à la protection des données</h5>
                    <p>
                        Pour toute question concernant la protection de vos données, 
                        vous pouvez contacter notre Délégué à la Protection des Données 
                        à l'adresse : ${em || 'email@dpo.fr'}.
                    </p>
                </div>
            </div>
            
            <hr class="my-5 bg-white-10">
            <div class="row">
                <div class="col-md-6">
                    <p class="mb-0 fs-6">&copy; 2024 ${n}. Tous droits réservés.</p>
                </div>
                <div class="col-md-6 text-md-end">
                    <p class="mb-0 fs-6">
                        <a href="#privacy" class="footer-link me-3" data-bs-toggle="modal" data-bs-target="#privacyModal">Confidentialité</a>
                        <a href="#terms" class="footer-link me-3" data-bs-toggle="modal" data-bs-target="#termsModal">CGU</a>
                        <a href="#cookies" class="footer-link me-3" data-bs-toggle="modal" data-bs-target="#cookiesModal">Cookies</a>
                        <a href="#legal" class="footer-link me-3" data-bs-toggle="modal" data-bs-target="#legalModal">Mentions Légales</a>
                    </p>
                </div>
            </div>
        </div>
    </footer>

    <!-- WhatsApp Button amélioré -->
    ${wa ? `<a href="https://wa.me/${wa}" target="_blank" class="whatsapp-float">
        <i class="bi bi-whatsapp"></i>
    </a>` : ''}

    <!-- Modal Confidentialité -->
    <div class="modal fade" id="privacyModal" tabindex="-1" aria-labelledby="privacyModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header bg-dark text-white">
                    <h5 class="modal-title" id="privacyModalLabel">Politique de Confidentialité</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <h6 class="fw-bold text-primary">1. Introduction</h6>
                    <p>Chez ${n}, nous nous engageons à protéger et respecter votre vie privée. Cette politique de confidentialité décrit comment nous collectons, utilisons, stockons et protégeons vos informations personnelles lorsque vous utilisez nos services.</p>
                    
                    <h6 class="fw-bold text-primary mt-4">2. Données Collectées</h6>
                    <p>Nous collectons uniquement les informations nécessaires à la fourniture de nos services :</p>
                    <ul>
                        <li><strong>Nom et coordonnées</strong> : Pour vous contacter et fournir nos services</li>
                        <li><strong>Adresse email</strong> : Pour la communication et l'envoi de devis</li>
                        <li><strong>Téléphone</strong> : Pour les confirmations et urgences</li>
                        <li><strong>Adresse postale</strong> : Pour les interventions sur site</li>
                        <li><strong>Données techniques</strong> : Informations relatives aux prestations fournies</li>
                    </ul>
                    
                    <h6 class="fw-bold text-primary mt-4">3. Utilisation des Données</h6>
                    <p>Vos informations personnelles sont utilisées exclusivement pour :</p>
                    <ul>
                        <li>Fournir les services demandés</li>
                        <li>Établir des devis et factures</li>
                        <li>Communiquer sur l'avancement des travaux</li>
                        <li>Améliorer nos services</li>
                        <li>Respecter nos obligations légales</li>
                    </ul>
                    
                    <h6 class="fw-bold text-primary mt-4">4. Protection des Données</h6>
                    <p>Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées pour protéger vos données contre la perte, l'accès non autorisé, la modification ou la divulgation.</p>
                    
                    <h6 class="fw-bold text-primary mt-4">5. Conservation des Données</h6>
                    <p>Vos données sont conservées uniquement pendant la durée nécessaire à la réalisation des finalités pour lesquelles elles ont été collectées, conformément à la législation en vigueur.</p>
                    
                    <h6 class="fw-bold text-primary mt-4">6. Vos Droits</h6>
                    <p>Conformément au RGPD, vous disposez des droits suivants :</p>
                    <ul>
                        <li>Droit d'accès à vos données</li>
                        <li>Droit de rectification</li>
                        <li>Droit à l'effacement</li>
                        <li>Droit à la portabilité</li>
                        <li>Droit d'opposition</li>
                    </ul>
                    
                    <h6 class="fw-bold text-primary mt-4">7. Contact DPO</h6>
                    <p>Pour toute question relative à la protection de vos données, vous pouvez contacter notre Délégué à la Protection des Données à l'adresse : ${em || 'email@dpo.fr'}.</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal CGU -->
    <div class="modal fade" id="termsModal" tabindex="-1" aria-labelledby="termsModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header bg-dark text-white">
                    <h5 class="modal-title" id="termsModalLabel">Conditions Générales d'Utilisation</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <h6 class="fw-bold text-primary">1. Objet</h6>
                    <p>Les présentes conditions générales d'utilisation (CGU) régissent l'utilisation de nos services et l'ensemble des relations contractuelles entre ${n} et ses clients.</p>
                    
                    <h6 class="fw-bold text-primary mt-4">2. Acceptation des CGU</h6>
                    <p>Toute utilisation de nos services vaut acceptation pleine et entière des présentes CGU. Le client déclare avoir pris connaissance et accepté toutes les dispositions des CGU.</p>
                    
                    <h6 class="fw-bold text-primary mt-4">3. Services Fournis</h6>
                    <p>${n} s'engage à fournir des services professionnels dans le domaine ${sector || 'spécifié'} conformément aux standards en vigueur et aux réglementations applicables.</p>
                    
                    <h6 class="fw-bold text-primary mt-4">4. Obligations du Client</h6>
                    <p>Le client s'engage à :</p>
                    <ul>
                        <li>Fournir des informations exactes et complètes</li>
                        <li>Assurer l'accès au site d'intervention</li>
                        <li>Respecter les conditions de paiement</li>
                        <li>Signaler tout problème dans les délais raisonnables</li>
                    </ul>
                    
                    <h6 class="fw-bold text-primary mt-4">5. Devis et Tarification</h6>
                    <p>Tout devis est valable 30 jours à compter de sa date d'émission. Les prix sont exprimés en euros HT et sont fermes pendant la période de validité du devis.</p>
                    
                    <h6 class="fw-bold text-primary mt-4">6. Conditions de Paiement</h6>
                    <p>Les paiements s'effectuent selon les modalités suivantes :</p>
                    <ul>
                        <li>30% à la signature du devis</li>
                        <li>40% à mi-réalisation des travaux</li>
                        <li>30% à la réception finale</li>
                    </ul>
                    
                    <h6 class="fw-bold text-primary mt-4">7. Garantie</h6>
                    <p>Nous garantissons nos prestations pour une durée de 10 ans (garantie décennale) conformément à la législation en vigueur.</p>
                    
                    <h6 class="fw-bold text-primary mt-4">8. Responsabilité</h6>
                    <p>Notre responsabilité est limitée aux dommages directs résultant d'une faute prouvée dans l'exécution de nos prestations.</p>
                    
                    <h6 class="fw-bold text-primary mt-4">9. Litiges</h6>
                    <p>Tout litige sera soumis à la compétence du tribunal de commerce de ${city || 'Paris'}.</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Cookies -->
    <div class="modal fade" id="cookiesModal" tabindex="-1" aria-labelledby="cookiesModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header bg-dark text-white">
                    <h5 class="modal-title" id="cookiesModalLabel">Politique de Cookies</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <h6 class="fw-bold text-primary">1. Qu'est-ce qu'un Cookie ?</h6>
                    <p>Un cookie est un petit fichier texte déposé sur votre appareil lors de votre visite de notre site web. Il permet de mémoriser vos actions et préférences pour améliorer votre expérience utilisateur.</p>
                    
                    <h6 class="fw-bold text-primary mt-4">2. Types de Cookies Utilisés</h6>
                    <p>Nous utilisons les types de cookies suivants :</p>
                    <ul>
                        <li><strong>Cookies essentiels</strong> : Nécessaires au fonctionnement du site</li>
                        <li><strong>Cookies de performance</strong> : Pour analyser l'utilisation du site</li>
                        <li><strong>Cookies de fonctionnalité</strong> : Pour mémoriser vos préférences</li>
                    </ul>
                    
                    <h6 class="fw-bold text-primary mt-4">3. Gestion des Cookies</h6>
                    <p>Vous pouvez gérer vos préférences cookies à tout moment via les paramètres de votre navigateur. Vous pouvez choisir de :</p>
                    <ul>
                        <li>Accepter tous les cookies</li>
                        <li>Refuser les cookies non essentiels</li>
                        <li>Supprimer les cookies existants</li>
                    </ul>
                    
                    <h6 class="fw-bold text-primary mt-4">4. Durée de Conservation</h6>
                    <p>Les cookies sont conservés pour la durée nécessaire à l'accomplissement de leurs finalités, sans excéder 13 mois.</p>
                    
                    <h6 class="fw-bold text-primary mt-4">5. Cookies Tiers</h6>
                    <p>Nous n'utilisons pas de cookies tiers à des fins publicitaires sur notre site.</p>
                    
                    <h6 class="fw-bold text-primary mt-4">6. Mise à Jour</h6>
                    <p>Cette politique peut être modifiée pour tenir compte des évolutions légales et techniques. Nous vous invitons à la consulter régulièrement.</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Mentions Légales -->
    <div class="modal fade" id="legalModal" tabindex="-1" aria-labelledby="legalModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header bg-dark text-white">
                    <h5 class="modal-title" id="legalModalLabel">Mentions Légales</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <h6 class="fw-bold text-primary">1. Éditeur du Site</h6>
                    <p><strong>${n}</strong><br>
                    ${sector || 'Activité professionnelle'}<br>
                    ${addr || 'Adresse non renseignée'}<br>
                    Téléphone : ${ph || 'Non renseigné'}<br>
                    Email : ${em || 'Non renseigné'}</p>
                    
                    <h6 class="fw-bold text-primary mt-4">2. Directeur de la Publication</h6>
                    <p>Le directeur de la publication est le représentant légal de l'entreprise ${n}.</p>
                    
                    <h6 class="fw-bold text-primary mt-4">3. Hébergement</h6>
                    <p>Ce site est hébergé par un prestataire professionnel conformément à la législation française sur l'hébergement de données.</p>
                    
                    <h6 class="fw-bold text-primary mt-4">4. Propriété Intellectuelle</h6>
                    <p>L'ensemble du contenu de ce site (textes, images, logos, éléments graphiques) est la propriété exclusive de ${n} et est protégé par le droit d'auteur.</p>
                    
                    <h6 class="fw-bold text-primary mt-4">5. Limitation de Responsabilité</h6>
                    <p>${n} s'efforce de fournir des informations exactes et à jour sur le site. Cependant, nous ne pouvons garantir l'exactitude, la complétude ou l'actualité des informations.</p>
                    
                    <h6 class="fw-bold text-primary mt-4">6. Liens Hypertextes</h6>
                    <p>La mise en place de liens hypertextes vers notre site nécessite une autorisation préalable de notre part.</p>
                    
                    <h6 class="fw-bold text-primary mt-4">7. Litiges</h6>
                    <p>Tout litige relatif à l'utilisation du site sera de la compétence exclusive des tribunaux français.</p>
                    
                    <h6 class="fw-bold text-primary mt-4">8. Contact</h6>
                    <p>Pour toute question relative aux mentions légales, vous pouvez nous contacter :</p>
                    <p>📞 ${ph || 'Téléphone'}<br>
                    ✉️ ${em || 'Email'}<br>
                    📍 ${addr || 'Adresse'}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    
    <!-- AOS Animation JS -->
    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    
    <!-- Chatbot Externe -->
    <script src="/chatbot.js"></script>
    
    <!-- Contact Form Script -->
    <script>
        // Initialiser AOS
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
        
        // Formulaire de contact
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Animation de confirmation
            const button = this.querySelector('button[type="submit"]');
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="bi bi-check-circle-fill me-2"></i>Message envoyé !';
            button.classList.add('btn-success');
            button.disabled = true;
            
            setTimeout(() => {
                alert('Merci pour votre message ! Nous vous contacterons rapidement.');
                this.reset();
                button.innerHTML = originalText;
                button.classList.remove('btn-success');
                button.disabled = false;
            }, 1500);
        });
        
        // Smooth scrolling avancé
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 100;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Navbar scroll effect avancé
        let lastScroll = 0;
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 8px 32px rgba(0,0,0,0.12)';
                navbar.style.padding = '10px 0';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 8px 32px rgba(0,0,0,0.08)';
                navbar.style.padding = '15px 0';
            }
            
            // Active nav link based on scroll position
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('.nav-link');
            
            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                if (rect.top <= 100 && rect.bottom >= 100) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    const activeLink = document.querySelector(\`.nav-link[href="#\${section.id}"]\`);
                    if (activeLink) activeLink.classList.add('active');
                }
            });
            
            lastScroll = currentScroll;
        });
        
        // Animation au chargement
        window.addEventListener('load', function() {
            // --- TRACKING LEADFORGE (ABSOLU CAR HEBERGÉ SUR STORAGE) ---
            const leadId = "${lead.id}";
            const trackUrl = "https://www.services-siteup.online/api/track";
            
            // Track site load
            fetch(trackUrl + "?id=" + leadId + "&type=site_clicked", { mode: 'no-cors' });
            
            // Track button clicks (payment/cta)
            document.querySelectorAll('a.btn, button.btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    fetch(trackUrl + "?id=" + leadId + "&type=payment_clicked", { mode: 'no-cors' });
                });
            });

            document.body.style.opacity = '0';
            setTimeout(() => {
                document.body.style.transition = 'opacity 0.5s ease';
                document.body.style.opacity = '1';
            }, 100);
            
            // Forcer les couleurs du chat bot après chargement
            setTimeout(() => {
                const chatWidgets = document.querySelectorAll('[class*="chat"], [id*="chat"]');
                chatWidgets.forEach(element => {
                    const style = window.getComputedStyle(element);
                    if (style.display !== 'none') {
                        element.style.setProperty('background', 'var(--primary)', 'important');
                        element.style.setProperty('color', 'white', 'important');
                    }
                });
            }, 2000);
        });
    </script>
</body>
</html>`;
}
