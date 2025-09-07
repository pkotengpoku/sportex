"use client"

import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import { mainSports } from "@/data/mainCategories";
import Link from "next/link";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import SportsSection from "@/components/SportsCard";
import Footer from "@/components/Footer";

export default function Home() {
  
  const [products, setProducts] = useState([])
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/product", {
          method: "GET", 
        });

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await res.json();
        setProducts(data)
        console.log("Fetched products:", data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
     < Header />
      <div className="relative">
      <div className="relative w-full h-[490px] ">
      <Image
          className="dark:invert "
          objectPosition="bottom"
          objectFit="cover"
          src="/bannerr.jpg"
          alt="Next.js logo"
          priority
          layout="fill"
        />
        <div className="absolute inset-0 bg-black opacity-45"></div>
      </div>
        <div className="absolute w-full bottom-4">
        <div className="bg-black w-fit rounded-lg p-2 text-white text-2xl font-bold mx-auto">
          SHOP   NOW
        </div>
        </div>
      </div>
      <div className="mx-8 mt-3">
        <div className="text-3xl font-bold my-7"> Shop  by Collection</div>
        <div className="overflow-x-scroll space-x-3 flex w-full h-fit flex-shrink-0 ">
          {products.map((product)=>(
            <Link key={product._id} href={`/product/${product._id}`}>
              <ProductCard product={product} />
            </Link>
          ))}

        </div>
      </div>
<div className="mx-4 my-6">
      <div className="text-2xl sm:text-3xl font-bold my-4 md:my-7 text-gray-800">
        Cerca per Sport
      </div>
      <div className="flex overflow-x-scroll space-x-4 pb-2 scrollbar-hide">
        {mainSports && mainSports.map((sport, index) => (
          <SportsSection sport={sport} key={index}/>
        ))}
      </div>
    </div>
    <div>

          <Footer/>
    </div>
    </div>
  );
}
