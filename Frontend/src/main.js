import './index.css';

const root = document.getElementById('root');

root.innerHTML = `
  <header class="card">
    <img src="/logo.svg" class="logo react" alt="logo" />
    <h1>MRE Generator — Frontend (vanilla)</h1>
  </header>

  <main>
    <section class="card">
      <label>Paste stack trace / error</label>
      <textarea id="errorText" rows="6" style="width:100%; padding:8px; margin-top:8px;"></textarea>
    </section>

    <section class="card" style="margin-top:1rem;">
      <label>Description (what you expect)</label>
      <textarea id="description" rows="4" style="width:100%; padding:8px; margin-top:8px;"></textarea>
    </section>

    <section class="card" style="margin-top:1rem;">
      <label>Code snippet (optional)</label>
      <textarea id="code" rows="8" style="width:100%; padding:8px; margin-top:8px;">// optional code snippet</textarea>
    </section>

    <div style="margin-top:1rem;">
      <button id="generateBtn" style="padding:.6rem 1rem; background:var(--accent); color:#fff; border:none; border-radius:6px;">Generate MRE</button>
    </div>

    <footer style="margin-top:2rem;">
      <p class="read-the-docs">Built with ❤️ — vanilla</p>
    </footer>
  </main>
`;

document.getElementById('generateBtn').addEventListener('click', async () => {
  const payload = {
    errorText: document.getElementById('errorText').value,
    description: document.getElementById('description').value,
    code: document.getElementById('code').value
  };

  // Example: POST to backend (uncomment when backend ready)
  // try {
  //   const res = await fetch(import.meta.env.VITE_API_BASE + '/generate', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(payload)
  //   });
  //   const data = await res.json();
  //   console.log('Generated result:', data);
  // } catch (err) {
  //   console.error(err);
  // }
  console.log('Payload:', payload);
});
