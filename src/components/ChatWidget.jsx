import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ChatWindow from './ChatWindow'

export default function ChatWidget({ theme, onOpenInMain, disableWidget }){
  const [open, setOpen] = useState(()=> JSON.parse(localStorage.getItem('hi_widget_open') || 'false'))
  const [full, setFull] = useState(false)

  useEffect(()=> localStorage.setItem('hi_widget_open', JSON.stringify(open)),[open])

  return (
    <>
      <div className="fixed right-6 bottom-6 z-50 flex flex-col items-end gap-3">
        <AnimatePresence>
        {open ? (
          <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} exit={{opacity:0, y:20}} className="shadow-2xl">
            <ChatWindow theme={theme} onClose={()=>setOpen(false)} onFullToggle={()=>setFull(v=>!v)} full={full} onOpenInMain={onOpenInMain} />
          </motion.div>
        ) : null}
        </AnimatePresence>

        {!disableWidget && (
        <button
          aria-label="Open chat"
          onClick={()=> setOpen(true)}
          className="w-14 h-14 rounded-full flex items-center justify-center shadow-xl border"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        )}
      </div>
    </>
  )
}
