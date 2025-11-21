// Backend/src/app.js
const express = require('express');
const cors = require('cors');

let User = null;
try {
  // try to load the User model if it exists
  User = require('./models/user');
} catch (err) {
  // If the model doesn't exist or can't be loaded, keep app functional.
  // This is helpful during early dev before DB/models are wired.
  console.warn('Warning: ./models/user not found or failed to load. Auth routes will return placeholders until model/DB are available.');
}

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Health / root route
app.get('/', (req, res) => {
  res.json({ message: 'Backend connected successfully!' });
});

// API test route (used by frontend example)
app.get('/api/test', (req, res) => {
  res.json({ message: 'Hello from backend!' });
});

/**
 * CREATE ACCOUNT
 * POST /register
 * Body: { username, email, password }
 */
app.post('/register', async (req, res) => {
  if (!User) {
    return res.status(501).json({ message: 'User model not available. Enable DB/models to use this route.' });
  }

  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'username, email and password are required.' });
  }

  try {
    const already = await User.findOne({ email });
    if (already) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const user = await User.create({ username, email, password });
    // Do not return password in response
    const userSafe = { id: user._id, username: user.username, email: user.email };

    return res.status(201).json({ message: 'User created', user: userSafe });
  } catch (err) {
    console.error('Error in /register:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

/**
 * LOGIN
 * POST /login
 * Body: { email, password }
 */
app.post('/login', async (req, res) => {
  if (!User) {
    return res.status(501).json({ message: 'User model not available. Enable DB/models to use this route.' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'email and password are required.' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // NOTE: This example compares raw passwords. In production you MUST hash passwords.
    if (user.password !== password) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    const userSafe = { id: user._id, username: user.username, email: user.email };
    return res.json({ message: 'Login success', user: userSafe });
  } catch (err) {
    console.error('Error in /login:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Export the app WITHOUT listening here.
// server.js should require this file and call app.listen(...)
module.exports = app;
