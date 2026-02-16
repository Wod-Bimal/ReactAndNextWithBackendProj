import { cookies } from 'next/headers'
import clientPromise from '@/lib/mongodb'
import { verifyToken } from '@/lib/auth'
import DashboardTable from '@/components/DashboardTable'

export default async function Dashboard(){
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value
  const payload = token ? verifyToken(token) : null
  if(!payload) {
    return (<div className='min-h-screen flex items-center justify-center'>
      <div>Please <a href='/auth/login' className='text-blue-600'>login</a> to view dashboard.</div>
    </div>)
  }

  const client = await clientPromise
  const db = client.db('bytetree')
  const links = db.collection('links')
  const users = db.collection('users')

  const userId = payload.id ? new (await import('mongodb')).ObjectId(payload.id) : null
  const user = await users.findOne({ _id: userId }, { projection: { password: 0 } })
  const userLinks = await links.find({ createdBy: userId }).toArray()

  // Serialize ObjectIds for client component
  const serializedLinks = userLinks.map(item => ({
    ...item,
    _id: item._id.toString(),
    createdBy: item.createdBy?.toString()
  }))

  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      <div className='max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6'>
        <aside className='col-span-1 bg-white rounded-lg shadow p-6'>
          <div className='flex flex-col items-center'>
            <img src={user?.profilePicture || '/default-avatar.png'} alt='avatar' className='w-28 h-28 rounded-full object-cover mb-4' />
            <div className='text-lg font-bold'>{user?.name || user?.username}</div>
            <div className='text-sm text-gray-600'>@{user?.username}</div>
            <div className='text-sm text-gray-600 mt-2'>{user?.phone}</div>
          </div>

          <div className='mt-6 space-y-3'>
            <a href='/generate' className='block text-center w-full bg-purple-700 text-white py-2 rounded'>Create new ByteLink</a>
            <a href='/' className='block text-center w-full border py-2 rounded'>Visit site</a>
          </div>
        </aside>

        <main className='lg:col-span-3'>
          <div className='flex items-center justify-between mb-4'>
            <h1 className='text-2xl font-bold'>Your ByteLinks</h1>
            <a href='/generate' className='bg-purple-700 text-white px-4 py-2 rounded'>+ New</a>
          </div>

          <div className='bg-white rounded-lg shadow overflow-hidden'>
            <DashboardTable userLinks={serializedLinks} />
          </div>
        </main>
      </div>
    </div>
  )
}
