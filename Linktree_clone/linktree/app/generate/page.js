
"use client"
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useSearchParams, useRouter } from 'next/navigation';

const Generate = () => {

    const searchParams=useSearchParams()

    // const [link, setlink] = useState("")
    // const [linktext, setlinktext] = useState("")

    const [links, setLinks] = useState([{ link: "", linktext: "" }])
    const [handle, sethandle] = useState(searchParams.get("handle"))
    const [desc, setdesc] = useState("")
    const [pic, setpic] = useState("")
    const router = useRouter()

    const handleChange = (index, link, linktext) => {
        setLinks((initialLinks) => {
            return initialLinks.map((item, i) => {
                if (i == index) {
                    return { link, linktext }
                } else {
                    return item
                }

            })
        })
    }
    const addLink = () => {
        setLinks(links.concat([{ link: "", linktext: "" }]))
    }


    const SubmitLink = async () => {
        try {
            const r = await fetch('/api/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ links, handle, pic, desc })
            })

            if (!r.ok) {
                const errBody = await r.json().catch(() => ({}))
                toast.error(errBody.message || 'Failed to create handle')
                return
            }

            const result = await r.json()
            if (result.success) {
                toast.success(result.message)
                router.push(`/${handle}`)
            } else {
                toast.error(result.message || 'Failed to create handle')
            }
        } catch (err) {
            toast.error(err.message || 'Network error')
        }

    }

    return (
        <div className='min-h-screen grid grid-cols-2 '>


            <div className="flex flex-col justify-center items-start mx-10 py-2">


                <div className="item">

                    <div className="mx-4">
                        <h2 className='font-semibold text-2xl'>Step1:Create your Bytetree</h2>

                        <input value={handle || ""} onChange={e => { sethandle(e.target.value) }} className='p-3 focus:outline-black rounded-2xl bg-gray-500' type="text" placeholder='Choose handle' />

                    </div>
                </div>
                <div className="item">



                    <h2 className='font-semibold text-2xl'>Step 2:Add Links</h2>
                    {links && links.map((item, index) => {
                        return <div key={index} className="mx-4">
                        <input value={item.linktext || ""} onChange={e => { handleChange(index, item.link, e.target.value) }} className='px-4 py-2 mx-2 my-2 bg-gray-500 focus:outline-pink-500 rounded-full' type="text" placeholder='Enter link text' />
                            <input value={item.link || ""} onChange={e => { handleChange(index, e.target.value, item.linktext) }} className='px-4 py-2 mx-2 my-2 focus:outline-pink-500 rounded-full bg-gray-500' type="text" placeholder='Enter link' />
                        </div>
                    })}

                    <button onClick={() => addLink()} className='p-5 py-2 mx-2 bg-purple-900 text-white font-bold rounded-3xl'>Add Link</button>


                </div>
                <div className="item">

                    <div className="mx-4 flex flex-col justify-center items-center">
                        <h2 className='font-semibold text-2xl'>Step 3: Add Picture and Finalize</h2>

                        <input value={pic || ""} onChange={e => { setpic(e.target.value) }} className='px-4 py-2 mx-2 my-2 bg-gray-500 focus:outline-pink-500 rounded-full w-full' type="text" placeholder='Enter link to your picture' />
                        <input value={desc || ""} onChange={e => { setdesc(e.target.value) }} className='px-4 py-2 mx-2 my-2 bg-gray-500 focus:outline-pink-500 rounded-full w-full' type="text" placeholder='Enter the description' />
                        <button disabled={
                            pic == "" ||
                            handle == "" ||
                            links.length === 0 ||
                            links.some(l => !l.link || !l.linktext)
                        } onClick={() => SubmitLink()} className='p-5 py-2 mx-2 w-[65%] disabled:bg-slate-600  bg-purple-900 text-white font-bold rounded-3xl'>Create you  ByteLink</button>

                    </div>
                </div>
            </div>
            <div className="col2 w-full h-screen">
                <img className='w-full h-screen object-cover ' src="/generate.webp" alt="Generate your links" />
                <ToastContainer />
            </div>
        </div>
    )
}

export default Generate
