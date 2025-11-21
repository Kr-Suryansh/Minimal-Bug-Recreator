const express = require('express');
const cors = require('cors');
const User = require('./models/user');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({message: "Backend connected successfully!"});
});

// CREATE ACCOUNT
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  const already = await User.findOne({ email });
  if (already) return res.json({ message: "User already exists" });

  const user = await User.create({ username, email, password });

  res.json({ message: "User created", user });
});

// LOGIN
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.json({ message: "User not found" });

  if (user.password !== password)
    return res.json({ message: "Incorrect password" });

  res.json({ message: "Login success", user });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

module.exports = app;
