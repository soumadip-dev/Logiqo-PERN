// IMPORTING MODULES
import dotenv from 'dotenv';
import app from './app.js';

// CONFIGURE DOTENV TO LOAD ENVIRONMENT VARIABLES
dotenv.config({
  path: './.env',
});

// SET THE PORT FOR THE SERVER
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
