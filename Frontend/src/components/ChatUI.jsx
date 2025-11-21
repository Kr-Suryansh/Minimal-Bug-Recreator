import React, { useState, useRef, useEffect } from 'react'
import '../styles/chat.css'
import AuthModal from './AuthModal'

export default function ChatUI() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const [sending, setSending] = useState(false)
  const [isComposing, setIsComposing] = useState(false)
  const listRef = useRef(null)
  const [authOpen, setAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState('signin') // 'signin' or 'create'
  const fileInputRef = useRef(null)
  const zipInputRef = useRef(null)
  const folderInputRef = useRef(null)

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
    setIsComposing(false)
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

  function handleFiles(files){
    if (!files || files.length === 0) return
    const list = Array.from(files)
    // add each file as a message (for images, include preview)
    const items = list.map(f => {
      if (f.type.startsWith('image/')){
        return { id: Date.now()+Math.random(), image: URL.createObjectURL(f), name: f.name }
      }
      return { id: Date.now()+Math.random(), file: true, name: f.name }
    })
    setMessages(prev => [...prev, ...items])
  }

  function onSelectFiles(e){
    handleFiles(e.target.files)
    e.target.value = null
  }

  function onSelectZip(e){
    handleFiles(e.target.files)
    e.target.value = null
  }

  function onSelectFolder(e){
    handleFiles(e.target.files)
    e.target.value = null
  }

  return (
    <div className={`chat-shell ${isComposing || messages.length === 0 ? 'composing' : 'viewing'}`}>
      <div className="chat-header" style={{opacity: isComposing ? 0 : 1, pointerEvents: isComposing ? 'none' : 'auto', transition: 'opacity 400ms ease'}}>
        <div className="chat-title">
          <h1>Minimal Bug Reproducer</h1>
        </div>

        <div className="auth-btns">
          <button className="auth-btn" onClick={() => { setAuthMode('signin'); setAuthOpen(true)}}><span>Sign In</span></button>
          <button className="auth-btn" onClick={() => { setAuthMode('create'); setAuthOpen(true)}}><span>Create Account</span></button>
        </div>
      </div>

      {authOpen && (
        <AuthModal mode={authMode} onClose={() => setAuthOpen(false)} />
      )}

      <div className="messages" ref={listRef}>
        {messages.length === 0 ? (
          <div className="empty">Start by typing a description below and press Send.</div>
        ) : (
          messages.map(m => (
            <div key={m.id} className="message from-user">
              <div className="bubble">
                {m.image ? (
                  <div className="file-attach">
                    <img src={m.image} alt={m.name} className="attach-thumb" />
                    <div className="attach-name">{m.name}</div>
                  </div>
                ) : m.file ? (
                  <div className="file-attach">
                    <div className="attach-icon">📄</div>
                    <div className="attach-name">{m.name}</div>
                  </div>
                ) : (
                  m.text
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="composer">
        <div className="composer-left">
          <button className="attach-btn" title="Upload ZIP file" onClick={() => zipInputRef.current && zipInputRef.current.click()}>
            📦
          </button>
          <button className="attach-btn" title="Upload files" onClick={() => fileInputRef.current && fileInputRef.current.click()}>
            📎
          </button>
          <button className="attach-btn" title="Upload folder" onClick={() => folderInputRef.current && folderInputRef.current.click()}>
            📁
          </button>
          <input ref={fileInputRef} type="file" multiple style={{display:'none'}} onChange={onSelectFiles} />
          <input ref={zipInputRef} type="file" accept=".zip,application/zip,application/x-zip,application/x-zip-compressed" style={{display:'none'}} onChange={onSelectZip} />
          {/* webkitdirectory allows folder selection in Chromium-based browsers */}
          <input ref={folderInputRef} type="file" webkitdirectory="" directory="" multiple style={{display:'none'}} onChange={onSelectFolder} />
        </div>
        <div className="composer-inner">
        <textarea
          className="composer-input"
          placeholder="Describe the minimal steps or paste a stack trace..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsComposing(true)}
          onBlur={() => !input.trim() && setIsComposing(false)}
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
    </div>
  )
}
