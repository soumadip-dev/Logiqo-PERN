import dotenv from 'dotenv';

dotenv.config();

export const ENV = {
  PORT: process.env.PORT,
  FRONTEND_URL: process.env.FRONTEND_URL,
  NODE_ENV: process.env.NODE_ENV,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_TOKEN_EXPIRY: process.env.JWT_TOKEN_EXPIRY,
  RAPIDAPI_KEY: process.env.RAPIDAPI_KEY,
  RAPIDAPI_HOST: process.env.RAPIDAPI_HOST,
  JUDGE0_API_URL: process.env.JUDGE0_API_URL,
};
