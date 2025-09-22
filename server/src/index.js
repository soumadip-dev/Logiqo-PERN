import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { ENV } from './config/env.config.js';

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

//* Root Route
app.get('/', (req, res) => {
  res.send('Hello from Logiqo backend');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
