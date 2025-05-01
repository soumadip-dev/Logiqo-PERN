// IMPORT THE EXPRESS FRAMEWORK
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';

import authRoutes from './routes/auth.routes.js';
import problemRoutes from './routes/problem.routes.js';

// CREATE AN EXPRESS APPLICATION
const app = express();

app.use(
  cors({
    origin: process.env.BASE_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

app.get('/', (req, res) => {
  res.send('Hello Guys welcome to Logiqo🔥');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ROUTES
// app.use('/api/v1/healthcheck', healthCheckRouter);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/problems', problemRoutes);

// EXPORTING THE APP
export default app;
