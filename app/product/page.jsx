import Image from 'next/image'
import React from 'react'

function page() {
  return (
    <div>
        <div className='flex m-5'>
            <div className='bg-amber-200'>
            <Image
                  className="dark:invert"
                  src="/prodd.webp"
                  alt="Next.js logo"
                  width={600}
                  height={108}
                  priority
                />
            </div>
            <div className='flex flex-col m-2'>
                <div>Tommy Hilfiger</div>
                <div> City Pulse Leather Jacket</div>
                <div> $ 90 USD   <span>$150  USD</span></div>
                <div>Color: Green</div>
                
                <div className='flex space-x-2 ml-3'>
                <div><Image
                  className="dark:invert w-16 h-16 rounded-full ring-2 ring-blue-800"
                  src="/prodd.webp"
                  alt="Next.js logo"
                  width={600}
                  height={108}
                  priority
                /></div>
                <div><Image
                  className="dark:invert w-16 h-16 rounded-full ring-fuchsia-600 ring-2"
                  src="/prodd.webp"
                  alt="Next.js logo"
                  width={600}
                  height={108}
                  priority
                /></div>
                </div>
                <span>Quantity</span>
                <div className='w-20 border-black rounded-lg m-3 border flex justify-between p-2'><span>-</span><div>1</div> <span>+</span></div>
                <span className='text-3xl font-bold'>Description</span>
                <div className='max-w-96'>
                Crafted from high-quality leather, the City Pulse Leather Jacket offers both style and durability. Its sleek design and comfortable fit make it the perfect choice for any urban lifestyle. Stay warm and look effortlessly cool with this must-have piece.
                </div>
            </div>
        </div>
    </div>
  )
}

export default page
