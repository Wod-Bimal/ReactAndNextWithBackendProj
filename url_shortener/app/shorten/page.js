"use client"
import React from 'react'
import { useState } from 'react'
import Link from 'next/link'

const page = () => {
    const [url, seturl] = useState("")
    const [shorturl, setShorturl] = useState("")
    const [generated, setGenerated] = useState(false)
    const generate = () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "url": url,
            "shorturl": shorturl
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("/api/generate", requestOptions)
            .then((response) => response.json())
            .then((result) =>{ 
                setGenerated(`${process.env.NEXT_PUBLIC_HOST}/${shorturl}`)
                seturl()
                setShorturl()
                alert(result.message)
                console.log(result)
            })
            .catch((error) => console.error(error));
    }
    return (
        <div className='mx-auto max-w-lg bg-purple-200 my-16 p-8 
        rounded-lg flex flex-col gap-4'>
            <h1 className='font-bold text-2xl'>Generate your short URLs</h1>
            <div className="flex flex-col gap-2">
                <input type="text"
                    className='px-4 py-2 text-white focus:outline-purple-600 rounded-md'
                    placeholder='Enter your URL'
                    onChange={e => { seturl(e.target.value) }} />

                <input type="text"
                    className='px-4 py-2 text-white  focus:outline-purple-600 rounded-md'
                    placeholder='Enter your preferred short URL text'
                    onChange={e => { setShorturl(e.target.value) }} />
                <button onClick={generate} className='bg-purple-500 shadow-2xl
                p-3 rounded-2xl py-1 font-bold'>Generate</button>
            </div>
            {generated &&<>
                <span className='font-bold text-lg'>your Link</span>
                 <code><Link href={generated}> {generated}</Link>
            </code>
           </> }
        </div>
    )
}

export default page
