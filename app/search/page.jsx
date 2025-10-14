"use client";

import Image from "next/image";
import Head from "next/head";
import ProductPageSearch from "@/components/ProductPageSearch";
import FiltersModal from "@/components/FiltersModal";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, useMemo, Suspense } from "react";
import AirbnbMap from "@/components/UglyMap";
import Link from "next/link";



// ⬇️ Wrapper with Suspense
export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-4 text-center">Loading search...</div>}>
      <SearchPageInner />
    </Suspense>
  );
}

function SearchPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isFiltersOpen, setFiltersOpen] = useState(false);
  const [isMapOpen, setMapOpen] = useState(false);
  const [product, setProduct] = useState(searchParams.get("tag") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [products, setProducts] = useState([]);
  const [city, setCity] = useState(searchParams.get("location") || "");
  const [dates, setDates] = useState({
    startDate: searchParams.get("startDate") ? new Date(searchParams.get("startDate")) : null,
    endDate: searchParams.get("endDate") ? new Date(searchParams.get("endDate")) : null,
  });

  // Filters state
  const [filters, setFilters] = useState({
    minPrice: null,
    maxPrice: null,
    minRating: null,
  });

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/product", { method: "GET" });
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Sync with URL
  useEffect(() => {
    setProduct(searchParams.get("tag") || "");
    setCity(searchParams.get("location") || "");
    setCategory(searchParams.get("category") || "");
    setDates({
      startDate: searchParams.get("startDate") ? new Date(searchParams.get("startDate")) : null,
      endDate: searchParams.get("endDate") ? new Date(searchParams.get("endDate")) : null,
    });
  }, [searchParams]);

  // Search handler
  const handleSearch = () => {
    const query = new URLSearchParams();
    if (product) query.set("tag", product);
    if (city) query.set("location", city);
    if (dates.startDate) query.set("startDate", dates.startDate.toISOString().split("T")[0]);
    if (dates.endDate) query.set("endDate", dates.endDate.toISOString().split("T")[0]);

    router.push(`/search?${query.toString()}`);
  };

  // Apply filters
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      if (product) {
        const searchTerm = product.toLowerCase();
        const inTitle = item.title?.toLowerCase().includes(searchTerm);
        /* const inDesc = item.description?.toLowerCase().includes(searchTerm); */
        if (!inTitle && !inDesc) return false;
      }
      if (city) {
        const loc = city.toLowerCase();
        const inLocation = item.city?.toLowerCase().includes(loc) || item.location?.toLowerCase().includes(loc);
        if (!inLocation) return false;
      }
      if (filters.minPrice && item.final_price < filters.minPrice) return false;
      if (filters.maxPrice && item.final_price > filters.maxPrice) return false;
      if (filters.minRating && item.rating < filters.minRating) return false;

      return true;
    });
  }, [products, product, city, filters]);

  return (
    <>
      <Head>
        <title>Risultati ricerca</title>
        <meta name="description" content="Trova prodotti sportivi da noleggiare." />
      </Head>

      {/* Search bar and filters */}
      <div className="md:flex justify-center items-center mx-2 gap-3  ">
        <div className="w-11/12 md:w-8/12 lg:w-9/12 mx-auto">
          <ProductPageSearch
            product={product}
            setProduct={setProduct}
            city={city}
            setCity={setCity}
            dates={dates}
            onDatesChange={setDates}
            onSearch={handleSearch}
          />
        </div>
        <div className="flex justify-between md:w-fit w-full md:px-0 px-8">
          <button className="p-2 flex hover:ring-1 rounded-full border" onClick={() => setFiltersOpen(true)}>
          <div>Filtri</div>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
            </svg>
          </div>
        </button>
        <button className="p-2 flex hover:ring-1 rounded-full border md:hidden" onClick={() => setMapOpen(true)}>
          <div>Map</div>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
</svg>

          </div>
        </button>
        </div>
      </div>

      {/* Layout */}
      <div className="flex h-screen font-sans">
        {/* Listings */}
        <main className="flex-1 lg:w-3/5 xl:w-7/12 p-4 md:p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <header className="mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                {filteredProducts.length} prodotti trovati
              </h1>
            </header>

            {/* Product grid */}
<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-8">
  {filteredProducts.map((item) => (
    <div key={item._id} className="group relative">
      {/* Heart button stays clickable */}
      <button
        className="absolute top-3 right-3 z-10 p-1 rounded-full text-white hover:text-red-500 transition-colors"
        onClick={(e) => {
          e.stopPropagation(); // Prevent Link click
          // handle favorite action here
        }}
      >
        <HeartIcon />
      </button>

      <Link href={`/product/${item._id}`} className="block">
        <div className="relative mb-2">
          {item.badge && item.badge !== "None" && (
            <div className="absolute top-3 left-3 bg-white text-gray-800 text-xs font-bold px-2 py-1 rounded-md z-10">
              {item.badge}
            </div>
          )}
          <Image
            src={item.image_url?.[0] || "/placeholder.jpg"}
            alt={item.title}
            width={400}
            height={400}
            className="w-full h-auto object-cover rounded-xl aspect-square"
          />
        </div>
        <div>
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-gray-800 text-base leading-tight">{item.title}</h3>
            {item.rating > 0 && (
              <div className="flex items-center space-x-1 flex-shrink-0">
                <StarIcon />
                <span className="text-sm">{item.rating.toFixed(2)}</span>
              </div>
            )}
          </div>
          <p className="text-gray-500 text-sm mt-1">{item.description?.slice(0, 55)}...</p>
          <div className="mt-2 justify-between flex">
            <div className="flex gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
              <span>Mr Renter</span>
            </div>
            <span className="font-semibold">{item.final_price} €</span>
          </div>
        </div>
      </Link>
    </div>
  ))}
</div>

          </div>
        </main>

        {/* Map */}
        <aside className="hidden lg:block lg:w-2/5 xl:w-5/12">
          <div className="w-full h-full sticky top-0">
           <AirbnbMap />
          </div>
        </aside>
      </div>

      {/* Filters Modal */}
      <FiltersModal isOpen={isFiltersOpen} onClose={() => setFiltersOpen(false)} filters={filters} setFilters={setFilters} />
    </>
  );
}
// Small icons inline
const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-gray-800">
    <path
      fillRule="evenodd"
      d="M10.868 2.884c.321-.662 1.279-.662 1.6 0l2.092 4.285 4.721.686c.732.106 1.023.99-.354 1.46l-3.416 3.328 1.02 4.704c.123.565-.524 1.012-1.024.748L10 15.347l-4.218 2.217c-.5.263-1.147-.183-1.024-.748l1.02-4.704L2.364 9.315c-.458-.47-.387-1.354.354-1.46l4.721-.686L9.53 2.884h1.338z"
      clipRule="evenodd"
    />
  </svg>
);

const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
    />
  </svg>
);