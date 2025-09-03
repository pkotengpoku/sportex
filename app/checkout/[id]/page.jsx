"use client"
import React from 'react'
import Header from '@/components/Header'
import Image from 'next/image'

const page = () => {
  return (
    <div className=' '>
      <Header />
      <div className='flex w-full'>
        <div className='w-2/3 px-7' >
        <div>
        </div>
      <div className='text-xl flex font-bold my-3'>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4} stroke="currentColor" className="size-5 mr-2 my-auto">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
</svg>

CONTINUA NOLLEGIO
      </div>
      <div className='text-2xl my-3 mt-6 font-bold'>
        DETAGLIO ORDINE
      </div>
      <div>
        <div>{3} Articoli</div>
      </div>
      <div className='flex bg-green-200 p-4 text-lg'>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 my-auto mr-3">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
</svg>

      Puoi ritirare dalle 16 e riconsegnare entro le <br /> 14 dei giorno previsti
      </div>
      <div>
        <div className='bg-gray-300 my-6'>BICICLETTE</div>
        <div>
          <div className='flex'>
            <div>
              <Image 
              src={'/bikee.jpg'}
              className="object-contain"
              alt="Next.js logo"
              width={150}
              height={408}
              priority
              />
            </div>
            <div className="flex-col ml-4">
            <div>
Tende 4 Posti a 2 Camere <br />
Taglia: 4 POSTI - 2 CAMERE (Gonfiabile)</div>
        <div> Data di noleggi:  {'7 settembre 2025 - 14 settembre 2025'}</div>
            </div>
            <div className='ml-auto'>
              Price {'29,78'}
            </div>
          </div>
            {/*Borrowed data goes here*/}

        </div>
        <div className='bg-gray-300 my-6'>MOONOPPATINO</div>
        <div>
          <div className='flex'>
            <div>
              <Image 
              src={'/bikee.jpg'}
              className="object-contain"
              alt="Next.js logo"
              width={150}
              height={408}
              priority
              />
            </div>
            <div className="flex-col ml-4">
            <div>
Tende 4 Posti a 2 Camere <br />
Taglia: 4 POSTI - 2 CAMERE (Gonfiabile)</div>
        <div> Data di noleggi:  {'7 settembre 2025 - 14 settembre 2025'}</div>
            </div>
            <div className='ml-auto'>
              Price {'29,78'}
            </div>
          </div>
            {/*Borrowed data goes here*/}

        </div>
      </div>
        </div>
        <div className='w-1/3 h-screen flex items-center'>
       <div className='w-full'>
       <div className='rounded-lg p-4 border-1 w-full'>
        <div className='py-4 border-b'>Riepilogo</div>
        <div className='py-4 flex justify-between'>
          <div>Acconto online da pagare</div>
          <div className='text-xl font-bold'>59,40 €</div>
        </div>
        <div className='py-4 flex justify-between'>
          <div>Saldo in negozio</div>
          <div className='text-xl font-bold'>237,60 €</div>
        </div>
        <div className='py-4 flex justify-between' > 
          <div>Totale</div>
          <div className='text-xl font-bold'>297,00 €</div>
        </div>
        </div>
        <div className='mt-6 py-4 px-2 border-b border-black my-4'>
          Codice Promo
        </div>
       </div>

        </div>
      </div>
    </div>
  )
}

export default page
