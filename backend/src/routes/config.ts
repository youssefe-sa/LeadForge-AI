import express from 'express';
import { createTransport } from 'nodemailer';
import { z } from 'zod';
import dbPromise from '../db/index.js';

const router = express.Router();

// Config validation schema
const configSchema = z.object({
  groqKey: z.string().optional(),
  openrouterKey: z.string().optional(),
  serperKey: z.string().optional(),
  gmailSmtpHost: z.string().default('smtp.gmail.com'),
  gmailSmtpPort: z.number().default(587),
  gmailSmtpUser: z.string().optional(),
  gmailSmtpPassword: z.string().optional(),
  gmailSmtpFromName: z.string().optional(),
  gmailSmtpFromEmail: z.string().optional(),
  gmailSmtpSecure: z.boolean().default(true)
});

// GET /api/config - Get API configuration
router.get('/', async (req, res) => {
  try {
    const db = await dbPromise;
    
    const config = await new Promise<any>((resolve, reject) => {
      db.get('SELECT * FROM api_config WHERE id = 1', (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });

    if (!config) {
      // Return empty config if none exists
      return res.json({
        groqKey: '',
        openrouterKey: '',
        serperKey: '',
        gmailSmtpHost: 'smtp.gmail.com',
        gmailSmtpPort: 587,
        gmailSmtpUser: '',
        gmailSmtpPassword: '',
        gmailSmtpFromName: '',
        gmailSmtpFromEmail: '',
        gmailSmtpSecure: true
      });
    }

    // Return config with masked passwords
    res.json({
      groqKey: config.groq_key || '',
      openrouterKey: config.openrouter_key || '',
      serperKey: config.serper_key || '',
      gmailSmtpHost: config.gmail_smtp_host || 'smtp.gmail.com',
      gmailSmtpPort: config.gmail_smtp_port || 587,
      gmailSmtpUser: config.gmail_smtp_user || '',
      gmailSmtpPassword: config.gmail_smtp_password ? '***' + config.gmail_smtp_password.slice(-4) : '',
      gmailSmtpFromName: config.gmail_smtp_from_name || '',
      gmailSmtpFromEmail: config.gmail_smtp_from_email || '',
      gmailSmtpSecure: config.gmail_smtp_secure === 1
    });

  } catch (error) {
    console.error('Error fetching config:', error);
    res.status(500).json({ error: 'Failed to fetch configuration' });
  }
});

// POST /api/config - Update API configuration
router.post('/', async (req, res) => {
  try {
    const validation = configSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: validation.error.errors
      });
    }

    const db = await dbPromise;
    const data = validation.data;

    // Check if config exists
    const existing = await new Promise<any>((resolve, reject) => {
      db.get('SELECT id FROM api_config WHERE id = 1', (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });

    let query: string;
    let params: any[];

    if (existing) {
      // Update existing config
      query = `
        UPDATE api_config SET
          groq_key = ?,
          openrouter_key = ?,
          serper_key = ?,
          gmail_smtp_host = ?,
          gmail_smtp_port = ?,
          gmail_smtp_user = ?,
          gmail_smtp_password = ?,
          gmail_smtp_from_name = ?,
          gmail_smtp_from_email = ?,
          gmail_smtp_secure = ?,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = 1
      `;
      params = [
        data.groqKey || null,
        data.openrouterKey || null,
        data.serperKey || null,
        data.gmailSmtpHost,
        data.gmailSmtpPort,
        data.gmailSmtpUser || null,
        data.gmailSmtpPassword || null,
        data.gmailSmtpFromName || null,
        data.gmailSmtpFromEmail || null,
        data.gmailSmtpSecure ? 1 : 0
      ];
    } else {
      // Insert new config
      query = `
        INSERT INTO api_config (
          id, groq_key, openrouter_key, serper_key,
          gmail_smtp_host, gmail_smtp_port, gmail_smtp_user, gmail_smtp_password,
          gmail_smtp_from_name, gmail_smtp_from_email, gmail_smtp_secure
        ) VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      params = [
        data.groqKey || null,
        data.openrouterKey || null,
        data.serperKey || null,
        data.gmailSmtpHost,
        data.gmailSmtpPort,
        data.gmailSmtpUser || null,
        data.gmailSmtpPassword || null,
        data.gmailSmtpFromName || null,
        data.gmailSmtpFromEmail || null,
        data.gmailSmtpSecure ? 1 : 0
      ];
    }

    db.run(query, params, function(err) {
      if (err) {
        console.error('Error saving config:', err);
        res.status(500).json({ error: 'Failed to save configuration' });
      } else {
        res.json({
          message: 'Configuration saved successfully',
          config: {
            ...data,
            gmailSmtpPassword: data.gmailSmtpPassword ? '***' + data.gmailSmtpPassword.slice(-4) : ''
          }
        });
      }
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/config/test-smtp - Test SMTP connection
router.post('/test-smtp', async (req, res) => {
  try {
    const db = await dbPromise;
    
    const config = await new Promise<any>((resolve, reject) => {
      db.get('SELECT * FROM api_config WHERE id = 1', (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });

    if (!config || !config.gmail_smtp_user || !config.gmail_smtp_password) {
      return res.status(400).json({
        error: 'SMTP not configured',
        message: 'Please configure Gmail SMTP first'
      });
    }

    // Create transporter
    const testPort = config.gmail_smtp_port || 587;
    const transporter = createTransport({
      host: config.gmail_smtp_host || 'smtp.gmail.com',
      port: testPort,
      secure: testPort === 465, // 465=SSL, 587=STARTTLS
      auth: {
        user: config.gmail_smtp_user,
        pass: config.gmail_smtp_password.replace(/\s/g, '')
      },
      tls: { rejectUnauthorized: false }
    });

    // Verify connection
    await transporter.verify();

    res.json({
      success: true,
      message: '✅ SMTP connection successful',
      config: {
        host: config.gmail_smtp_host,
        port: config.gmail_smtp_port,
        user: config.gmail_smtp_user,
        secure: config.gmail_smtp_secure === 1
      }
    });

  } catch (error: any) {
    console.error('SMTP test error:', error);
    res.status(500).json({
      error: 'SMTP connection failed',
      message: error.message || 'Unknown error'
    });
  }
});

export default router;
