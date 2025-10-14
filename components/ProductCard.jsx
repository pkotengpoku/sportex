import Image from 'next/image'
import React from 'react'

function ProductCard({product}) {
    return (
        <div className="w-80 rounded-lg overflow-hidden border border-black flex-shrink-0 p-2">
                  <div className=''>  
                  <div className='relative w-full h-90'>
                  <Image
                  className="object-contain "
                  src={product.image_url[0]}
                  alt="Next.js logo"
                  layout='fill'
                  priority
                />
                  </div>
                  <div>
                  </div>
                  <div className="w-full truncate">
                    {product.title}
                  </div>
                  <div className=''><span className="text-xl font-bold">€{(product.final_price ?? 0)} </span> al <span>giorno</span></div>
                  <div>Location:  <span>{product.location || "Milano"}</span></div>
                  </div>
                  </div>
    )
}

export default ProductCard
