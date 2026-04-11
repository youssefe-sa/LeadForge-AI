import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import { getTemplateById } from '../src/templates/outreach-templates-final';

// Safe Supabase init
function getSupabase() {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const supabase = getSupabase();
    if (!supabase) {
      return res.status(500).json({ error: 'Supabase configuration missing' });
    }

    // Récupérer la config SMTP
    const smtpUser = process.env.GMAIL_SMTP_USER;
    const smtpPassword = process.env.GMAIL_SMTP_PASSWORD;
    const envFromName = process.env.GMAIL_SMTP_FROM_NAME;
    const envFromEmail = process.env.GMAIL_SMTP_FROM_EMAIL;

    let config;
    if (!smtpUser || !smtpPassword) {
      const { data: supabaseConfig, error: configErr } = await supabase.from('api_config').select('*').eq('id', 1).single();
      if (configErr || !supabaseConfig?.gmail_smtp_user || !supabaseConfig?.gmail_smtp_password) {
        return res.status(400).json({ 
          error: 'SMTP not configured', 
          message: 'Configure SMTP in Settings or Environment Variables' 
        });
      }
      config = supabaseConfig;
    }

    const fromName = envFromName || config?.gmail_smtp_from_name || 'LeadForge AI';
    const fromEmail = envFromEmail || config?.gmail_smtp_from_email || config?.gmail_smtp_user || smtpUser;

    // Lead de test
    const testLead = {
      id: 'test-lead-001',
      name: 'Entreprise Test',
      email: req.query.testEmail || smtpUser || 'test@example.com',
      site_url: 'https://example.com',
      sector: 'Technologie',
      city: 'Paris',
      devis_url: 'https://example.com/devis-test.pdf',
      invoice_url: 'https://example.com/facture-test.pdf'
    };

    // Templates à tester (9 emails au total)
    const templateIds = [
      'email1_presentation',
      'email2_devis',
      'email3_confirmation',
      'email4_final_payment',
      'email5_final_payment_confirmation',
      'email6_delivery_documentation',
      'reminder1_after_email1',
      'reminder2_after_email2',
      'reminder3_final_payment'
    ];

    const results = [];
    const { createTransport } = await import('nodemailer');

    const port = config?.gmail_smtp_port || 587;
    const transporter = createTransport({
      host: config?.gmail_smtp_host || 'smtp.gmail.com',
      port,
      secure: port === 465,
      auth: { 
        user: smtpUser || config.gmail_smtp_user, 
        pass: (smtpPassword || config.gmail_smtp_password).replace(/\s/g, '') 
      },
      tls: { rejectUnauthorized: false }
    });

    await transporter.verify();

    // Variables communes pour tous les templates
    const commonVariables = {
      firstName: 'Jean',
      companyName: testLead.name,
      websiteLink: testLead.site_url,
      price: '146€ HT',
      agentName: fromName,
      agentEmail: fromEmail,
      amount: '146€ HT',
      validityDays: '7',
      deliveryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR'),
      expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR'),
      devisLink: testLead.devis_url,
      paymentLink: config?.whop_deposit_link || '#',
      invoiceLink: testLead.invoice_url,
      finalPaymentLink: config?.whop_final_payment_link || '#',
      adminLink: `${testLead.site_url}/admin`,
      adminUsername: testLead.email,
      adminPassword: 'TempPassword123',
      documentationLink: 'https://docs.leadforge.ai',
      sector: testLead.sector,
      city: testLead.city
    };

    // Tester chaque template
    for (const templateId of templateIds) {
      try {
        const template = getTemplateById(templateId);
        if (!template) {
          results.push({ templateId, status: 'error', message: 'Template not found' });
          continue;
        }

        // Personnaliser le template
        let html = template.htmlContent;
        let subject = template.subject;
        for (const [key, val] of Object.entries(commonVariables)) {
          html = html.replace(new RegExp(`{{${key}}}`, 'g'), val);
          subject = subject.replace(new RegExp(`{{${key}}}`, 'g'), val);
        }

        // Envoyer l'email
        const info = await transporter.sendMail({
          from: `"${fromName}" <${fromEmail}>`,
          to: `"${testLead.name}" <${testLead.email}>`,
          subject: `[TEST] ${subject}`,
          html: html,
          text: html.replace(/<[^>]*>/g, '')
        });

        results.push({ 
          templateId, 
          status: 'success', 
          messageId: (info as { messageId: string }).messageId,
          subject 
        });

        // Attendre 2 secondes entre les emails
        await new Promise(resolve => setTimeout(resolve, 2000));

      } catch (err: unknown) {
        results.push({ 
          templateId, 
          status: 'failed', 
          error: (err as Error).message 
        });
      }
    }

    return res.json({
      success: true,
      testLead: testLead.name,
      testEmail: testLead.email,
      total: templateIds.length,
      sent: results.filter(r => r.status === 'success').length,
      failed: results.filter(r => r.status === 'failed').length,
      results
    });

  } catch (err: unknown) {
    console.error('[api/test-emails] Error:', err);
    return res.status(500).json({ error: 'Internal server error', message: (err as Error).message });
  }
}
