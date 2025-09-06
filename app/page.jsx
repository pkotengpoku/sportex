"use client"

import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import { Products } from "@/data/products";
import Link from "next/link";
import Header from "@/components/Header";
import { useEffect, useState } from "react";

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
      <div>
        <span> Shop  by Collection</span>
        <div className="overflow-x-scroll space-x-3 flex w-full h-fit">
          {products.map((product)=>(
            <Link key={product._id} href={`/product/${product._id}`}>
              <ProductCard product={product} />
            </Link>
          ))}

        </div>
      </div>
          <div>
            <div className="bg-green-500  h-fit">
              <div className="flex">
                <div className="w-1/3 m-3 ">Find Us</div>
                <div className="w-2/3 m-3 mr-9 flex justify-between">
                  <div>
                  <h1 className ="text-slate-700" >DECATHLON CORPORATE</h1>
                  <div>
                    <h1>Nolly United</h1>
                    <h1>Lavora con Noi</h1>
                    <h1>Impegni sostenabilita</h1>
                  </div>
                  </div>
                  <div>
                  <h1 className ="text-slate-700" >DECATHLON RENTAL</h1>
                  <div>
                    <h1>Decathlon Rental</h1>
                    <h1>Come funziona</h1>
                    <h1>Aiuto</h1>
                  </div>
                  </div>
                  <div>
                  <h1 className ="text-slate-700" >IL MIO ACCOUNT</h1>
                  <div>
                    <h1>I miei aquisti</h1>
                    <h1>I miei noleggi</h1>
                    <h1>I miei aquisti</h1>
                  </div>
                  </div>
                  <div>
                  <h1 className ="text-slate-700" >COSA POSSO NOLEGGIARE</h1>
                  <div>
                    <h1>Biciclette da bambino</h1>
                    <h1>Decathlon Rent</h1>
                  </div>
                  </div>
                </div>
              </div>
              <div className="bg-green-500 p-10">   
                <div className="relative h-16 w-40"> 
      <Image
        src="/sportex_cropped.png"
        alt="Sportex logo"
        fill
        className="object-contain"
      />
        </div>
        <div className="text-slate-500"> @2023 Decathlon</div>
        <div className="w-full border-black border-t my-3 border-2"></div>
        <div>
          <ul className="flex w-full space-x-8">
            <ol>Condizioni di noleggio</ol>
          <ol>Condizioni generali di utilizzo del sito</ol>
          <ol>Condizioni generali di assicurazione</ol>
          <ol>Informativa sulla privacy</ol>
          <ol>Cookies</ol>
          </ul>
        </div>
        </div>
            </div>
          </div>
    </div>
  );
}
