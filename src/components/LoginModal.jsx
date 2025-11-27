import React, { useState } from 'react'

export default function LoginModal({ open = false, onLogin, onClose }){
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [err, setErr] = useState('')
  function tryLogin(){
    if(user==='admin' && pass==='admin@123'){
      setErr('')
      onLogin && onLogin(user)
      onClose && onClose()
    } else {
      setErr('Invalid credentials')
    }
  }

  if(!open) return null
  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center" role="dialog" aria-modal="true" aria-labelledby="login-title">
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="relative bg-white dark:bg-gray-900 p-6 md:p-8 rounded shadow-lg w-96 z-10 border border-gray-200 dark:border-gray-700">
        <button
          onClick={()=>onClose && onClose()}
          aria-label="Close login"
          title="Close"
          className="absolute top-3 right-3 p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-700 dark:text-gray-200" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>

        <h3 id="login-title" className="text-lg font-semibold mb-3">Login</h3>
        <input value={user} onChange={e=>setUser(e.target.value)} placeholder="Username" className="w-full mb-3 p-2 border rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800" />
        <input value={pass} onChange={e=>setPass(e.target.value)} placeholder="Password" type="password" className="w-full mb-3 p-2 border rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800" />
        {err && <div className="text-red-500 mb-3">{err}</div>}
        <div className="flex justify-end gap-2">
          <button onClick={()=>onClose && onClose()} className="px-3 py-1 border rounded">Cancel</button>
          <button onClick={tryLogin} className="px-3 py-1 bg-indigo-600 rounded text-white">Login</button>
        </div>
      </div>
    </div>
  )
}
