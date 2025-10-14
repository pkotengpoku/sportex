import React, { useState } from 'react'
import { useRouter } from "next/navigation";



const SearchTab = () => {
  const [location, setLocation] = useState("")
  const [searchProduct, setSearchProduct] = useState("")
  const router = useRouter()
  console.log(location)
  return (
    <div>
      <div className='w-full rounded-full mx-auto py-3 pr-3 pl-8 justify-between flex h-16 min-h-fit border border-slate-300 shadow max-w-screen'>
        <div className='flex flex-col flex-1 min-w-0 text-sm md:text-base'>
          <div className='font-bold '>Cerca</div>
          <input type="text" placeholder='Product or category' onChange={(e) => { setSearchProduct(e.target.value) }} value={searchProduct} className="truncate outline-none border-none focus:ring-0" />
        </div>

        <div className="h-8 border-r border-slate-300 my-auto mx-4 flex"></div>

        <div className='flex flex-col flex-1 min-w-0 text-sm md:text-base'>
          <div className='font-bold'  > Dove</div>
          <input type="text" placeholder='Posto di Nollegio' onChange={(e) => { setLocation(e.target.value) }} value={location} className="truncate outline-none border-none focus:ring-0" />
        </div>
        <button onClick={()=>{router.push(`/search?tag=${searchProduct}&location=${location}`)}} className='cursor-pointer bg-amber-300 rounded-full h-full w-10 md:w-12 md:h-12 justify-center flex flex-shrink-0'> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.1} stroke="currentColor" className="size-6 m-auto">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
        </button>
      </div>
    </div>
  )
}

export default SearchTab
