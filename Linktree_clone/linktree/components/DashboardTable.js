"use client"
import { useRouter } from 'next/navigation'

export default function DashboardTable({ userLinks }){
  const router = useRouter()

  return (
    <div className='bg-white rounded-lg shadow overflow-hidden'>
      <table className='min-w-full divide-y'>
        <thead className='bg-gray-100'>
          <tr>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Handle</th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Links</th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Created</th>
          </tr>
        </thead>
        <tbody className='bg-white divide-y'>
          {userLinks.map(item=> (
            <tr key={item._id.toString()} onClick={()=> router.push(`/${item.handle}`)} className='cursor-pointer hover:bg-gray-100 transition'>
              <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{item.handle}</td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>{(item.links||[]).map(l=>`${l.linktext}: ${l.link}`).join(' · ')}</td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{new Date(item.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
