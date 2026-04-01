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

    const transporter = nodemailer.createTransport({
      host,
      port: Number(port),
      secure: Boolean(secure),
      auth: { user, pass },
      tls: { rejectUnauthorized: false }
    });

    await transporter.verify();

    res.json({ success: true, message: 'Configuration SMTP valide' });
  } catch (error) {
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

    if (!smtp.host || !smtp.port || !smtp.user || !smtp.pass) {
      return res.status(400).json({
        success: false,
        message: 'Configuration SMTP incomplète'
      });
    }

    const transporter = nodemailer.createTransport({
      host: smtp.host,
      port: Number(smtp.port),
      secure: Boolean(smtp.secure),
      auth: { user: smtp.user, pass: smtp.pass },
      tls: { rejectUnauthorized: false }
    });

    const info = await transporter.sendMail({
      from: { name: from.name || 'LeadForge AI', address: from.email },
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
  } catch (error) {
    console.error('[Email] Error:', error);
    res.status(500).json({
      success: false,
      message: `Erreur d'envoi: ${error.message}`
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Email server running on port ${PORT}`);
  console.log(`📧 SMTP endpoints:`);
  console.log(`   POST /api/config/test-smtp`);
  console.log(`   POST /api/email/send`);
});
