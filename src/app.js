const express = require('express');
const router = require('../src/api/routes')
const cors = require("cors"); 
const app = express();


app.use(
  cors({
    origin: "*", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(router);
module.exports = app;
