import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)

// Debug helper: update the banner in index.html to indicate JS is running and React mounted.
try {
  const banner = document.getElementById('debug-banner')
  if (banner) {
    banner.textContent = 'React mounted — client JS running'
    banner.style.background = '#042024'
    banner.style.color = '#7ef2c6'
  }
} catch (e) {
  // ignore in non-browser envs
}
