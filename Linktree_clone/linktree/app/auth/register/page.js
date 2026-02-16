"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast, ToastContainer } from 'react-toastify'

export default function Register(){
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [profilePicture, setProfilePicture] = useState('')
  const router = useRouter()

  const submit = async ()=>{
    try{
      const r = await fetch('/api/auth/signup', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ name, username, phone, password, profilePicture }) })
      const json = await r.json()
      if(r.ok && json.success){
        toast.success('Registered — please login')
        setTimeout(()=>router.push('/auth/login'),800)
      } else {
        toast.error(json.message || 'Failed')
      }
    }catch(e){ toast.error(e.message || 'Network error') }
  }

  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center p-6'>
      <div className='max-w-3xl w-full grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='hidden md:flex flex-col items-center justify-center rounded-xl bg-gradient-to-br from-purple-700 to-indigo-600 text-white p-8'>
          <img src='/linktree.svg' alt='logo' className='h-12 mb-4' />
          <h2 className='text-2xl font-bold'>Create your Bytetree</h2>
          <p className='mt-3 text-sm text-purple-100'>Join to manage your links and analytics. Add a profile photo URL to show on your dashboard.</p>
          <div className='mt-6 w-40 h-40 rounded-full overflow-hidden bg-white/10 flex items-center justify-center'>
            {profilePicture ? <img src={profilePicture} alt='preview' className='w-full h-full object-cover' /> : <div className='text-sm'>Preview</div>}
          </div>
        </div>

        <div className='bg-white rounded-xl shadow p-6'>
          <h2 className='text-xl font-bold mb-4'>Create account</h2>
          <label className='block text-sm text-gray-600'>Name</label>
          <input value={name} onChange={e=>setName(e.target.value)} className='w-full p-3 mb-3 border rounded' placeholder='Your full name' />

          <label className='block text-sm text-gray-600'>Username</label>
          <input value={username} onChange={e=>setUsername(e.target.value)} className='w-full p-3 mb-3 border rounded' placeholder='Choose a username' />

          <label className='block text-sm text-gray-600'>Phone</label>
          <input value={phone} onChange={e=>setPhone(e.target.value)} className='w-full p-3 mb-3 border rounded' placeholder='Phone number (optional)' />

          <label className='block text-sm text-gray-600'>Profile picture URL</label>
          <input value={profilePicture} onChange={e=>setProfilePicture(e.target.value)} className='w-full p-3 mb-3 border rounded' placeholder='https://...' />

          <label className='block text-sm text-gray-600'>Password</label>
          <input value={password} onChange={e=>setPassword(e.target.value)} type='password' className='w-full p-3 mb-4 border rounded' placeholder='Create a password' />

          <button onClick={submit} className='w-full p-3 bg-purple-700 text-white rounded hover:bg-purple-800'>Create account</button>

          <div className='mt-4 text-center text-sm text-gray-600'>Already have an account? <a href='/auth/login' className='text-purple-700 font-semibold'>Log in</a></div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}
