const express = require('express');
const router = require('../src/api/routes')

const app = express();

app.use(express.json());
app.use(router);
module.exports = app;
