import React, { useState, useRef, useEffect } from 'react'
import '../styles/chat.css'
import AuthModal from './AuthModal'

export default function ChatUI() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const [sending, setSending] = useState(false)
  const listRef = useRef(null)
  const [authMode, setAuthMode] = useState(null) // 'signin' | 'signup' | null

  useEffect(() => {
    // scroll to bottom when messages change
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight
    }
  }, [messages])

  function handleSend() {
    const text = input.trim()
    if (!text) return
    setSending(true)
    // simulate quick send
    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now(), text }])
      setInput('')
      setSending(false)
    }, 220)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  function addSystemMessage(text){
    setMessages(prev => [...prev, { id: Date.now(), text, system:true }])
  }

  function openAuth(mode){
    setAuthMode(mode)
  }

  function handleAuthSuccess(mode, payload){
    // payload contains user info (name/email); just show a system message
    addSystemMessage(mode === 'signin' ? `Signed in as ${payload.email}` : `Account created: ${payload.name || payload.email}`)
    setAuthMode(null)
  }

  return (
    <div className="chat-shell">
      <div className="chat-header row-between">
        <div>
          <h1>Minimal Bug Reproducer</h1>
          <p className="muted">Open innovation • Dark theme demo</p>
        </div>
        <div className="auth-controls">
          <button className="btn ghost" onClick={()=>openAuth('signin')}>Sign in</button>
          <button className="btn primary" onClick={()=>openAuth('signup')}>Create account</button>
        </div>
      </div>

      <div className="messages" ref={listRef}>
        {messages.length === 0 ? (
          <div className="empty">Start by typing a description below and press Send.</div>
        ) : (
          messages.map(m => (
            <div key={m.id} className="message from-user">
              <div className="bubble">{m.text}</div>
            </div>
          ))
        )}
      </div>

      <div className="composer">
        <textarea
          className="composer-input"
          placeholder="Describe the minimal steps or paste a stack trace..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
        />

        <button
          className={`send-btn ${sending ? 'sending' : ''}`}
          onClick={handleSend}
          aria-label="Send"
        >
          <span className="send-icon">➤</span>
        </button>
      </div>
      {authMode && (
        <AuthModal mode={authMode} onClose={()=>setAuthMode(null)} onSuccess={handleAuthSuccess} />
      )}
    </div>
  )
}
