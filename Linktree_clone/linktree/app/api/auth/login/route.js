import clientPromise from '@/lib/mongodb'
import bcrypt from 'bcryptjs'
import { signToken } from '@/lib/auth'
import { NextResponse } from 'next/server'

export async function POST(request){
  try{
    const body = await request.json()
    const { username, password } = body
    if(!username || !password) return NextResponse.json({ success:false, message:'Missing fields' }, { status:400 })

    const client = await clientPromise
    const db = client.db('bytetree')
    const users = db.collection('users')

    const user = await users.findOne({ username })
    if(!user) return NextResponse.json({ success:false, message:'Invalid credentials' }, { status:401 })

    const ok = await bcrypt.compare(password, user.password)
    if(!ok) return NextResponse.json({ success:false, message:'Invalid credentials' }, { status:401 })

    const token = signToken({ id: user._id.toString(), username: user.username })
    const res = NextResponse.json({ success:true, message:'Logged in' })
    res.cookies.set('token', token, { httpOnly: true, path: '/', maxAge: 60 * 60 * 24 * 7 })
    return res
  }catch(err){
    return NextResponse.json({ success:false, message: err?.message || 'Server error' }, { status:500 })
  }
}
