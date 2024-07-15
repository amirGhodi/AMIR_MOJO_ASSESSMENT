const app = require('./app');
const https = require('https');
const sslConfig = require('./config/ssl');
const dotenv = require("dotenv");

dotenv.config();

const backendURL = process.env.BACKEND_URL || 'https://localhost:5000';
const PORT = process.env.PORT || 5000;

https.createServer(sslConfig, app).listen(PORT, () => {
  console.log(`Server running on ${backendURL}`);
});


module.exports = app;