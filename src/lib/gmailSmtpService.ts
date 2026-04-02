import { ApiConfig } from './supabase-store';

export interface EmailData {
  to: string;
  toName?: string;
  subject: string;
  html: string;
  text?: string;
}

export interface SmtpResponse {
  success: boolean;
  message: string;
  messageId?: string;
}

const API_URL = '/api';

class GmailSmtpService {
  private config: ApiConfig | null = null;

  setConfig(config: ApiConfig) {
    this.config = config;
  }

  isConfigured(): boolean {
    if (!this.config) return false;
    const passwordClean = (this.config.gmailSmtpPassword || '').replace(/\s/g, '');
    return !!(
      this.config.gmailSmtpUser &&
      passwordClean.length >= 16
    );
  }

  async sendEmail(data: EmailData): Promise<SmtpResponse> {
    console.log('📧 [sendEmail] called:', data.to);
    
    if (!this.isConfigured()) {
      console.error('📧 [sendEmail] SMTP not configured!');
      return {
        success: false,
        message: 'Configuration SMTP incomplete',
      };
    }

    try {
      const url = `${API_URL}/email`;
      console.log('📧 [sendEmail] POST to:', url);

      // Construire le payload avec la config SMTP complète
      const payload = {
        smtp: {
          host: this.config?.gmailSmtpHost || 'smtp.gmail.com',
          port: this.config?.gmailSmtpPort || 587,
          secure: this.config?.gmailSmtpSecure !== false,
          user: this.config?.gmailSmtpUser,
          pass: this.config?.gmailSmtpPassword?.replace(/\s/g, ''), // Enlever les espaces
        },
        from: {
          name: this.config?.gmailSmtpFromName || 'LeadForge AI',
          email: this.config?.gmailSmtpFromEmail || this.config?.gmailSmtpUser,
        },
        to: data.to,
        subject: data.subject,
        html: data.html,
        text: data.text,
      };

      console.log('📧 [sendEmail] Payload:', { ...payload, smtp: { ...payload.smtp, pass: '***' } });

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Erreur inconnue' }));
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }

      const result = await response.json();
      return {
        success: true,
        message: 'Email envoye avec succes',
        messageId: result.messageId,
      };
    } catch (error: any) {
      console.error('📧 [sendEmail] ERROR:', error);
      return {
        success: false,
        message: `Erreur: ${error?.message || 'Inconnue'}`,
      };
    }
  }

  private async saveConfigToBackend(): Promise<void> {
    if (!this.config) return;
    try {
      await fetch(`${API_URL}/config`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gmailSmtpHost: this.config.gmailSmtpHost || 'smtp.gmail.com',
          gmailSmtpPort: this.config.gmailSmtpPort || 587,
          gmailSmtpUser: this.config.gmailSmtpUser,
          gmailSmtpPassword: this.config.gmailSmtpPassword,
          gmailSmtpFromName: this.config.gmailSmtpFromName,
          gmailSmtpFromEmail: this.config.gmailSmtpFromEmail,
          gmailSmtpSecure: this.config.gmailSmtpSecure !== false,
        }),
      });
    } catch (error) {
      console.warn('Failed to save config:', error);
    }
  }

  async sendEmailSequence(
    leadEmail: string,
    leadName: string,
    sequenceId: string,
    landingUrl?: string
  ): Promise<SmtpResponse[]> {
    const results: SmtpResponse[] = [];

    const sequences: Record<string, Array<{ subject: string; html: string }>> = {
      'restaurant-1': [
        {
          subject: `Un site web professionnel pour ${leadName}`,
          html: this.getRestaurantEmailTemplate(leadName, landingUrl || ''),
        },
      ],
      'commerce-1': [
        {
          subject: `Votre boutique ${leadName} merite un site web moderne`,
          html: this.getCommerceEmailTemplate(leadName, landingUrl || ''),
        },
      ],
      'generic-1': [
        {
          subject: `Proposition de site web pour ${leadName}`,
          html: this.getGenericEmailTemplate(leadName, landingUrl || ''),
        },
      ],
    };

    const emails = sequences[sequenceId] || sequences['generic-1'];

    for (const email of emails) {
      const result = await this.sendEmail({
        to: leadEmail,
        toName: leadName,
        subject: email.subject,
        html: email.html,
      });
      results.push(result);
    }

    return results;
  }

  private getRestaurantEmailTemplate(name: string, landingUrl: string): string {
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Proposition site web</title>
</head>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h2 style="color: #D4500A;">Bonjour ${name},</h2>
  <p>Je me permets de vous contacter car j ai remarque que ${name} pourrait beneficier d une presence en ligne professionnelle.</p>
  <p><strong>J ai cree une maquette de site web specialement pour votre restaurant :</strong></p>
  <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
    <a href="${landingUrl}" style="display: inline-block; background: #D4500A; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
      Decouvrir le site web propose
    </a>
  </div>
  <h3 style="color: #1C1B18;">Ce site inclut :</h3>
  <ul>
    <li>Menu en ligne avec photos</li>
    <li>Reservation en ligne</li>
    <li>Avis Google integres</li>
    <li>Optimise pour Google (SEO local)</li>
    <li>Responsive mobile</li>
  </ul>
  <p>Le site est <strong>pret a etre mis en ligne</strong>. Si cela vous interesse, repondez simplement a cet email.</p>
  <p>Bonne journee,<br><em>Votre consultant digital</em></p>
</body>
</html>`;
  }

  private getCommerceEmailTemplate(name: string, landingUrl: string): string {
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Proposition site web</title>
</head>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h2 style="color: #1A4FA0;">Bonjour ${name},</h2>
  <p>Je vous contacte car j ai vu que ${name} pourrait beneficier d un site web moderne pour attirer plus de clients.</p>
  <p><strong>J ai cree un site web professionnel pour votre commerce :</strong></p>
  <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
    <a href="${landingUrl}" style="display: inline-block; background: #1A4FA0; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
      Voir le site web propose
    </a>
  </div>
  <h3 style="color: #1C1B18;">Fonctionnalites :</h3>
  <ul>
    <li>Catalogue produits</li>
    <li>Horaires et localisation Google Maps</li>
    <li>Visible sur Google Search</li>
    <li>Design professionnel</li>
    <li>Mobile-friendly</li>
  </ul>
  <p>Le site est <strong>pret a etre mis en ligne immediatement</strong>. Repondez a cet email pour en discuter.</p>
  <p>Cordialement,<br><em>Votre consultant digital</em></p>
</body>
</html>`;
  }

  private getGenericEmailTemplate(name: string, landingUrl: string): string {
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Proposition site web</title>
</head>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h2 style="color: #1A7A4A;">Bonjour ${name},</h2>
  <p>Je me permets de vous contacter au sujet de ${name}.</p>
  <p>J ai remarque que vous pourriez beneficier d un <strong>site web professionnel</strong> pour developper votre activite en ligne.</p>
  <p><strong>J ai prepare une maquette de site web pour vous :</strong></p>
  <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
    <a href="${landingUrl}" style="display: inline-block; background: #1A7A4A; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
      Decouvrir la maquette
    </a>
  </div>
  <h3 style="color: #1C1B18;">Avantages :</h3>
  <ul>
    <li>Presence en ligne professionnelle</li>
    <li>Visible sur Google</li>
    <li>Design moderne et responsive</li>
    <li>Pret en 48h</li>
  </ul>
  <p>Si cela vous interesse, repondez simplement a cet email.</p>
  <p>Bien cordialement,<br><em>Votre consultant digital</em></p>
</body>
</html>`;
  }

  async testConnection(): Promise<SmtpResponse> {
    if (!this.isConfigured()) {
      return {
        success: false,
        message: 'Configuration SMTP incomplete',
      };
    }

    try {
      const url = `${API_URL}/config?action=test-smtp`;
      console.log('📧 [testConnection] POST to:', url);

      const payload = {
        host: this.config?.gmailSmtpHost || 'smtp.gmail.com',
        port: this.config?.gmailSmtpPort || 587,
        secure: this.config?.gmailSmtpSecure !== false,
        user: this.config?.gmailSmtpUser,
        pass: this.config?.gmailSmtpPassword?.replace(/\s/g, ''),
      };

      console.log('📧 [testConnection] Payload:', { ...payload, pass: '***' });
      
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Echec du test SMTP' }));
        throw new Error(error.message || 'Echec du test SMTP');
      }

      const result = await response.json();
      return {
        success: true,
        message: result.message,
      };
    } catch (error: any) {
      console.error('📧 [testConnection] ERROR:', error);
      return {
        success: false,
        message: `Erreur de connexion: ${error?.message || 'Inconnue'}`,
      };
    }
  }
}

export const gmailSmtpService = new GmailSmtpService();
export default GmailSmtpService;
