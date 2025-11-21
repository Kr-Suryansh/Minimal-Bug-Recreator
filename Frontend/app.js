import axios from 'axios';

// Run when DOM is ready to avoid null element references
document.addEventListener('DOMContentLoaded', () => {
  const API_URL = document.querySelector('meta[name="api-url"]')?.content || 'http://localhost:5000';
  const output = document.getElementById('output');
  const pingBtn = document.getElementById('ping');

  async function pingBackend() {
    try {
      // GET /api/test  -> backend must expose GET /api/test
      const res = await axios.get(`${API_URL}/api/test`);
      if (output) output.innerText = JSON.stringify(res.data, null, 2);
    } catch (err) {
      handleAxiosError(err);
    }
  }

  async function createBug(payload) {
    try {
      const res = await axios.post(`${API_URL}/api/bugs`, payload);
      return res.data;
    } catch (err) {
      handleAxiosError(err);
      throw err;
    }
  }

  function handleAxiosError(err) {
    if (err.response) {
      // server returned a status code outside 2xx
      console.error('Server responded', err.response.status, err.response.data);
      if (output) output.innerText = `Error ${err.response.status}: ${JSON.stringify(err.response.data)}`;
    } else if (err.request) {
      console.error('No response received', err.request);
      if (output) output.innerText = 'No response from server. Is backend running?';
    } else {
      console.error('Axios error', err.message);
      if (output) output.innerText = `Error: ${err.message}`;
    }
  }

  if (pingBtn) {
    pingBtn.addEventListener('click', () => pingBackend());
  } else {
    console.warn('Ping button (`#ping`) not found in DOM — skipping event hookup.');
  }

  // Example usage exposed globally if other scripts need it
  window.createBug = createBug;
});
