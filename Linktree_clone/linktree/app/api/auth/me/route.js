import { NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'
import clientPromise from '@/lib/mongodb'

export async function GET(request){
  try{
    const cookie = request.cookies.get('token')?.value
    if(!cookie) return NextResponse.json({ success:false, user: null }, { status:200 })
    const payload = verifyToken(cookie)
    if(!payload) return NextResponse.json({ success:false, user: null }, { status:200 })

    const client = await clientPromise
    const db = client.db('bytetree')
    const users = db.collection('users')
    const user = await users.findOne({ _id: new (await import('mongodb')).ObjectId(payload.id) }, { projection: { password:0 } })

    return NextResponse.json({ success:true, user })
  }catch(err){
    return NextResponse.json({ success:false, message: err?.message || 'Server error' }, { status:500 })
  }
}
