// IMPORTS
import jwt from 'jsonwebtoken';
import { db } from '../libs/db.js';

// MIDDLEWARE FUNCTION TO AUTHENTICATE USER REQUESTS USING JWT
export const authMiddleware = async (req, res, next) => {
  try {
    // Extract the token from cookies
    const token = req.cookies.jwt;

    // If token is missing, return unauthorized response
    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized - User not found',
      });
    }

    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);

    // Find the user in the database using the decoded token's user ID
    const user = await db.user.findUnique({
      where: {
        id: decoded.id,
      },
      select: {
        id: true,
        image: true,
        name: true,
        email: true,
        role: true,
      },
    });

    // If user is not found, return unauthorized response
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized - User not found',
      });
    }

    // Attach user to request object and proceed to next middleware
    req.user = user;
    next();
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

// MIDDLEWARE FUNCTION TO CHECK IF USER IS AN ADMIN
export const checkAdmin = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });
    if (!user || user.role !== 'ADMIN') {
      return res.status(403).json({
        success: false,
        error: 'Forbidden - User is not an admin',
      });
    }
    next();
  } catch (error) {
    console.error('Error in checkAdmin middleware:', error.message);
    res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};
