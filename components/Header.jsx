import Image from 'next/image'
import React from 'react'
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";


const Header = () => {

  const router = useRouter();
  const {cart} = useCart()

  return (
    <div>
       <div className="h-20 w-full  justify-between">
  <div className="flex flex-row justify-between mx-4">
   <div className="w-1/4">
   <div className="relative h-16 w-40 hover:cursor-pointer" onClick={() => router.push("/")}> 
      <Image
        src="/sportex_cropped.png"
        alt="Sportex logo"
        fill
        className="object-contain "
      />
        </div>
   </div>
        <div className="flex-col w-2/4 ">
          <div className="flex flex-row w-full ">
          <span className="  h-fit">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg>

          </span>
          <div>
          <input type="text" placeholder="Search ..." />
          </div>
          </div>
          <div className="w-full flex mt-3">

        <div className="flex ml-0 gap-x-3">
          <div>Women</div>
          <div>Plus</div>
          <div>Men</div>
          <div>Shoes</div>
          <div>Accesories</div>
          <div>Sale</div>
        </div>
        </div>
        </div>
        <div className="flex gap-x-4">
          <div><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
</svg>
</div>
<div><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
</svg>
</div>
<div className='relative'>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
</svg>
<div className='absolute bottom-0 right 0 bg-green-500 w-1 rounded-full'>1</div>
</div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Header
