import jwt from 'jsonwebtoken';

import { db } from '../config/db.config.js';
import { ENV } from '../config/env.config.js';

//* Middleware to authenticate user requests
async function authMiddleware(req, res, next) {
  try {
    // Get token from cookies
    const authToken = req.cookies?.authToken;

    // Return 401 if no token is provided
    if (!authToken) {
      return res.status(401).json({ success: false, message: 'Unauthorized, please log in again' });
    }

    // Verify token using secret key
    const decoded = jwt.verify(authToken, ENV.JWT_SECRET);
    const userId = decoded.id;

    // Find user by ID
    const existingUser = await db.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
      },
    });

    // Return 401 if user not found
    if (!existingUser) {
      return res.status(401).json({ success: false, message: 'Unauthorized, user not found' });
    }

    // Attach user to request object
    req.user = existingUser;

    // Proceed to next middleware or route
    next();
  } catch (error) {
    console.error('Auth middleware error:', error.message);
    res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
}

//* Middleware to check if user has admin privileges
async function checkAdmin(req, res, next) {
  try {
    // Get user ID from request object
    const userId = req.user?.id;

    // Return 401 if user ID is missing
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized, user not found' });
    }

    // Find user role in database
    const existingUser = await db.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });

    // Return 403 if user is not an admin
    if (!existingUser || existingUser.role !== 'ADMIN') {
      return res.status(403).json({ success: false, message: 'Forbidden, admin access required' });
    }

    // Proceed to next middleware or route handler
    next();
  } catch (error) {
    console.error('Check admin middleware error:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

export { authMiddleware, checkAdmin };
