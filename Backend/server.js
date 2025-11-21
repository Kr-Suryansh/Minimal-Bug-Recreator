
const express = require('express');
const cors = require('cors');
const app = require('.src/app.js');
const port = 3000;
const path = require('path');
const staticPath = path.join(__dirname, '..', 'Frontend');
app.use(require('express').static(staticPath));
app.get('*', (req, res) => {
  res.sendFile(path.join(staticPath, 'index.html'));
});
app.use(cors());
app.use(express.json());


app.get('*', (req, res) => {
  res.sendFile(path.join(staticPath, 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});