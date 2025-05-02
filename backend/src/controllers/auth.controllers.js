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
      return res
        .status(400)
        .json({ success: false, error: 'All fields are required' });
    }

    // Check if user already exists in the database
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
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
      success: true,
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
    res.status(500).json({
      success: false,
      error: 'Something went wrong. Please try again later.',
    });
  }
};

// CONTROLLER FOR LOGIN USER
const loginUser = async (req, res) => {
  try {
    // Get user credentials from request body
    const { email, password } = req.body;

    // Validate if email and password exist
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, error: 'All fields are required' });
    }

    // Find user based on email
    const user = await db.user.findUnique({
      where: { email },
    });

    // If user not found, return error
    if (!user) {
      return res.status(400).json({ success: false, error: 'User not found' });
    }

    // Compare password with hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If password is invalid, return error
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, error: 'Invalid Credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_TOKEN_SECRET, {
      expiresIn: process.env.JWT_TOKEN_EXPIRY,
    });

    // Store JWT token in cookie
    res.cookie('jwt', token, {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV !== 'development',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });

    // Send success response to user
    res.status(200).json({
      success: true,
      message: 'User logged in successfully',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        image: user.image,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      error: 'Something went wrong. Please try again later.',
    });
  }
};

// CONTROLLER FOR LOGOUT USER
const logoutUser = async (req, res) => {
  try {
    // Clear the cookie
    res.clearCookie('jwt', {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV !== 'development',
    });

    // Send success response to user
    res
      .status(200)
      .json({ success: true, message: 'User logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      error: 'Something went wrong. Please try again later.',
    });
  }
};

// CONTROLLER FOR PROFILE
const userProfile = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user,
      message: 'User profile fetched successfully',
    });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({
      success: false,
      error: 'Something went wrong. Please try again later.',
    });
  }
};

// EXPORTING CONTROLLERS
export { loginUser, logoutUser, registerUser, userProfile };
