import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { dbPromise } from './db/index.js';
import leadsRouter from './routes/leads.js';
import configRouter from './routes/config.js';
import emailRouter from './routes/email.js';
import templatesRouter from './routes/templates.js';
import campaignsRouter from './routes/campaigns.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet({
  contentSecurityPolicy: false, // Disable for development
}));
app.use(cors({
  origin: ['http://localhost:5174', 'http://127.0.0.1:5174', 'http://127.0.0.1:51748', 'http://localhost:51748'],
  credentials: true
}));
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// API Routes
app.use('/api/leads', leadsRouter);
app.use('/api/config', configRouter);
app.use('/api/email', emailRouter);
app.use('/api/templates', templatesRouter);
app.use('/api/campaigns', campaignsRouter);

// Error handling
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
const startServer = async () => {
  try {
    await dbPromise;
    console.log('✅ Database initialized');
    
    app.listen(PORT, () => {
      console.log(`
🚀 LeadForge Backend running on port ${PORT}

📍 API Endpoints:
  • GET  /health          - Health check
  • GET  /api/leads       - List all leads
  • POST /api/leads       - Create lead
  • GET  /api/config      - Get API configuration
  • POST /api/config      - Update API configuration
  • POST /api/email/send  - Send email
  • GET  /api/templates   - List email templates
  • GET  /api/campaigns   - List campaigns

🔧 Environment:
  • Database: SQLite (./data/leadforge.db)
  • CORS: Enabled for localhost:5174
  • Mode: ${process.env.NODE_ENV || 'development'}
      `);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
