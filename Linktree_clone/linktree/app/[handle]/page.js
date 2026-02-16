
import Link from "next/link"
import clientPromise from "@/lib/mongodb"
import { notFound } from "next/navigation"

export default async function Page({ params }) {
    const { handle } = await params
    const client = await clientPromise;
    const db = client.db("bytetree")
    const collection = db.collection("links")

    const item = await collection.findOne({ handle})
    if(!item){
        return notFound()
    }
   


    const item2 = {
        "_id": {
            "$oid": "6950cfaf6c894db7a8641f13"
        },
        "links": [
            {
                "link": "twitter.com",
                "linktext": "x"
            }
        ],
        "handle": "bikash@",
        "pic": "https://cdn.pixabay.com/photo/2021/12/10/16/37/twitter-6860915_1280.png"
    }
    return <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-900 to-purple-950 justify-center items-center p-6">
        {item && <div className="photo flex flex-col justify-center items-center max-w-md w-full">
            <img width={200} height={200} src={item.pic} alt="profile" className="rounded-full object-cover mb-6 shadow-2xl" />
            <span className="font-bold text-3xl text-white mb-2">@{item.handle} </span>
            <span className="desc w-full text-center text-gray-200 mb-6">{item.desc}</span>
            <div className="links w-full space-y-3">
                {item.links?.map((item, index) => {
                    return <Link key={index} href={item.link}> <div className="bg-purple-300 flex justify-center shadow-2xl py-4 px-2 rounded-lg w-full font-semibold hover:bg-purple-400 transition cursor-pointer">
                        {item.linktext}

                    </div>
                    </Link>
                })}
            </div>
        </div>}
    </div>
}