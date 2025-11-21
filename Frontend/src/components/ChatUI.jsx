import React, { useState, useRef, useEffect } from 'react'
import '../styles/chat.css'

export default function ChatUI() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const [sending, setSending] = useState(false)
  const listRef = useRef(null)

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

  return (
    <div className="chat-shell">
      <div className="chat-header">
        <h1>Minimal Bug Reproducer</h1>
        <p className="muted">Open innovation • Dark theme demo</p>
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
    </div>
  )
}
