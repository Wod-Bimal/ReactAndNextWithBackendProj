"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast, ToastContainer } from 'react-toastify'

export default function Login(){
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const submit = async ()=>{
    try{
      const r = await fetch('/api/auth/login', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ username, password }) })
      const json = await r.json()
      if(r.ok && json.success){
        toast.success('Logged in')
        setTimeout(()=>router.push('/dashboard'),400)
      } else {
        toast.error(json.message || 'Invalid credentials')
      }
    }catch(e){ toast.error(e.message || 'Network error') }
  }

  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center p-6'>
      <div className='max-w-md w-full bg-white rounded-xl shadow p-6'>
        <div className='flex items-center gap-3 mb-4'>
          <img src='/linktree.svg' className='h-10' />
          <h2 className='text-xl font-semibold'>Welcome back</h2>
        </div>

        <label className='block text-sm text-gray-600'>Username</label>
        <input value={username} onChange={e=>setUsername(e.target.value)} className='w-full p-3 mb-3 border rounded' placeholder='Username' />

        <label className='block text-sm text-gray-600'>Password</label>
        <input value={password} onChange={e=>setPassword(e.target.value)} type='password' className='w-full p-3 mb-4 border rounded' placeholder='Password' />

        <button onClick={submit} className='w-full p-3 bg-purple-700 text-white rounded hover:bg-purple-800'>Log in</button>

        <div className='mt-4 text-center text-sm text-gray-600'>Don't have an account? <a href='/auth/register' className='text-purple-700 font-semibold'>Register</a></div>
      </div>
      <ToastContainer />
    </div>
  )
}
