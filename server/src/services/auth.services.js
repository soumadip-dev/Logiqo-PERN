import { db } from '../config/db.config';
import { ENV } from '../config/env.config';
import { isStrongPassword, isValidEmail } from '../utils/validation.utils';
import bcrypt from 'bcryptjs';
import { UserRole } from '../generated/prisma/index.js';
import jwt from 'jsonwebtoken';

//* Service for registering a user
async function registerService(userName, userEmail, userPassword) {
  // Validate required fields
  if (!userName || !userEmail || !userPassword) {
    throw new Error('All fields are required');
  }

  // Convert email to lowercase
  const normalizedEmail = userEmail.toLowerCase();

  // Validate email format
  if (!isValidEmail(normalizedEmail)) {
    throw new Error('Email is not valid');
  }

  // Validate password strength
  if (!isStrongPassword(userPassword)) {
    throw new Error('Password is not strong enough');
  }

  // Check if user already exists
  const existingUser = await db.user.findUnique({
    where: { email: normalizedEmail },
  });
  if (existingUser) {
    throw new Error('User already exists');
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(userPassword, 10);

  // Create new user in the database
  const createdUser = await db.user.create({
    data: {
      name: userName,
      email: normalizedEmail,
      password: hashedPassword,
      role: UserRole.USER,
    },
  });

  // Generate JWT token
  const authToken = jwt.sign({ id: createdUser.id }, ENV.JWT_SECRET, {
    expiresIn: ENV.JWT_TOKEN_EXPIRY,
  });

  // Return created user and token
  return { createdUser, authToken };
}

export { registerService };
