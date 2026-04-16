import { EmailTemplate } from '../lib/supabase-store';

const HEADER_HTML = `
  <div style="text-align: center; margin-bottom: 30px;">
    <div style="background: #D4500A; color: white; display: inline-block; padding: 10px 25px; font-weight: bold; border-radius: 4px; font-family: 'Helvetica', sans-serif;">
      SERVICES SITEUP
    </div>
  </div>
`;

// Helper for professional US signature
const SIGNATURE_HTML = `
  <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #edf2f7; font-family: 'Helvetica', sans-serif;">
    <p style="margin: 0; color: #4a5568; font-size: 14px;">Best regards,</p>
    <p style="margin: 5px 0 0 0; font-weight: bold; color: #1a202c;">Digital Strategy Consultant</p>
    <p style="margin: 0; color: #D4500A; font-weight: bold; font-size: 13px;">Services Siteup | US/UK Growth Division</p>
  </div>
`;

export const usSalesTemplates: EmailTemplate[] = [
  {
    id: 'step-1-start-us',
    name: '[US] Step 1 - The Custom Draft',
    subject: 'I built a custom draft for {{name}}',
    category: 'sale',
    language: 'US',
    htmlContent: `
<div style="font-family: 'Helvetica', sans-serif; color: #2d3748; max-width: 600px; margin: 0 auto; line-height: 1.6;">
  ${HEADER_HTML}
  <p>Hi {{firstName}},</p>
  <p>I noticed that <strong>{{name}}</strong> doesn't have a professional mobile-optimized website yet. In today's market, that means you're likely losing customers to competitors who do.</p>
  <p>To show you what's possible, I took the liberty of building a custom draft specifically for your business. You can view it here:</p>
  
  <div style="text-align: center; margin: 35px 0;">
    <a href="{{websiteLink}}" style="background: #D4500A; color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">🚀 VIEW YOUR CUSTOM SITE DRAFT</a>
  </div>

  <div style="background: #f7fafc; padding: 20px; border-radius: 10px; border-left: 4px solid #D4500A;">
    <strong>Why this matters for {{city}} businesses:</strong><br>
    • 84% of customers judge credibility by the website.<br>
    • Google prioritizes sites built for mobile.<br>
    • Integrated booking/contact forms increase leads by 40%.
  </div>
  
  <p style="margin-top: 25px;">The pricing is simple: <strong>{{price}} total</strong>. No hidden fees. Includes hosting and your domain name.</p>
  <p>If you like what you see, just reply to this email or click "Get Started" on the draft page.</p>
  ${SIGNATURE_HTML}
</div>`,
    textContent: "Hi {{firstName}}, I built a custom website draft for {{name}}. View it here: {{websiteLink}}. Total cost: {{price}}.",
    variables: ['firstName', 'name', 'websiteLink', 'price', 'city']
  },
  {
    id: 'step-2-proposal-us',
    name: '[US] Step 2 - Full Proposal',
    subject: 'Ready to launch? Full proposal for {{name}}',
    category: 'sale',
    language: 'US',
    htmlContent: `
<div style="font-family: 'Helvetica', sans-serif; color: #2d3748; max-width: 600px; margin: 0 auto; line-height: 1.6;">
  ${HEADER_HTML}
  <p>Hi {{firstName}},</p>
  <p>Following up on the custom website I sent over. I've prepared a formal quote to move forward and get <strong>{{name}}</strong> online by <strong>{{deliveryDate}}</strong>.</p>
  
  <table style="width: 100%; border-collapse: collapse; margin: 25px 0; background: #fffaf0; border: 1px solid #fbd38d; border-radius: 8px;">
    <tr><td style="padding: 12px; border-bottom: 1px solid #eee;"><strong>Project</strong></td><td style="padding: 12px; border-bottom: 1px solid #eee;">Premium Business Website</td></tr>
    <tr><td style="padding: 12px; border-bottom: 1px solid #eee;"><strong>Timeline</strong></td><td style="padding: 12px; border-bottom: 1px solid #eee;">2 Business Days</td></tr>
    <tr><td style="padding: 12px; border-bottom: 1px solid #eee;"><strong>Total Investment</strong></td><td style="padding: 12px; border-bottom: 1px solid #eee;"><strong>{{price}}</strong></td></tr>
  </table>

  <div style="background: #fff; padding: 20px; border: 1px dashed #cbd5e0; text-align: center; margin: 25px 0;">
    <p style="margin: 0 mb 15px;"><strong>Payment Terms:</strong></p>
    <p style="font-size: 20px; margin: 10px 0;"><strong>{{deposit}} Deposit</strong> to start</p>
    <p style="margin: 0;">{{balance}} balance upon final delivery</p>
  </div>

  <div style="text-align: center;">
    <a href="{{devisLink}}" style="color: #4a5568; text-decoration: underline; margin-right: 20px;">View Quote (PDF)</a>
    <a href="{{paymentLink}}" style="background: #28a745; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">💳 SECURE DEPOSIT & START</a>
  </div>
  ${SIGNATURE_HTML}
</div>`,
    textContent: "Hi {{firstName}}, here is the proposal for {{name}}. {{price}} total. {{deposit}} to start. Pay here: {{paymentLink}}",
    variables: ['firstName', 'name', 'price', 'deposit', 'balance', 'deliveryDate', 'paymentLink', 'devisLink']
  },
  {
    id: 'step-3-deposit-us',
    name: '[US] Step 3 - Deposit Confirmed',
    subject: 'Action Required: Your project is now in production!',
    category: 'reminder',
    language: 'US',
    htmlContent: `
<div style="font-family: 'Helvetica', sans-serif; color: #2d3748; max-width: 600px; margin: 0 auto; line-height: 1.6;">
  ${HEADER_HTML}
  <h2 style="color: #2f855a;">Deposit Received!</h2>
  <p>Hi {{firstName}},</p>
  <p>Great news — your deposit of {{deposit}} has been confirmed. Your project for <strong>{{name}}</strong> is now officially in production.</p>
  
  <div style="background: #f0fff4; padding: 20px; border-radius: 8px; margin: 25px 0;">
    <strong>Next Steps:</strong><br>
    1. Our team is finalizing the content and SEO.<br>
    2. We are setting up your professional hosting.<br>
    3. Final delivery expected by <strong>{{deliveryDate}}</strong>.
  </div>

  <p>We will notify you as soon as the site is ready for final review.</p>
  ${SIGNATURE_HTML}
</div>`,
    textContent: "Hi {{firstName}}, your {{deposit}} deposit is received. {{name}} project is in production. Ready by {{deliveryDate}}.",
    variables: ['firstName', 'name', 'deposit', 'deliveryDate']
  },
  {
    id: 'step-4-delivery-us',
    name: '[US] Step 4 - Final Delivery',
    subject: 'Your website is ready for launch!',
    category: 'sale',
    language: 'US',
    htmlContent: `
<div style="font-family: 'Helvetica', sans-serif; color: #2d3748; max-width: 600px; margin: 0 auto; line-height: 1.6;">
  ${HEADER_HTML}
  <p>Hi {{firstName}},</p>
  <p>It's ready! Your new website for <strong>{{name}}</strong> is fully built and ready to go live.</p>
  
  <p>Please review the final version here:</p>
  <div style="text-align: center; margin: 25px 0;"><a href="{{websiteLink}}" style="font-weight: bold; color: #D4500A;">View Final Website</a></div>

  <div style="background: #fffaf0; padding: 20px; border: 1px solid #fbd38d; border-radius: 8px;">
    <strong>Remaining Balance: {{balance}}</strong>
  </div>

  <p>To receive your admin login credentials and officially launch on your domain, please complete the final payment:</p>
  
  <div style="text-align: center; margin: 30px 0;">
    <a href="{{finalPaymentLink}}" style="background: #28a745; color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">💰 COMPLETE PAYMENT & LAUNCH</a>
  </div>
  ${SIGNATURE_HTML}
</div>`,
    textContent: "Hi {{firstName}}, your site for {{name}} is ready. Final balance: {{balance}}. Pay here to launch: {{finalPaymentLink}}",
    variables: ['firstName', 'name', 'websiteLink', 'balance', 'finalPaymentLink']
  },
  {
    id: 'step-5-paid-us',
    name: '[US] Step 5 - Payment Confirmed',
    subject: 'Welcome aboard! Your site is LIVE 🚀',
    category: 'reminder',
    language: 'US',
    htmlContent: `
<div style="font-family: 'Helvetica', sans-serif; color: #2d3748; max-width: 600px; margin: 0 auto; line-height: 1.6;">
  ${HEADER_HTML}
  <h2 style="color: #2f855a;">Payment Confirmed!</h2>
  <p>Hi {{firstName}},</p>
  <p>Success! Your final payment of {{balance}} has been received. <strong>{{name}}</strong> is now LIVE on the web.</p>
  
  <p>Please find your final invoice below:</p>
  <div style="text-align: center; margin: 20px 0;"><a href="{{finalInvoiceLink}}" style="color: #4a5568; text-decoration: underline;">Download Final Invoice (PDF)</a></div>

  <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;">
  
  <p><strong>Your Admin Access Details:</strong></p>
  <div style="background: #edf2f7; padding: 20px; border-radius: 8px;">
    <strong>Admin URL:</strong> {{adminLink}}<br>
    <strong>Username:</strong> {{adminUsername}}<br>
    <strong>Password:</strong> {{adminPassword}}
  </div>

  <p style="margin-top: 20px;">You'll receive a separate email with your documentation and training video shortly.</p>
  ${SIGNATURE_HTML}
</div>`,
    textContent: "Hi {{firstName}}, payment confirmed. {{name}} is live! Admin: {{adminLink}}, User: {{adminUsername}}, Pass: {{adminPassword}}.",
    variables: ['firstName', 'name', 'balance', 'finalInvoiceLink', 'adminLink', 'adminUsername', 'adminPassword']
  },
  {
    id: 'step-6-admin-us',
    name: '[US] Step 6 - Official Admin Access',
    subject: '🔐 Your Official Admin Access Logs',
    category: 'reminder',
    language: 'US',
    htmlContent: `
<div style="font-family: 'Helvetica', sans-serif; color: #2d3748; max-width: 600px; margin: 0 auto; line-height: 1.6;">
  ${HEADER_HTML}
  <p>Hi {{firstName}},</p>
  <p>Thank you for choosing <strong>Services Siteup</strong>. As promised, here are your official login credentials and onboarding resources.</p>
  
  <div style="background: #1a202c; color: white; padding: 25px; border-radius: 10px; margin: 25px 0;">
    <h3 style="margin-top: 0; color: #D4500A;">🔐 Secure Access Logs</h3>
    <p><strong>Admin URL:</strong> {{adminLink}}</p>
    <p><strong>Username:</strong> {{adminUsername}}</p>
    <p><strong>Password:</strong> {{adminPassword}}</p>
  </div>

  <div style="border: 1px solid #e2e8f0; padding: 20px; border-radius: 8px;">
    <strong>Onboarding Resources:</strong><br>
    <a href="{{documentationLink}}" style="color: #D4500A; text-decoration: underline;">How to edit your website (PDF)</a>
  </div>

  <p style="margin-top: 30px;">If you need any adjustments or have questions, our US support team is here to help.</p>
  ${SIGNATURE_HTML}
</div>`,
    textContent: "Hi {{firstName}}, here are your admin logs. Admin: {{adminLink}}, User: {{adminUsername}}, Pass: {{adminPassword}}.",
    variables: ['firstName', 'adminLink', 'adminUsername', 'adminPassword', 'documentationLink']
  }
];
