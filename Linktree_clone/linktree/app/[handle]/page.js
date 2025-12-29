
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
    return <div className="flex flex-col min-h-screen bg-purple-950
  justify-center items-center">
        {item && <div className="photo flex flex-col justify-center items-center">
            <img width={50} src={item.pic} alt="" />
            <span className="font-bold text-xl">@{item.handle} </span>
            <span className="desc w-72 text-center">{item.desc}</span>
            <div className="links">
                {item.links?.map((item, index) => {
                    return <Link key={index} href={item.link}> <div className="bg-purple-300 flex justify-center shadow-2xl py-4 px-2  rounded-md min-w-72 my-3">
                        {item.linktext}

                    </div>
                    </Link>
                })}
            </div>
        </div>}
    </div>
}