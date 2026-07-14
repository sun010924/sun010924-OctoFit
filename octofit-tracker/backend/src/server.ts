import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import db from './config/database';
import userRoutes from './routes/userRoutes';
import teamRoutes from './routes/teamRoutes';
import activityRoutes from './routes/activityRoutes';
import workoutRoutes from './routes/workoutRoutes';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});

// Apply rate limiting to all API routes
app.use('/api/', limiter);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to OctoFit Tracker API',
    version: '1.0.0',
    endpoints: {
      users: '/api/users',
      teams: '/api/teams',
      activities: '/api/activities',
      workouts: '/api/workouts',
      leaderboard: '/api/users/leaderboard',
      teamLeaderboard: '/api/teams/leaderboard',
    },
  });
});

app.use('/api/users', userRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/workouts', workoutRoutes);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err : {},
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server
db.once('open', () => {
  app.listen(PORT, () => {
    const codespaceName = process.env.CODESPACE_NAME;
    const baseUrl = codespaceName
      ? `https://${codespaceName}-8000.app.github.dev`
      : `http://localhost:${PORT}`;
    
    console.log(`OctoFit Tracker API server running on ${baseUrl}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  });
});

export default app;
