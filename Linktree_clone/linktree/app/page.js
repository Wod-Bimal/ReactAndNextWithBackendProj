"use client"
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [text, settext] = useState("")
  
  const router = useRouter()

  const createTree = ()=>{
    router.push(`/generate?handle=${text}`)
  }

  return (
   <main className="">
    <section className="bg-[#d2e823] min-h-[100vh] grid grid-cols-2">
      <div className="flex justify-center flex-col ml-[10vw] gap-3">
        <p className="text-purple-700 text-5xl font-bold">A link in bio built </p>
          <p className="text-purple-700 text-5xl font-bold">for you.</p>
        <p className="text-purple-500 text-xl">Join 70M+ people using Linktree for their link in bio. One link to help you share everything you create, curate and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.</p>
        <div className="input ">
          <input value={text} onChange={(e)=>settext(e.target.value)} type="text" placeholder="Enter your handle" className="bg-white p-3 mx-2 rounded-md focus:outline-white" />
          <button onClick={()=> createTree(0)} className="bg-green-900 text-white font-bold p-3 mx-2 rounded-4xl">Get started for free</button>
        </div>
      </div>
      <div className="flex items-center justify-center felx-col mr-[10vw]">
        <img width={400} className="rounded-lg animate-pulse" src="/download.webp" alt="homepage image" />

      </div>
    </section>
    <section className="bg-red-500 min-h-[100vh]">
     
    </section>
   </main>
  );
}
