import React, { useState } from 'react'


const SearchTab = () => {
    const [location, setLocation] = useState("")
    const [searchProduct, setSearchProduct] = useState("")
    console.log(location)
  return (
    <div>
      <div className='w-full rounded-full mx-auto py-3 pr-3 pl-8 justify-between flex h-16 min-h-fit border border-slate-300 shadow'>
        <div className=''>
            <div className='font-bold'>Sport</div>
            <input type="text" placeholder='Product or category' onChange={(e)=>{setSearchProduct(e.target.value)}} value={searchProduct} className="outline-none border-none focus:ring-0"/>
        </div>
          <div className="h-8 border-r border-slate-300 my-auto flex"></div>

        <div>
            <div className='font-bold'  > Dove</div>
            <input type="text" placeholder='Posto di Nollegio' onChange={(e)=>{setLocation(e.target.value)}} value={location} className="outline-none border-none focus:ring-0"/>
        
        </div>
        <div className='bg-amber-300 rounded-full h-full w-12 justify-center flex'> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.1} stroke="currentColor" className="size-6 m-auto">
  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg>
</div>
      </div>
    </div>
  )
}

export default SearchTab
