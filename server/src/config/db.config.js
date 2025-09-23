// Import the PrismaClient class from the generated Prisma client
import { PrismaClient } from '../generated/prisma/index.js';

// Import environment variables from your configuration file
import { ENV } from './env.config.js';

// Create a reference to the global object (works in Node.js environment)
const globalForPrisma = globalThis;

// Initialize the Prisma client
// If there is already a Prisma client attached to the global object, use that
// Otherwise, create a new PrismaClient instance with logging enabled
export const db =
  globalForPrisma.prisma ||
  new PrismaClient({
    // Enable logging for different types of events:
    // 'query' - logs all database queries
    // 'info'  - informational messages
    // 'warn'  - warnings
    // 'error' - errors
    log: ['query', 'info', 'warn', 'error'],
  });

// In development (non-production) environments, store the Prisma client on the global object
// This prevents creating multiple instances of PrismaClient during hot reloads
if (ENV.NODE_ENV !== 'production') globalForPrisma.prisma = db;
