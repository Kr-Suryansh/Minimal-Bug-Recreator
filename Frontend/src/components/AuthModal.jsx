import React, { useState } from 'react'
import '../styles/chat.css'

export default function AuthModal({ mode = 'signin', onClose }){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleSubmit(e){
    e.preventDefault()
    setError('')
    if (!email || !password || (mode==='create' && !name)){
      setError('Please fill all required fields')
      return
    }
    if (mode === 'create' && password !== confirm){
      setError('Passwords do not match')
      return
    }
    setLoading(true)
    // simulate submission
    setTimeout(()=>{
      setLoading(false)
      // just close for now
      onClose && onClose()
    }, 800)
  }

  return (
    <div className="modal-overlay" onMouseDown={onClose}>
      <div className="modal" onMouseDown={e => e.stopPropagation()} role="dialog" aria-modal="true">
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        <h2 className="modal-title">{mode === 'signin' ? 'Sign In' : 'Create Account'}</h2>
        <p className="modal-sub">{mode==='signin' ? 'Welcome back — sign in to continue' : 'Create your account to save reports'}</p>
        <form className="modal-form" onSubmit={handleSubmit}>
          {mode === 'create' && (
            <label className="form-row">
              <span>Name</span>
              <input value={name} onChange={e=>setName(e.target.value)} placeholder="Full name" required />
            </label>
          )}

          <label className="form-row">
            <span>Email</span>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@company.com" required />
          </label>

          <label className="form-row">
            <span>Password</span>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" required />
          </label>

          {mode==='create' && (
            <label className="form-row">
              <span>Confirm</span>
              <input type="password" value={confirm} onChange={e=>setConfirm(e.target.value)} placeholder="Confirm password" required />
            </label>
          )}

          {error && <div className="form-error">{error}</div>}

          <div className="form-actions">
            <button type="submit" className={`primary ${loading ? 'loading' : ''}`}>{loading ? 'Working…' : (mode==='signin' ? 'Sign In' : 'Create Account')}</button>
            <button type="button" className="ghost" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}
