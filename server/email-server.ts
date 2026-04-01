import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Test SMTP configuration
app.post('/api/config/test-smtp', async (req, res) => {
  try {
    const { host, port, secure, user, pass } = req.body;

    if (!host || !port || !user || !pass) {
      return res.status(400).json({
        success: false,
        message: 'Paramètres SMTP manquants'
      });
    }

    // Créer le transporteur SMTP
    const transporter = nodemailer.createTransport({
      host,
      port: Number(port),
      secure: Boolean(secure),
      auth: {
        user,
        pass
      },
      tls: {
        rejectUnauthorized: false // Permet les certificats auto-signés
      }
    });

    // Vérifier la connexion
    await transporter.verify();

    res.json({
      success: true,
      message: 'Configuration SMTP valide'
    });
  } catch (error: any) {
    console.error('[SMTP Test] Error:', error);
    res.status(500).json({
      success: false,
      message: `Erreur SMTP: ${error.message}`
    });
  }
});

// Send email endpoint
app.post('/api/email/send', async (req, res) => {
  try {
    const { smtp, from, to, subject, html, text } = req.body;

    if (!smtp || !from || !to || !subject) {
      return res.status(400).json({
        success: false,
        message: 'Paramètres manquants: smtp, from, to, subject sont requis'
      });
    }

    // Vérifier les credentials SMTP
    if (!smtp.host || !smtp.port || !smtp.user || !smtp.pass) {
      return res.status(400).json({
        success: false,
        message: 'Configuration SMTP incomplète'
      });
    }

    // Créer le transporteur
    const transporter = nodemailer.createTransport({
      host: smtp.host,
      port: Number(smtp.port),
      secure: Boolean(smtp.secure),
      auth: {
        user: smtp.user,
        pass: smtp.pass
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // Envoyer l'email
    const info = await transporter.sendMail({
      from: {
        name: from.name || 'LeadForge AI',
        address: from.email
      },
      to: Array.isArray(to) ? to.join(', ') : to,
      subject,
      html: html || undefined,
      text: text || undefined
    });

    console.log('[Email] Sent:', info.messageId);

    res.json({
      success: true,
      message: 'Email envoyé avec succès',
      messageId: info.messageId
    });
  } catch (error: any) {
    console.error('[Email] Error:', error);
    res.status(500).json({
      success: false,
      message: `Erreur d'envoi: ${error.message}`
    });
  }
});

// Send bulk emails
app.post('/api/email/send-bulk', async (req, res) => {
  try {
    const { smtp, from, recipients, subject, html, text, delay = 1000 } = req.body;

    if (!smtp || !from || !recipients || !Array.isArray(recipients) || recipients.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Paramètres manquants ou invalides'
      });
    }

    const transporter = nodemailer.createTransport({
      host: smtp.host,
      port: Number(smtp.port),
      secure: Boolean(smtp.secure),
      auth: {
        user: smtp.user,
        pass: smtp.pass
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    const results = [];
    const errors = [];

    // Envoyer les emails avec un délai entre chaque
    for (const recipient of recipients) {
      try {
        const info = await transporter.sendMail({
          from: {
            name: from.name || 'LeadForge AI',
            address: from.email
          },
          to: recipient,
          subject,
          html: html || undefined,
          text: text || undefined
        });

        results.push({ recipient, messageId: info.messageId, success: true });
        console.log(`[Bulk Email] Sent to ${recipient}:`, info.messageId);

        // Délai pour éviter le rate limiting
        if (delay > 0) {
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      } catch (err: any) {
        errors.push({ recipient, error: err.message });
        console.error(`[Bulk Email] Failed for ${recipient}:`, err.message);
      }
    }

    res.json({
      success: errors.length === 0,
      sent: results.length,
      failed: errors.length,
      results,
      errors
    });
  } catch (error: any) {
    console.error('[Bulk Email] Error:', error);
    res.status(500).json({
      success: false,
      message: `Erreur: ${error.message}`
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Email server running on port ${PORT}`);
  console.log(`📧 SMTP endpoints:`);
  console.log(`   POST /api/config/test-smtp`);
  console.log(`   POST /api/email/send`);
  console.log(`   POST /api/email/send-bulk`);
});
