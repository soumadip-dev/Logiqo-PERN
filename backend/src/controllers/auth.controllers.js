// IMPORTING MODULES
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserRole } from '../generated/prisma/index.js';
import { db } from '../libs/db.js';

// CONTROLLER FOR REGISTER USER
const registerUser = async (req, res) => {
  try {
    // Get data from body
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if user already exists in the database
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({
        error: 'User already exists with this email',
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user in the database
    const newUser = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: UserRole.USER,
      },
    });

    // Generate JWT token
    const token = jwt.sign({ id: newUser.id }, process.env.JWT_TOKEN_SECRET, {
      expiresIn: process.env.JWT_TOKEN_EXPIRY,
    });

    // Set the JWT token as a cookie
    res.cookie('jwt', token, {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV !== 'development',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });

    // Return a success response
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
        image: newUser.image,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    res
      .status(500)
      .json({ error: 'Something went wrong. Please try again later.' });
  }
};

// CONTROLLER FOR LOGIN USER
const loginUser = async (req, res) => {};

// CONTROLLER FOR LOGOUT USER
const logoutUser = async (req, res) => {};

// CONTROLLER FOR PROFILE
const userProfile = async (req, res) => {};

// EXPORTING CONTROLLERS
export { loginUser, logoutUser, registerUser, userProfile };
