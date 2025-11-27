import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import responses from '../data/responses.json'

function Bubble({from, children, streaming}){
  return (
    <div className={`max-w-[78%] mb-2 ${from==='user'?'self-end':'self-start'}`}>
      <div className={`p-3 rounded-xl ${from==='user' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100'}`}>
        {children}
        {streaming && <span className="ml-2 inline-block animate-pulse">▌</span>}
      </div>
    </div>
  )
}

export default function ChatWindow({ onClose, onFullToggle, full, theme, onOpenInMain, inPage = false }){
  const [messages, setMessages] = useState(()=> JSON.parse(localStorage.getItem('hi_messages') || '[]'))
  const [input, setInput] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [streaming, setStreaming] = useState(false)
  const elRef = useRef(null)

  useEffect(()=> localStorage.setItem('hi_messages', JSON.stringify(messages)),[messages])

  useEffect(()=> { if(elRef.current) elRef.current.scrollTop = elRef.current.scrollHeight },[messages])

  function pushUser(text){
    const userMsg = {id: Date.now(), from:'user', text}
    setMessages(m=>[...m, userMsg])
    setInput('')
    simulateAI(text)
  }

  function simulateAI(text){
    // pick a response inspired by content
    const match = responses.find(r=> text.toLowerCase().includes(r.match))
    const chosen = match || responses[Math.floor(Math.random()*responses.length)]
    // streaming effect
    setStreaming(true)
    const aiMsg = {id: Date.now()+1, from:'ai', text:''}
    setMessages(m=>[...m, aiMsg])

    let i=0
    const content = chosen.answer
    const interval = setInterval(()=>{
      i++
      setMessages(m=>{
        return m.map(msg=>{
          if(msg.id === aiMsg.id){
            return {...msg, text: content.slice(0,i)}
          }
          return msg
        })
      })
      if(i>=content.length){
        clearInterval(interval)
        setStreaming(false)
        setSuggestions(chosen.suggestions || [])
      }
    }, 20)
  }

  const containerBase = inPage ? 'w-full max-w-6xl mx-auto px-6' : 'w-[400px]'
  const containerSize = full && !inPage ? 'h-screen fixed bottom-0 right-0 rounded-none' : (!full && !inPage ? 'h-[520px]' : '');

  return (
    <motion.div initial={{scale:0.98, opacity:0}} animate={{scale:1, opacity:1}} className={`${containerBase} ${containerSize} bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg overflow-hidden`}>
      {inPage ? (
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 flex-nowrap">
          <div className="flex items-center gap-4 min-w-0">
            <button onClick={onClose} aria-label="Back" className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700 dark:text-gray-200" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L4.414 9H18a1 1 0 110 2H4.414l3.293 3.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
            </button>

            <div className="min-w-0">
              <div className="text-xl font-bold text-gray-900 dark:text-white truncate">HaiIntel Assistant</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 truncate">Ask about products, datasets, and insights</div>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button onClick={onClose} className="px-3 py-1 rounded border text-sm">Return to chat widget</button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-indigo-600 to-fuchsia-600 rounded-full flex items-center justify-center">H</div>
            <div>
              <div className="font-semibold">HaiIntel Assistant</div>
              <div className="text-xs text-gray-400">Ask about products, datasets, and insights</div>
            </div>
          </div>

          <div className="flex gap-2 items-center">
            <button
              onClick={onFullToggle}
              title="Toggle full"
              aria-label="Toggle full"
              className="w-9 h-9 flex items-center justify-center rounded border text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-700 dark:text-gray-200" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 3h6v2H5v4H3V3zM17 3v6h-2V5h-4V3h6zM3 17v-6h2v4h4v2H3zM17 17h-6v-2h4v-4h2v6z" />
              </svg>
              <span className="sr-only">Full</span>
            </button>

            {full && onOpenInMain && !inPage && (
              <button
                onClick={onOpenInMain}
                title="Open in page"
                aria-label="Open in page"
                className="w-9 h-9 flex items-center justify-center rounded border text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-700 dark:text-gray-200" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 3a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 11-2 0V5.414l-8.293 8.293a1 1 0 01-1.414-1.414L14.586 4H11a1 1 0 01-1-1z" />
                </svg>
                <span className="sr-only">Open in page</span>
              </button>
            )}

            <button
              onClick={onClose}
              title="Close"
              aria-label="Close"
              className="w-9 h-9 flex items-center justify-center rounded border text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-700 dark:text-gray-200" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <span className="sr-only">Close</span>
            </button>
          </div>
        </div>
      )}

      <div ref={elRef} className="p-4 flex-1 overflow-auto" style={{height: full ? (inPage ? 'calc(100vh - 140px)' : 'calc(100vh - 140px)') : (inPage ? '480px' : '380px'), background: theme === 'dark' ? 'linear-gradient(180deg, rgba(255,255,255,0.02), transparent)' : 'linear-gradient(180deg, rgba(0,0,0,0.02), transparent)'}}>
        <div className="flex flex-col">
          {messages.map(m=> <Bubble key={m.id} from={m.from} streaming={streaming && m.from==='ai'}>{m.text}</Bubble>)}
        </div>
      </div>

      <div className="p-3 border-t border-gray-800">
        <div className="flex gap-2">
          <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{ if(e.key==='Enter' && input.trim()) pushUser(input.trim())}} placeholder="Type your message..." className="flex-1 p-2 rounded bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100" />
          <button onClick={()=> input.trim() && pushUser(input.trim())} className="px-3 py-2 rounded bg-indigo-600 text-white">Send</button>
        </div>

        <div className="mt-3 flex gap-2 flex-wrap">
          {suggestions.map((s,i)=>
            <button key={i} onClick={()=> pushUser(s)} className="text-xs px-2 py-1 rounded border bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700">{s}</button>
          )}
        </div>
      </div>
    </motion.div>
  )
}
