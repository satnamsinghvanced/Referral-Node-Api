require('dotenv').config();
const app = require('./app');
const connectDB = require('../src/config/db');


connectDB();

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});