import { ENV } from '../config/env.config';
import { registerService } from '../services/auth.services';

// Controller to handle user registration
async function registerUser(req, res) {
  // Extract user details from request body
  const { name, email, password } = req.body;

  try {
    // Call service to register user
    const { createdUser, authToken } = await registerService(name, email, password);

    // Set JWT token in HTTP-only cookie
    const cookieOptions = {
      httpOnly: true,
      sameSite: ENV.NODE_ENV === 'production' ? 'none' : 'strict',
      secure: ENV.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    };
    res.cookie('authToken', authToken, cookieOptions);

    // Send successful response
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: {
        id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
        role: createdUser.role,
        image: createdUser.image,
      },
    });
  } catch (error) {
    // Handle errors
    res.status(400).json({
      success: false,
      message: error.message || 'Something went wrong',
    });
  }
}

//* Controller for logging in a user
async function loginUser(req, res) {
  // Get user credentials from request body
  const { email, password } = req.body;
}

//* Controller for logout
async function logoutUser(req, res) {}

//* Controller for getting user profile
async function userProfile(req, res) {}

export { registerUser, loginUser, logoutUser, userProfile };
