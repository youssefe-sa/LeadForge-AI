import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import dbPromise from '../db/index.js';

const router = express.Router();

// GET /api/campaigns - List all campaigns
router.get('/', async (req, res) => {
  try {
    const db = await dbPromise;
    const { status } = req.query;

    let query = 'SELECT * FROM campaigns';
    const params: any[] = [];

    if (status) {
      query += ' WHERE status = ?';
      params.push(status);
    }

    query += ' ORDER BY created_at DESC';

    db.all(query, params, (err, rows) => {
      if (err) {
        console.error('Error fetching campaigns:', err);
        res.status(500).json({ error: 'Failed to fetch campaigns' });
      } else {
        res.json({ campaigns: rows, count: rows.length });
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/campaigns/:id - Get campaign with leads
router.get('/:id', async (req, res) => {
  try {
    const db = await dbPromise;
    const { id } = req.params;

    // Get campaign
    const campaign = await new Promise<any>((resolve, reject) => {
      db.get('SELECT * FROM campaigns WHERE id = ?', [id], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });

    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }

    // Get leads in campaign
    const leads = await new Promise<any[]>((resolve, reject) => {
      db.all(
        `SELECT l.*, cl.status as campaign_status, cl.sent_at
         FROM leads l
         JOIN campaign_leads cl ON l.id = cl.lead_id
         WHERE cl.campaign_id = ?`,
        [id],
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });

    res.json({ campaign, leads });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/campaigns - Create campaign
router.post('/', async (req, res) => {
  try {
    const { name, templateId, leadIds } = req.body;

    if (!name || !templateId || !Array.isArray(leadIds) || leadIds.length === 0) {
      return res.status(400).json({
        error: 'Invalid request. Required: name, templateId, leadIds[]'
      });
    }

    const db = await dbPromise;
    const campaignId = uuidv4();

    // Create campaign
    await new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO campaigns (id, name, template_id, leads_count, status)
         VALUES (?, ?, ?, ?, 'draft')`,
        [campaignId, name, templateId, leadIds.length],
        function(err) {
          if (err) reject(err);
          else resolve(null);
        }
      );
    });

    // Add leads to campaign
    for (const leadId of leadIds) {
      await new Promise((resolve, reject) => {
        db.run(
          `INSERT INTO campaign_leads (campaign_id, lead_id, status)
           VALUES (?, ?, 'pending')`,
          [campaignId, leadId],
          function(err) {
            if (err) reject(err);
            else resolve(null);
          }
        );
      });
    }

    res.status(201).json({
      id: campaignId,
      message: 'Campaign created successfully',
      name,
      templateId,
      leadsCount: leadIds.length
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/campaigns/:id/start - Start campaign
router.post('/:id/start', async (req, res) => {
  try {
    const db = await dbPromise;
    const { id } = req.params;

    // Update campaign status
    await new Promise((resolve, reject) => {
      db.run(
        `UPDATE campaigns SET status = 'running', started_at = CURRENT_TIMESTAMP WHERE id = ?`,
        [id],
        function(err) {
          if (err) reject(err);
          else if (this.changes === 0) reject(new Error('Campaign not found'));
          else resolve(null);
        }
      );
    });

    res.json({ message: 'Campaign started', id });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/campaigns/:id/complete - Mark campaign as completed
router.post('/:id/complete', async (req, res) => {
  try {
    const db = await dbPromise;
    const { id } = req.params;

    await new Promise((resolve, reject) => {
      db.run(
        `UPDATE campaigns SET status = 'completed', completed_at = CURRENT_TIMESTAMP WHERE id = ?`,
        [id],
        function(err) {
          if (err) reject(err);
          else if (this.changes === 0) reject(new Error('Campaign not found'));
          else resolve(null);
        }
      );
    });

    res.json({ message: 'Campaign completed', id });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/campaigns/:id - Delete campaign
router.delete('/:id', async (req, res) => {
  try {
    const db = await dbPromise;
    const { id } = req.params;

    // Delete campaign leads first (foreign key)
    await new Promise((resolve, reject) => {
      db.run('DELETE FROM campaign_leads WHERE campaign_id = ?', [id], function(err) {
        if (err) reject(err);
        else resolve(null);
      });
    });

    // Delete campaign
    await new Promise((resolve, reject) => {
      db.run('DELETE FROM campaigns WHERE id = ?', [id], function(err) {
        if (err) reject(err);
        else if (this.changes === 0) reject(new Error('Campaign not found'));
        else resolve(null);
      });
    });

    res.json({ message: 'Campaign deleted successfully', id });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
