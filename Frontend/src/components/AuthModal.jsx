import React, { useState } from 'react'
import '../styles/chat.css'

export default function AuthModal({ mode = 'signin', onClose, onSuccess }){
  const isSignup = mode === 'signup'
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e){
    e.preventDefault()
    setError('')
    if(!email || !password){
      setError('Email and password are required')
      return
    }
    if(isSignup && password !== password2){
      setError('Passwords do not match')
      return
    }
    // simulate success
    const payload = { name, email }
    if(onSuccess) onSuccess(mode, payload)
    onClose && onClose()
  }

  return (
    <div className="modal-overlay" onMouseDown={onClose}>
      <div className="modal" role="dialog" aria-modal="true" onMouseDown={e=>e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        <h3 className="modal-title">{isSignup ? 'Create account' : 'Sign in'}</h3>
        <form className="modal-form" onSubmit={handleSubmit}>
          {isSignup && (
            <label className="field">
              <span className="label">Name</span>
              <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your full name" />
            </label>
          )}
          <label className="field">
            <span className="label">Email</span>
            <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" />
          </label>
          <label className="field">
            <span className="label">Password</span>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" />
          </label>
          {isSignup && (
            <label className="field">
              <span className="label">Confirm password</span>
              <input type="password" value={password2} onChange={e=>setPassword2(e.target.value)} placeholder="Confirm password" />
            </label>
          )}
          {error && <div className="form-error">{error}</div>}
          <div className="modal-actions">
            <button type="button" className="btn ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn primary">{isSignup ? 'Create account' : 'Sign in'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}
