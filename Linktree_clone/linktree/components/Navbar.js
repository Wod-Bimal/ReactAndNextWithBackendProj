"use client"
import React from 'react'
import Link from 'next/link'
import { usePathname } from "next/navigation";


const Navbar = () => {
    const pathname = usePathname()

    const showNavbar = ["/", "/generate"].includes(pathname)

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
            <button className='login bg-gray-300 p-3 rounded-lg'>Log In</button>
            <button className=' signup bg-black text-white p-3 rounded-full'>Sign up Free</button>
        </div>
    </nav>}
    </>)
}

export default Navbar
