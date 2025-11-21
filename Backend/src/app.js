
const userModel = require('./models/user');
const express = require('express');
const generateRouter = require('./routes/generate.route');

const app = express();
app.use(express.json());
app.use('/api/generate', generateRouter);

module.exports = app;





