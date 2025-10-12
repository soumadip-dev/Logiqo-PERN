import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

import { ENV } from './config/env.config.js';
import authRoutes from './routes/auth.routes.js';
import problemRoutes from './routes/problem.routes.js';

const app = express();
const PORT = ENV.PORT || 8080;

app.use(
  cors({
    origin: ENV.FRONTEND_URL,
    credentials: true, // If true, allows cookies to be included in cross-site requests
  })
);

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

app.listen(PORT, () => {
  console.info(`✔️ Server is up and running on port: ${PORT}`);
});
