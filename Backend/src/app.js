const express = require('express');
const cors = require('cors');
const User = require('./models/user');
const API_URL = document.querySelector('meta[name="api-url"]').content;
const output = document.getElementById('output');
const pingBtn = document.getElementById('ping-btn');

async function pingBackend() {
  try{
    const res = await axios.get(`${API_URL}/`);
output.innerText = JSON.stringify(res.data, null, 2);}
catch(err){
  handleAxiosError(err);
}
}

async function createBug(payload){
  try{
    const res = await axios.post(`${API_URL}/bugs`, payload);
    return res.data;
  }catch(err){
    handleAxiosError(err);
    throw err;
  }
}

function handleAxiosError(err) {
  if (err.response) {
    // server returned a status code outside 2xx
    console.error('Server responded', err.response.status, err.response.data);
    output.innerText = `Error ${err.response.status}: ${JSON.stringify(err.response.data)}`;
  } else if (err.request) {
    console.error('No response received', err.request);
    output.innerText = 'No response from server. Is backend running?';
  } else {
    console.error('Axios error', err.message);
    output.innerText = `Error: ${err.message}`;
  }
}

pingBtn.addEventListener('click', () => pingBackend());

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/test', (req, res) => {
  res.json({message: "Backend connected successfully!"});
});

// CREATE ACCOUNT
app.post('/api/register', async (req, res) => {
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
