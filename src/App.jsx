import React, { useState, useEffect } from 'react'
import ChatWidget from './components/ChatWidget'
import ChatWindow from './components/ChatWindow'
import LoginModal from './components/LoginModal'

export default function App(){
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')
  const [loggedIn, setLoggedIn] = useState(() => localStorage.getItem('hi_user') === 'true')
  const [userName, setUserName] = useState(() => localStorage.getItem('hi_user_name') || '')
  const [loginOpen, setLoginOpen] = useState(false)
  const [chatInMain, setChatInMain] = useState(false)
  const [chatOptionsOpen, setChatOptionsOpen] = useState(false)

  useEffect(()=>{
    // Apply only the `dark` class when theme is dark; remove otherwise
    if(theme === 'dark'){
      document.documentElement.classList.add('dark')
      document.body.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
      document.body.classList.remove('dark')
    }
    localStorage.setItem('theme', theme)
  },[theme])

  return (
    <div className={`min-h-screen transition-colors ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
      <header className="relative p-4 flex justify-between items-center">
        <h1 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>HaiIntel — Chat Widget Demo</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={()=> setTheme(theme === 'dark' ? 'light' : 'dark')}
            title={theme === 'dark' ? 'Switch to light' : 'Switch to dark'}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            className="w-9 h-9 flex items-center justify-center rounded-md border hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {theme === 'dark' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 2a.75.75 0 01.75.75V4a.75.75 0 01-1.5 0V2.75A.75.75 0 0110 2zM15.657 4.343a.75.75 0 011.06 1.06l-1.06 1.06a.75.75 0 11-1.06-1.06l1.06-1.06zM18 9.25a.75.75 0 010 1.5h-1.25a.75.75 0 010-1.5H18zM15.657 15.657a.75.75 0 01-1.06 1.06l-1.06-1.06a.75.75 0 011.06-1.06l1.06 1.06zM10 16a.75.75 0 01.75.75V18a.75.75 0 01-1.5 0v-1.25A.75.75 0 0110 16zM4.343 15.657a.75.75 0 011.06-1.06l1.06 1.06a.75.75 0 11-1.06 1.06l-1.06-1.06zM2 10.75a.75.75 0 010-1.5H3.25a.75.75 0 010 1.5H2zM4.343 4.343a.75.75 0 011.06-1.06l1.06 1.06A.75.75 0 016.464 5.4L5.403 4.34zM10 6.25a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.293 13.293A8 8 0 116.707 2.707a6 6 0 0010.586 10.586z" />
              </svg>
            )}
          </button>
          {!loggedIn ? (
            <button onClick={()=> setLoginOpen(true)} className="px-3 py-1 rounded-md border">Login</button>
          ) : (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div title={userName || 'User'} className="w-9 h-9 bg-gradient-to-br from-indigo-600 to-fuchsia-600 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">{(userName && userName[0]) ? userName[0].toUpperCase() : 'U'}</div>
                <div className="min-w-0">
                  <div className="text-sm font-medium text-gray-900 dark:text-white truncate">{userName || 'User'}</div>
                </div>
              </div>
              <button
                onClick={()=>{
                  setLoggedIn(false)
                  setUserName('')
                  localStorage.removeItem('hi_user')
                  localStorage.removeItem('hi_user_name')
                }}
                title="Logout"
                aria-label="Logout"
                className="w-9 h-9 flex items-center justify-center rounded-md border hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-700 dark:text-gray-200" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 4.5A1.5 1.5 0 014.5 3h7A1.5 1.5 0 0113 4.5V7a.5.5 0 01-1 0V4.5a.5.5 0 00-.5-.5h-7a.5.5 0 00-.5.5v11a.5.5 0 00.5.5h7a.5.5 0 00.5-.5V13a.5.5 0 011 0v1.5A1.5 1.5 0 0111.5 16h-7A1.5 1.5 0 013 14.5v-10z" clipRule="evenodd" />
                  <path d="M12.146 8.146a.5.5 0 01.708 0L15 10.293l-2.146 2.147a.5.5 0 11-.708-.708L13.793 11H7.5a.5.5 0 010-1h6.293l-1.647-1.646a.5.5 0 010-.708z" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Center header chat options toggle */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <button
              onClick={()=> setChatOptionsOpen(v=>!v)}
              title={chatOptionsOpen ? 'Close chat options' : 'Open chat options'}
              aria-label={chatOptionsOpen ? 'Close chat options' : 'Open chat options'}
              className={`w-10 h-10 rounded-full flex items-center justify-center border bg-white dark:bg-gray-900 shadow-sm transition-transform duration-200 ${chatOptionsOpen ? 'rotate-45' : 'hover:scale-105'}`}
            >
              {chatOptionsOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-700 dark:text-gray-200" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 16v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10" />
                </svg>
              )}
            </button>

            {chatOptionsOpen && (
              <div className="absolute left-1/2 top-12 -translate-x-1/2 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-lg p-3 mt-2 z-50 animate-fade-in">
                <div className="flex flex-col gap-2">
                  <button onClick={()=>{ setChatInMain(true); setChatOptionsOpen(false)}} className="text-left px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">Open AI page</button>
                  <button onClick={()=>{ /* start new chat */ localStorage.removeItem('hi_messages'); window.location.reload() }} className="text-left px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">Start new chat</button>
                  <button onClick={()=>{ localStorage.removeItem('hi_messages'); setChatOptionsOpen(false)}} className="text-left px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">Clear history</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="p-6">
        {!chatInMain ? (
          <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>This demo shows a floating chat widget visually aligned with HaiIntel's dark, minimal brand.</p>
        ) : (
          <div className="max-w-4xl mx-auto">
            <h2 className={`text-lg font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>HaiIntel — AI Page</h2>
            <ChatWindow theme={theme} inPage={true} onClose={()=> setChatInMain(false)} />
          </div>
        )}
      </main>

      {!chatInMain && <ChatWidget theme={theme} onOpenInMain={() => { setChatInMain(true); }} />}
      <LoginModal
        open={!loggedIn && loginOpen}
        onLogin={(username)=>{ setLoggedIn(true); setUserName(username); localStorage.setItem('hi_user','true'); localStorage.setItem('Admin', username) }}
        onClose={()=> setLoginOpen(false)}
      />
    </div>
  )
}
