"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Image from "next/image";

import Slider from "react-slick";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { useCart } from "@/context/CartContext";

export default function ProductPage() {
  const params = useParams();
  const productId = params.id

  const { cart, addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [size, setSize] = useState('');

  const handleChange = (event) => setSize(event.target.value);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/product/${productId}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
        setProduct(false); // mark as not found
      }
    };
    fetchProduct();
  }, [productId]);

  if (product === null) return <p>Loading...</p>;
  if (!product) return <h1>Product not found</h1>;

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div>
      <Header />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
        {/* Image Slider */}
        <div>
          <Slider {...sliderSettings}>
            {product.image_url?.map((img, idx) => (
              <div key={idx} className="relative w-full h-96">
                <Image
                  src={img}
                  alt={product.title}
                  fill
                  className="object-contain rounded"
                />
              </div>
            ))}
          </Slider>
        </div>

        {/* Product Details */}
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p>{product.description}</p>

          {/* Size selector */}
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Size</InputLabel>
            <Select value={size} onChange={handleChange} label="Size">
              <MenuItem value=""><em>None</em></MenuItem>
              <MenuItem value="M">Taglia M</MenuItem>
              <MenuItem value="L">Taglia L</MenuItem>
              <MenuItem value="XL">Taglia XL</MenuItem>
            </Select>
          </FormControl>
          {!size && <div className="text-red-500">Please select a size</div>}

          {/* Pricing */}
          <div>
            <div className="text-xl font-semibold">{product.pricing?.daily} € / al giorno</div>
            <div className="line-through text-gray-400">Era {product.pricing?.oldDaily} €</div>
            <div>Total for 5 days: {product.pricing?.daily * 5} {product.pricing?.currency}</div>
          </div>

          {/* Rental info */}
          <div className="flex flex-col gap-2 mt-4">
            {[
              "Cancellazione gratis fino a 24 ore prima del primo giorno di noleggio",
              "Ritiro gratis dalle 16 del giorno prima",
              "Riconsegna gratis entro le 14 del giorno successivo",
              "Copertura danni accidentali inclusa",
            ].map((info, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mt-0.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <span>{info}</span>
              </div>
            ))}
          </div>
        <button className="w-36 bg-green-500 p-3 rounded-lg font-bold" onClick={() => addToCart(product, 1)} >add to cart</button>
        <div>{cart[0].title} products</div>
        <div>Helloo</div>
        </div>
      </div>
    </div> 
  );
}
