//* Controller for registering a user
async function registerUser(req, res) {
  // Get data from body
  const { name, email, password } = req.body;
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
