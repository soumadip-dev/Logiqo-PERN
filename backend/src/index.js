// IMPORTS
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';
import authRoutes from './routes/auth.routes.js';
import executionRoutes from './routes/executeCode.routes.js';
import playlistRoutes from './routes/playlist.routes.js';
import problemRoutes from './routes/problem.routes.js';
import submissionRoutes from './routes/submission.routes.js';

dotenv.config();

// CREATE AN EXPRESS APPLICATION
const app = express();

// ESSENTIAL MIDDLEWARE
app.use(express.json());
app.use(cookieParser());

// ROOT ROUTE
app.get('/', (req, res) => {
  res.send('Hello guies welsome to logiqo 🔥');
});

const port = process.env.PORT || 8000;

// ROUTES
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/problems', problemRoutes);
app.use('/api/v1/execute-code', executionRoutes);
app.use('/api/v1/submission', submissionRoutes);
app.use('/app/v1/playlist', playlistRoutes);

app.listen(port, () => {
  console.log('Server is running on ' + port);
});
