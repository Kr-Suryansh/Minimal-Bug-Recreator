const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const bcrypt = require('bcryptjs');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const User = require('./models/user');

const app = express();

app.use(cors());
app.use(express.json());

// CREATE ACCOUNT
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  const already = await User.findOne({ email });
  if (already) return res.json({ message: "User already exists" });

  const hash = await bcrypt.hash(password, 10);

  const user = await User.create({ username, email, password: hash });

  res.json({ message: "User created", user });
});

// LOGIN
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return res.json({ message: "Incorrect password" });

  res.json({ message: "Login success", user });
});

// Add your other routes (e.g., `/api/generate`) here

app.listen(3000, () => {
  console.log("Server running on port 3000");
});


