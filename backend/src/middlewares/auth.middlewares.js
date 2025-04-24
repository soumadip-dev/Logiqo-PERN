import jwt from 'jsonwebtoken';
import { db } from '../libs/db.js';

// Middleware function to authenticate user requests using JWT
export const authMiddleware = async (req, res, next) => {
  try {
    // Extract the token from cookies
    const token = req.cookies.jwt;

    // If token is missing, return unauthorized response
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized - No token found',
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
        message: 'Unauthorized - User not found',
      });
    }

    // Attach user to request object and proceed to next middleware
    req.user = user;
    next();
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};
