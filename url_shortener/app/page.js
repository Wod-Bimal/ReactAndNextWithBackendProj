import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
   <main className="bg-purple-100">
    <section className="grid grid-cols-2 h-[48vh]">
      <div className="flex flex-col gap-4 items-center justify-center">
        <p className="text-2xl font-bold text-center">The best URL shortener in the Market</p>
        <p className="px-25">We are the most Straight:forward URL shortener in the world.
          Most of the shorteners will track you to give your details for login . we understand 
          your needs and hence we have created this URLshortener
        </p>
        <div className='flex gap-3 justify-start'>
                <Link href="/shorten"><button className='bg-purple-500 shadow-2xl
                p-3 rounded-2xl py-1 font-bold text-white'>Try Now</button></Link>
                <Link href="/github"><button className='bg-purple-500 shadow-2xl
                p-3 rounded-2xl py-1 font-bold text-white'>GitHub</button></Link>
            </div>
      </div>
      <div className="flex justify-start relative">
        <Image className="mix-blend-darken" alt="Image vector" src={"/vector.jpg"}
        fill={true}/>
      </div>
    </section>
   </main>
  );
}
