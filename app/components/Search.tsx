"use client"

import { useRouter } from "next/navigation"
import { useDebounce } from "use-debounce"
import { useEffect, useRef, useState } from "react"

//
import { IoSearchOutline } from "react-icons/io5";

const Search = ({search}: {search?:string}) => {
    const router = useRouter()
    const initialRender = useRef(true)
    const [text, setText] = useState(search)

    const [query] = useDebounce(text, 750);

    useEffect(()=>{
        if(initialRender.current) {
            initialRender.current = false
            return
        }
        
        if(!query) {
            router.push('/')
        }
        else {
            router.push(`?search=${query}`)
        }
    }, [query])
  return (
    <div className="flex justify-center w-full mt-10 mb-20"> 
        <div className="relative flex items-center w-full max-w-[300px]">
            <input
            type="text"
            value={text} 
            placeholder="Search Pokemon..."
            className="pl-6 pr-4 py-2 w-full rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300 text-gray-500"
            onChange={(e) => setText(e.target.value)}
            />

            <IoSearchOutline size={30} className="absolute right-4 text-gray-500" />
        </div>
    </div>
  )
}

export default Search