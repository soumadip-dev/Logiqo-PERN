import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import job from './config/cron.config.js';

import { ENV } from './config/env.config.js';
import authRoutes from './routes/auth.routes.js';
import problemRoutes from './routes/problem.routes.js';
import executionRoutes from './routes/executeCode.routes.js';
import submissionRoutes from './routes/submission.routes.js';
import playlistRoutes from './routes/playlist.routes.js';

const app = express();

// CORS middleware
app.use(
  cors({
    origin: '*', // Allow all origins
  })
);

// Start cron job
job.start();
// Body parsing middleware
app.use(express.json()); // If we don't use this, we won't be able to access req.body
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // If we don't use this, we won't be able to access req.cookies
app.use(morgan('dev'));

//* Root Route
app.get('/', (req, res) => {
  res.send('Hello from Logiqo backend');
});

//* API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/problems', problemRoutes);
app.use('/api/v1/execute-code', executionRoutes);
app.use('/api/v1/submission', submissionRoutes);
app.use('/app/v1/playlist', playlistRoutes);

export default app;
