import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';
import dbPromise from '../db/index.js';

const router = express.Router();

// Validation schemas
const leadSchema = z.object({
  name: z.string().min(1),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  website: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  sector: z.string().optional(),
  rating: z.number().optional(),
  reviews_count: z.number().optional(),
  has_website: z.boolean().optional(),
  source: z.string().optional(),
  notes: z.string().optional()
});

// GET /api/leads - List all leads
router.get('/', async (req, res) => {
  try {
    const db = await dbPromise;
    const { status, search, limit = '100', offset = '0' } = req.query;
    
    let query = 'SELECT * FROM leads WHERE 1=1';
    const params: any[] = [];
    
    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }
    
    if (search) {
      query += ' AND (name LIKE ? OR email LIKE ? OR city LIKE ?)';
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }
    
    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit as string), parseInt(offset as string));
    
    db.all(query, params, (err, rows) => {
      if (err) {
        console.error('Error fetching leads:', err);
        res.status(500).json({ error: 'Failed to fetch leads' });
      } else {
        res.json({ leads: rows, count: rows.length });
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/leads/:id - Get single lead
router.get('/:id', async (req, res) => {
  try {
    const db = await dbPromise;
    const { id } = req.params;
    
    db.get('SELECT * FROM leads WHERE id = ?', [id], (err, row) => {
      if (err) {
        res.status(500).json({ error: 'Failed to fetch lead' });
      } else if (!row) {
        res.status(404).json({ error: 'Lead not found' });
      } else {
        res.json(row);
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/leads - Create lead
router.post('/', async (req, res) => {
  try {
    const validation = leadSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: validation.error.errors 
      });
    }
    
    const db = await dbPromise;
    const id = uuidv4();
    const data = validation.data;
    
    const query = `
      INSERT INTO leads (id, name, email, phone, website, address, city, sector, rating, reviews_count, has_website, source, notes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    const params = [
      id, data.name, data.email, data.phone, data.website, data.address,
      data.city, data.sector, data.rating, data.reviews_count,
      data.has_website ? 1 : 0, data.source, data.notes
    ];
    
    db.run(query, params, function(err) {
      if (err) {
        console.error('Error creating lead:', err);
        res.status(500).json({ error: 'Failed to create lead' });
      } else {
        res.status(201).json({ 
          id, 
          message: 'Lead created successfully',
          ...data 
        });
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /api/leads/:id - Update lead
router.put('/:id', async (req, res) => {
  try {
    const db = await dbPromise;
    const { id } = req.params;
    const updates = req.body;
    
    // Build dynamic update query
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
    
    const query = `UPDATE leads SET ${fields.join(', ')} WHERE id = ?`;
    
    db.run(query, values, function(err) {
      if (err) {
        console.error('Error updating lead:', err);
        res.status(500).json({ error: 'Failed to update lead' });
      } else if (this.changes === 0) {
        res.status(404).json({ error: 'Lead not found' });
      } else {
        res.json({ message: 'Lead updated successfully', id });
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/leads/:id - Delete lead
router.delete('/:id', async (req, res) => {
  try {
    const db = await dbPromise;
    const { id } = req.params;
    
    db.run('DELETE FROM leads WHERE id = ?', [id], function(err) {
      if (err) {
        console.error('Error deleting lead:', err);
        res.status(500).json({ error: 'Failed to delete lead' });
      } else if (this.changes === 0) {
        res.status(404).json({ error: 'Lead not found' });
      } else {
        res.json({ message: 'Lead deleted successfully', id });
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/leads/bulk - Create multiple leads
router.post('/bulk', async (req, res) => {
  try {
    const { leads } = req.body;
    
    if (!Array.isArray(leads) || leads.length === 0) {
      return res.status(400).json({ error: 'Invalid leads array' });
    }
    
    const db = await dbPromise;
    const results = [];
    
    for (const leadData of leads) {
      const validation = leadSchema.safeParse(leadData);
      if (validation.success) {
        const id = uuidv4();
        const data = validation.data;
        
        await new Promise((resolve, reject) => {
          db.run(
            `INSERT INTO leads (id, name, email, phone, website, address, city, sector, source)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [id, data.name, data.email, data.phone, data.website, data.address, data.city, data.sector, data.source],
            (err) => {
              if (err) reject(err);
              else {
                results.push({ id, ...data });
                resolve(null);
              }
            }
          );
        });
      }
    }
    
    res.status(201).json({ 
      message: `${results.length} leads created`,
      leads: results 
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to create leads' });
  }
});

export default router;
