require('dotenv').config();
const app = require('./app');
const connectDB = require('../src/config/db');

// Connect DB
connectDB();

// Start server
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});