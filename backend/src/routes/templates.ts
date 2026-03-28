import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';
import dbPromise from '../db/index.js';

const router = express.Router();

// Template schema
const templateSchema = z.object({
  name: z.string().min(1),
  sector: z.string().min(1),
  subject: z.string().min(1),
  body: z.string().min(1)
});

// GET /api/templates - List all templates
router.get('/', async (req, res) => {
  try {
    const db = await dbPromise;
    const { sector } = req.query;

    let query = 'SELECT * FROM email_templates';
    const params: any[] = [];

    if (sector) {
      query += ' WHERE sector = ?';
      params.push(sector);
    }

    query += ' ORDER BY created_at DESC';

    db.all(query, params, (err, rows) => {
      if (err) {
        console.error('Error fetching templates:', err);
        res.status(500).json({ error: 'Failed to fetch templates' });
      } else {
        res.json({ templates: rows, count: rows.length });
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/templates/:id - Get single template
router.get('/:id', async (req, res) => {
  try {
    const db = await dbPromise;
    const { id } = req.params;

    db.get('SELECT * FROM email_templates WHERE id = ?', [id], (err, row) => {
      if (err) {
        res.status(500).json({ error: 'Failed to fetch template' });
      } else if (!row) {
        res.status(404).json({ error: 'Template not found' });
      } else {
        res.json(row);
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/templates - Create template
router.post('/', async (req, res) => {
  try {
    const validation = templateSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: validation.error.errors
      });
    }

    const db = await dbPromise;
    const id = uuidv4();
    const data = validation.data;

    db.run(
      `INSERT INTO email_templates (id, name, sector, subject, body)
       VALUES (?, ?, ?, ?, ?)`,
      [id, data.name, data.sector, data.subject, data.body],
      function(err) {
        if (err) {
          console.error('Error creating template:', err);
          res.status(500).json({ error: 'Failed to create template' });
        } else {
          res.status(201).json({
            id,
            message: 'Template created successfully',
            ...data
          });
        }
      }
    );
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /api/templates/:id - Update template
router.put('/:id', async (req, res) => {
  try {
    const db = await dbPromise;
    const { id } = req.params;
    const updates = req.body;

    const fields: string[] = [];
    const values: any[] = [];

    Object.entries(updates).forEach(([key, value]) => {
      if (value !== undefined) {
        fields.push(`${key} = ?`);
        values.push(value);
      }
    });

    if (fields.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    fields.push('updated_at = CURRENT_TIMESTAMP');
    values.push(id);

    const query = `UPDATE email_templates SET ${fields.join(', ')} WHERE id = ?`;

    db.run(query, values, function(err) {
      if (err) {
        console.error('Error updating template:', err);
        res.status(500).json({ error: 'Failed to update template' });
      } else if (this.changes === 0) {
        res.status(404).json({ error: 'Template not found' });
      } else {
        res.json({ message: 'Template updated successfully', id });
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/templates/:id - Delete template
router.delete('/:id', async (req, res) => {
  try {
    const db = await dbPromise;
    const { id } = req.params;

    db.run('DELETE FROM email_templates WHERE id = ?', [id], function(err) {
      if (err) {
        console.error('Error deleting template:', err);
        res.status(500).json({ error: 'Failed to delete template' });
      } else if (this.changes === 0) {
        res.status(404).json({ error: 'Template not found' });
      } else {
        res.json({ message: 'Template deleted successfully', id });
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
