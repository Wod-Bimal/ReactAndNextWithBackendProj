import clientPromise from "@/lib/mongodb";
import { NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'
import { ObjectId } from 'mongodb'

export async function POST(request) {
    try {
        const body = await request.json()

        if (!body?.handle) {
            return NextResponse.json({ success: false, error: true, message: 'Missing handle' }, { status: 400 })
        }

        // attach current user if available
        const token = request.cookies.get('token')?.value
        const payload = token ? verifyToken(token) : null
        const createdBy = payload?.id ? new ObjectId(payload.id) : null

        const client = await clientPromise
        const db = client.db('bytetree')
        const collection = db.collection('links')

        const doc = await collection.findOne({ handle: body.handle })
        if (doc) {
            return NextResponse.json({ success: false, error: true, message: 'This handle already exists', result: null }, { status: 409 })
        }

        const toInsert = { ...body, createdBy, createdAt: new Date() }
        const result = await collection.insertOne(toInsert)

        return NextResponse.json({ success: true, error: false, message: 'Your links were successfully added.', result })
    } catch (err) {
        return NextResponse.json({ success: false, error: true, message: err?.message || 'Server error' }, { status: 500 })
    }
}