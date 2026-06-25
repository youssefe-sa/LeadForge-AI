import type { VercelRequest, VercelResponse } from '@vercel/node';

const EMAIL_REGEX = /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/g;

const BLOCKED_DOMAINS = new Set([
  'example.com', 'test.com', 'localhost', 'sentry.io', 'wixpress.com',
  'w3.org', 'schema.org', 'google.com', 'facebook.com', 'instagram.com',
  'twitter.com', 'x.com', 'linkedin.com', 'youtube.com', 'wikipedia.org',
  'apple.com', 'microsoft.com', 'googleapis.com', 'gstatic.com',
  'cloudflare.com', 'jquery.com', 'bootstrapcdn.com', 'fonts.googleapis.com',
  'fontawesome.com', 'cdnjs.cloudflare.com', 'unpkg.com',
]);

function extractEmails(text: string): string[] {
  const raw = text.match(EMAIL_REGEX) || [];
  const unique = new Map<string, string>();
  for (const m of raw) {
    const email = m.toLowerCase();
    const domain = email.split('@')[1];
    if (domain && !BLOCKED_DOMAINS.has(domain) && email.length <= 254) {
      unique.set(email, domain);
    }
  }
  return [...unique.keys()];
}

function extractPhoneNumbers(text: string): string[] {
  const fr = text.match(/(?:\+33|0033|0)[1-9](?:[\s.\-]?\d{2}){4}/g) || [];
  return [...new Set(fr.map(p => p.replace(/[\s.\-]/g, ' ').trim()))];
}

async function fetchPage(url: string, timeout = 10000): Promise<string> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; LeadForgeBot/1.0)',
        'Accept': 'text/html,application/xhtml+xml,text/plain',
      },
      redirect: 'follow',
    });
    if (!res.ok) return '';
    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('text/html') && !contentType.includes('text/plain')) return '';
    return await res.text();
  } catch {
    return '';
  } finally {
    clearTimeout(timer);
  }
}

function findContactLinks(html: string, baseUrl: string): string[] {
  const linkPatterns = [
    /href=["']([^"']*(?:contact|nous-contacter|about|about-us|mentions?[- ]legales|legal|qui[- ]sommes|team|equipe)[^"']*)/gi,
  ];
  const links: string[] = [];
  for (const regex of linkPatterns) {
    let match;
    while ((match = regex.exec(html)) !== null) {
      let href = match[1];
      if (href.startsWith('/')) {
        try {
          const base = new URL(baseUrl);
          href = `${base.origin}${href}`;
        } catch { continue; }
      }
      if (href.startsWith('http') && !links.includes(href)) {
        links.push(href);
      }
    }
  }
  return links.slice(0, 5);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { url, leadName } = req.body as { url?: string; leadName?: string };
  if (!url) return res.status(400).json({ error: 'url required' });

  try {
    const baseUrl = url.startsWith('http') ? url : `https://${url}`;
    const emails: string[] = [];
    const phones: string[] = [];

    const html = await fetchPage(baseUrl);
    if (html) {
      emails.push(...extractEmails(html));
      phones.push(...extractPhoneNumbers(html));
    }

    const contactLinks = findContactLinks(html, baseUrl);
    for (const link of contactLinks) {
      if (emails.length >= 5) break;
      const pageHtml = await fetchPage(link);
      if (pageHtml) {
        emails.push(...extractEmails(pageHtml));
        phones.push(...extractPhoneNumbers(pageHtml));
      }
    }

    const bestEmail = findBestEmail(emails, leadName || '');

    return res.json({
      success: true,
      emails: [...new Set(emails)].slice(0, 10),
      phones: [...new Set(phones)].slice(0, 5),
      bestEmail,
      pagesScanned: 1 + contactLinks.length,
    });
  } catch (err: any) {
    return res.status(500).json({ error: 'Scraping failed', message: err.message });
  }
}

function findBestEmail(emails: string[], leadName: string): string {
  if (emails.length === 0) return '';
  if (emails.length === 1) return emails[0];

  const namePart = leadName.split(' ')[0]?.toLowerCase() || '';

  const scored = emails.map(e => {
    let score = 0;
    const local = e.split('@')[0];
    const domain = e.split('@')[1];

    if (local === 'contact') score += 5;
    else if (local === 'info') score += 4;
    else if (local === 'hello' || local === 'bonjour') score += 3;
    else if (local.startsWith('admin')) score += 2;
    else if (namePart && local.includes(namePart)) score += 8;

    if (domain && !domain.includes('gmail') && !domain.includes('yahoo') && !domain.includes('hotmail') && !domain.includes('outlook')) {
      score += 3;
    }

    if (!local.includes('noreply') && !local.includes('no-reply') && !local.includes('mailer-daemon')) {
      score += 2;
    }

    return { email: e, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored[0].email;
}
