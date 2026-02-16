"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from "next/navigation";


const Navbar = () => {
    const pathname = usePathname()
    const router = useRouter()
    const [user, setUser] = useState(null)

    const showNavbar = ["/", "/generate"].includes(pathname)

    useEffect(()=>{
        let mounted = true
        fetch('/api/auth/me').then(r=>r.json()).then(data=>{
            if(mounted && data?.success && data.user) setUser(data.user)
        }).catch(()=>{})
        return ()=>{ mounted = false }
    }, [pathname])

    const handleLogout = async ()=>{
        await fetch('/api/auth/logout', { method: 'POST' })
        setUser(null)
        router.push('/')
    }

    return (<>{showNavbar && <nav className='bg-white flex w-[84vw] fixed top-8 right-[10vw] rounded-full justify-between '>
        <div className="logo flex gap-x-20 items-center p-6">
            <Link href={"/"}><img className='h-10' src="/linktree.svg" alt="" /></Link>
            <ul className='flex gap-8'>
                <Link href={"/"}><li>Products</li></Link>
                <Link href={"/"}><li>Templates</li></Link>
                <Link href={"/"}><li>Markerplace</li></Link>
                <Link href={"/"}><li>Learn</li></Link>
                <Link href={"/"}><li>Pricing</li></Link>
            </ul>
        </div>
        <div className="btn flex items-center mr-3.5 mb-3 gap-2" >
            {user ? (
                <>
                  <Link href="/dashboard"><button className='bg-gray-200 p-3 rounded-lg'>Dashboard</button></Link>
                  <button onClick={handleLogout} className=' signup bg-black text-white p-3 rounded-full'>Logout</button>
                </>
            ) : (
                <>
                  <Link href="/auth/login"><button className='login bg-gray-300 p-3 rounded-lg'>Log In</button></Link>
                  <Link href="/auth/register"><button className=' signup bg-black text-white p-3 rounded-full'>Sign up Free</button></Link>
                </>
            )}
        </div>
    </nav>}
    </>)
}

export default Navbar
