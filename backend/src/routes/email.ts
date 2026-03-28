import express from 'express';
import { createTransport } from 'nodemailer';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import dbPromise from '../db/index.js';

const router = express.Router();

// Email sending schema
const emailSchema = z.object({
  to: z.string().email(),
  toName: z.string().optional(),
  subject: z.string().min(1),
  html: z.string().min(1),
  text: z.string().optional(),
  leadId: z.string().optional()
});

// POST /api/email/send - Send email via Gmail SMTP
router.post('/send', async (req, res) => {
  try {
    const validation = emailSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: validation.error.errors
      });
    }

    const { to, toName, subject, html, text, leadId } = validation.data;

    // Get SMTP config from database
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
        message: 'Please configure Gmail SMTP in settings'
      });
    }

    // Create transporter
    const smtpPort = config.gmail_smtp_port || 587;
    const transporter = createTransport({
      host: config.gmail_smtp_host || 'smtp.gmail.com',
      port: smtpPort,
      secure: smtpPort === 465, // 465=SSL, 587=STARTTLS
      auth: {
        user: config.gmail_smtp_user,
        pass: config.gmail_smtp_password.replace(/\s/g, '') // Remove spaces
      },
      tls: { rejectUnauthorized: false }
    });

    // Verify connection
    await transporter.verify();

    // Send email
    const fromName = config.gmail_smtp_from_name || 'LeadForge AI';
    const fromEmail = config.gmail_smtp_from_email || config.gmail_smtp_user;

    const info = await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to: `"${toName || to}" <${to}>`,
      subject,
      html,
      text: text || html.replace(/<[^>]*>/g, '') // Strip HTML tags for text version
    });

    // Log email in database
    const emailLogId = uuidv4();
    await new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO email_logs (id, lead_id, to_email, subject, body, status, sent_at)
         VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`,
        [emailLogId, leadId || null, to, subject, html, 'sent'],
        (err) => {
          if (err) reject(err);
          else resolve(null);
        }
      );
    });

    // Update lead if leadId provided
    if (leadId) {
      await new Promise((resolve, reject) => {
        db.run(
          `UPDATE leads SET email_sent = 1, email_sent_date = CURRENT_TIMESTAMP, last_contact = CURRENT_TIMESTAMP WHERE id = ?`,
          [leadId],
          (err) => {
            if (err) reject(err);
            else resolve(null);
          }
        );
      });
    }

    console.log('✅ Email sent:', info.messageId);

    res.json({
      success: true,
      message: 'Email sent successfully',
      messageId: info.messageId,
      to,
      subject
    });

  } catch (error: any) {
    console.error('❌ Error sending email:', error);
    res.status(500).json({
      error: 'Failed to send email',
      message: error.message || 'Unknown error'
    });
  }
});

// POST /api/email/send-batch - Send emails to multiple recipients
router.post('/send-batch', async (req, res) => {
  try {
    const { emails, templateId, delayMs = 2000 } = req.body;

    if (!Array.isArray(emails) || emails.length === 0) {
      return res.status(400).json({ error: 'Invalid emails array' });
    }

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
        message: 'Please configure Gmail SMTP in settings'
      });
    }

    // Create transporter
    const smtpPort2 = config.gmail_smtp_port || 587;
    const transporter = createTransport({
      host: config.gmail_smtp_host || 'smtp.gmail.com',
      port: smtpPort2,
      secure: smtpPort2 === 465, // 465=SSL, 587=STARTTLS
      auth: {
        user: config.gmail_smtp_user,
        pass: config.gmail_smtp_password.replace(/\s/g, '')
      },
      tls: { rejectUnauthorized: false }
    });

    await transporter.verify();

    const fromName = config.gmail_smtp_from_name || 'LeadForge AI';
    const fromEmail = config.gmail_smtp_from_email || config.gmail_smtp_user;

    const results = [];
    const errors = [];

    // Send emails with delay between each
    for (const emailData of emails) {
      try {
        const { to, toName, subject, html, leadId } = emailData;

        const info = await transporter.sendMail({
          from: `"${fromName}" <${fromEmail}>`,
          to: `"${toName || to}" <${to}>`,
          subject,
          html,
          text: html.replace(/<[^>]*>/g, '')
        });

        // Log email
        const emailLogId = uuidv4();
        await new Promise((resolve, reject) => {
          db.run(
            `INSERT INTO email_logs (id, lead_id, to_email, subject, status, sent_at)
             VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`,
            [emailLogId, leadId || null, to, subject, 'sent'],
            (err) => {
              if (err) reject(err);
              else resolve(null);
            }
          );
        });

        // Update lead
        if (leadId) {
          await new Promise((resolve, reject) => {
            db.run(
              `UPDATE leads SET email_sent = 1, email_sent_date = CURRENT_TIMESTAMP, last_contact = CURRENT_TIMESTAMP WHERE id = ?`,
              [leadId],
              (err) => {
                if (err) reject(err);
                else resolve(null);
              }
            );
          });
        }

        results.push({ to, status: 'sent', messageId: info.messageId });
        console.log(`✅ Email sent to ${to}`);

        // Delay between emails (rate limiting)
        if (emails.indexOf(emailData) < emails.length - 1) {
          await new Promise(resolve => setTimeout(resolve, delayMs));
        }

      } catch (err: any) {
        errors.push({ to: emailData.to, error: err.message });
        console.error(`❌ Failed to send to ${emailData.to}:`, err.message);
      }
    }

    res.json({
      success: true,
      summary: {
        total: emails.length,
        sent: results.length,
        failed: errors.length
      },
      results,
      errors: errors.length > 0 ? errors : undefined
    });

  } catch (error: any) {
    console.error('❌ Error in batch send:', error);
    res.status(500).json({
      error: 'Failed to send emails',
      message: error.message
    });
  }
});

// GET /api/email/logs - Get email sending logs
router.get('/logs', async (req, res) => {
  try {
    const db = await dbPromise;
    const { leadId, limit = '50', offset = '0' } = req.query;

    let query = 'SELECT * FROM email_logs WHERE 1=1';
    const params: any[] = [];

    if (leadId) {
      query += ' AND lead_id = ?';
      params.push(leadId);
    }

    query += ' ORDER BY sent_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit as string), parseInt(offset as string));

    db.all(query, params, (err, rows) => {
      if (err) {
        res.status(500).json({ error: 'Failed to fetch logs' });
      } else {
        res.json({ logs: rows, count: rows.length });
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
