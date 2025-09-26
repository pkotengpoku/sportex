"use client";

import Image from "next/image";
import Head from "next/head";
import ProductPageSearch from "@/components/ProductPageSearch";
import FiltersModal from "@/components/FiltersModal";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, useMemo, Suspense } from "react";

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
  const [product, setProduct] = useState(searchParams.get("product") || "");
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
    setProduct(searchParams.get("product") || "");
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
    if (product) query.set("product", product);
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
        const inDesc = item.description?.toLowerCase().includes(searchTerm);
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
      <div className="flex justify-center items-center gap-3">
        <div className="w-7/12">
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
        <button className="p-2 flex hover:ring-1 rounded-full border" onClick={() => setFiltersOpen(true)}>
          <div>Filtri</div>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
            </svg>
          </div>
        </button>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-8">
              {filteredProducts.map((item) => (
                <div key={item._id} className="group">
                  <div className="relative mb-2">
                    <Image
                      src={item.image_url?.[0] || "/placeholder.jpg"}
                      alt={item.title}
                      width={400}
                      height={400}
                      className="w-full h-auto object-cover rounded-xl aspect-square"
                    />
                    <button className="absolute top-3 right-3 p-1 rounded-full text-white hover:text-red-500 transition-colors">
                      <HeartIcon />
                    </button>
                    {item.badge && item.badge !== "None" && (
                      <div className="absolute top-3 left-3 bg-white text-gray-800 text-xs font-bold px-2 py-1 rounded-md">
                        {item.badge}
                      </div>
                    )}
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
                    <p className="text-gray-500 text-sm mt-1">{item.description?.slice(0, 80)}...</p>
                    <div className="mt-2">
                      {item.initial_price && <span className="text-gray-500 line-through mr-2">${item.initial_price}</span>}
                      <span className="font-semibold">${item.final_price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Map */}
        <aside className="hidden lg:block lg:w-2/5 xl:w-5/12">
          <div className="w-full h-full sticky top-0">
            <Image src="https://i.imgur.com/8QyV6aG.png" alt="Map placeholder" layout="fill" objectFit="cover" quality={100} />
          </div>
        </aside>
      </div>

      {/* Filters Modal */}
      <FiltersModal isOpen={isFiltersOpen} onClose={() => setFiltersOpen(false)} filters={filters} setFilters={setFilters} />
    </>
  );
}
