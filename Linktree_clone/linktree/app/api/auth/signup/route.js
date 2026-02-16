import clientPromise from '@/lib/mongodb'
import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'

export async function POST(request){
  try{
    const body = await request.json()
    const { name, username, phone, password, profilePicture } = body
    if(!username || !password) return NextResponse.json({ success:false, message:'Missing fields' }, { status:400 })

    const client = await clientPromise
    const db = client.db('bytetree')
    const users = db.collection('users')

    const exists = await users.findOne({ username })
    if(exists) return NextResponse.json({ success:false, message:'Username already taken' }, { status:409 })

    const hash = await bcrypt.hash(password, 10)
    const userDoc = { name, username, phone, profilePicture: profilePicture || null, password: hash, createdAt: new Date() }
    const res = await users.insertOne(userDoc)

    return NextResponse.json({ success:true, message:'User created', result: { id: res.insertedId } })
  }catch(err){
    return NextResponse.json({ success:false, message: err?.message || 'Server error' }, { status:500 })
  }
}
