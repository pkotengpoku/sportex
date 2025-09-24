"use client"

import Image from 'next/image';
import Head from 'next/head';
import SearchTab from '@/components/SearchTab';
import ProductPageSearch from '@/components/ProductPageSearch';
import FiltersModal from '@/components/FiltersModal';
import { useState } from 'react';

// Data extracted from your screenshot. This stays at the top for clarity.
const listingsData = [
  {
    id: 1,
    title: 'Appartamento - MI...',
    description: 'Ringhiera House – Vicino...',
    beds: '2 letti',
    rating: 4.91,
    price: 828,
    originalPrice: 1206,
    imageUrl: 'https://images.unsplash.com/photo-1585559889412-24c3a29c7bee?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600',
    isLovedByGuests: true,
  },
  {
    id: 2,
    title: 'Appartamento - CI...',
    description: "CA' della TILDE - tram al piano di...",
    beds: '1 letto 2 piazze',
    rating: 4.88,
    price: 651,
    originalPrice: 759,
    imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600',
    isLovedByGuests: true,
  },
  {
    id: 3,
    title: 'Appartamento - Milano',
    description: '[citylife> fiera> san siro] WiFi - ...',
    beds: '2 letti',
    rating: 5.0,
    price: 903,
    originalPrice: 1047,
    imageUrl: 'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600',
    isLovedByGuests: true,
  },
  {
    id: 4,
    title: 'Appartamento - MI...',
    description: 'Da Greg-accogliente Bilocale-...',
    beds: '2 letti',
    rating: 5.0,
    price: 892,
    originalPrice: null,
    imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600',
    isLovedByGuests: true,
  },
  {
    id: 5,
    title: 'Appartamento - Va...',
    description: 'Casa con giardino vicino a...',
    beds: '1 letto',
    rating: 4.93,
    price: 792,
    originalPrice: null,
    imageUrl: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600',
    isLovedByGuests: true,
  },
  {
    id: 6,
    title: 'Appartamento - Mila...',
    description: 'Nuovissimo bilocale zona Navigli',
    beds: '1 divano letto',
    rating: null,
    price: 803,
    originalPrice: null,
    imageUrl: 'https://images.unsplash.com/photo-1598928636135-d146006a9206?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600',
    isSuperhost: true,
  },
];

// Helper Icon functions. These are small and can live here.
const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-gray-800">
    <path fillRule="evenodd" d="M10.868 2.884c.321-.662 1.279-.662 1.6 0l2.092 4.285 4.721.686c.732.106 1.023.99-.354 1.46l-3.416 3.328 1.02 4.704c.123.565-.524 1.012-1.024.748L10 15.347l-4.218 2.217c-.5.263-1.147-.183-1.024-.748l1.02-4.704L2.364 9.315c-.458-.47-.387-1.354.354-1.46l4.721-.686L9.53 2.884h1.338z" clipRule="evenodd" />
  </svg>
);

const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
  </svg>
);


// --- Main Page Component ---
export default function SearchPage() {
  const [isFiltersOpen, setFiltersOpen] = useState(false); // ✅ state for filters

  return (
    <>
      <Head>
        <title>Alloggi a Milano - Airbnb</title>
        <meta name="description" content="Trova alloggi a Milano per la tua prossima vacanza." />
      </Head>
      <div className='flex justify-center items-center'>
        <div className='w-7/12'>
      <ProductPageSearch />

        </div>
      <button className='p-2 flex hover:ring-1 rounded-full border' onClick={() => setFiltersOpen(true)}>
        <div>Filtri</div>
        <div><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
</svg>
</div>
      </button>
      </div>
      <div className="flex h-screen font-sans">
        {/* Listings Section */}
        <main className="flex-1 lg:w-3/5 xl:w-7/12 p-4 md:p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <header className="mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Oltre 1.000 alloggi: Milano</h1>
              <p className="text-sm text-gray-600 mt-1">
                <button className="underline">Come ordiniamo i risultati</button>
              </p>
            </header>
            
            {/* Grid for Listings */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-8">
              {listingsData.map((listing) => (
                // --- Start of Inlined Listing Card JSX ---
                <div key={listing.id} className="group">
                  <div className="relative mb-2">
                    <Image
                      src={listing.imageUrl}
                      alt={listing.title}
                      width={400}
                      height={400}
                      className="w-full h-auto object-cover rounded-xl aspect-square"
                    />
                    <button className="absolute top-3 right-3 p-1 rounded-full text-white hover:text-red-500 transition-colors">
                      <HeartIcon />
                    </button>
                    {listing.isLovedByGuests && (
                      <div className="absolute top-3 left-3 bg-white text-gray-800 text-xs font-bold px-2 py-1 rounded-md">
                        Amato dagli ospiti
                      </div>
                    )}
                    {listing.isSuperhost && (
                      <div className="absolute top-3 left-3 bg-white text-gray-800 text-xs font-bold px-2 py-1 rounded-md">
                        Superhost
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-gray-800 text-base leading-tight">{listing.title}</h3>
                      {listing.rating && (
                        <div className="flex items-center space-x-1 flex-shrink-0">
                          <StarIcon />
                          <span className="text-sm">{listing.rating.toFixed(2)}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-gray-500 text-sm mt-1">{listing.description}</p>
                    <p className="text-gray-500 text-sm mt-1">{listing.beds}</p>
                    <div className="mt-2">
                      {listing.originalPrice && (
                        <span className="text-gray-500 line-through mr-2">€{listing.originalPrice}</span>
                      )}
                      <span className="font-semibold">€{listing.price}</span>
                      <span className="text-gray-800"> / notte</span>
                    </div>
                  </div>
                </div>
                 // --- End of Inlined Listing Card JSX ---
              ))}
            </div>
          </div>
        </main>

        {/* Map Section */}
        <aside className="hidden lg:block lg:w-2/5 xl:w-5/12">
           {/* --- Start of Inlined Map JSX --- */}
           <div className="w-full h-full sticky top-0">
             <Image
               src="https://i.imgur.com/8QyV6aG.png"
               alt="Map of Milan with listings"
               layout="fill"
               objectFit="cover"
               quality={100}
             />
           </div>
           {/* --- End of Inlined Map JSX --- */}
        </aside>
      </div>
            <FiltersModal
        isOpen={isFiltersOpen}
        onClose={() => setFiltersOpen(false)}
      />
    </>
  );
}