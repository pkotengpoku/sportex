"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Image from "next/image";

import Slider from "react-slick";
import { useCart } from "@/context/CartContext";
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ProductPage() {
  const params = useParams();
  const productId = params.id;

  const { cart, addToCart } = useCart();

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const [state, setState] = useState([
    { startDate: today, endDate: tomorrow, key: 'selection' }
  ]);

  const [product, setProduct] = useState({});
  const [size, setSize] = useState(null);

  const handleCartChange = () => {
    if (size === null) {
      console.log("❌ Please select a product type before adding to cart");
      return;
    }

    addToCart(
      {
        id: product._id,
        name: product.title,
        price: product.product_types[size]?.price || product.final_price,
        image: product.image_url?.[0] || "/placeholder.jpg",
        size: product.product_types[size]?.name,
      },
      1
    );
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/product/${productId}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
        setProduct(false);
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
    <div className="flex flex-col overflow-x-hidden">
      <Header />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
        {/* Image Slider */}
        <div className="w-full">
          <Slider {...sliderSettings}>
            {product.image_url?.map((img, idx) => (
              <div key={idx} className="relative w-full h-64 sm:h-80 md:h-[500px]">
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
          <h1 className="text-2xl sm:text-3xl font-bold">{product.title}</h1>
          <p className="text-gray-700">{product.description}</p>

          {/* Product Types Selector */}
          {product.product_types?.length > 0 && (
            <div className="flex flex-col gap-2 mt-4">
              <span className="font-medium text-gray-700">Choose an option:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.product_types.map((option, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSize(index)}
                    className={`border rounded-lg p-3 text-left transition
                      ${size === index ? "border-green-500 bg-green-50" : "border-gray-300 hover:border-green-400 hover:bg-green-50"}`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">{option.name}</span>
                      <span className="text-green-600 font-bold">{option.price} €</span>
                    </div>
                    <p className="text-gray-500 text-sm mt-1">{option.description}</p>
                  </button>
                ))}
              </div>
              {size === null && (
                <p className="text-red-500 text-sm mt-1">Please select a product type</p>
              )}
            </div>
          )}

          {/* Calendar */}
          <div className="mt-4">
            <DateRangePicker
              ranges={state}
              onChange={item => setState([item.selection])}
              disabledDates={[]}
              className="w-full"
            />
            {state.length > 0 && (() => {
              const formatDate = (date) => {
                const formatted = date.toLocaleDateString('it-IT', { weekday: 'short', day: 'numeric', month: 'short' });
                return formatted.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
              };
              const start = formatDate(state[0].startDate);
              const end = formatDate(state[0].endDate);
              const diffDays = Math.ceil((state[0].endDate.getTime() - state[0].startDate.getTime()) / (1000*60*60*24));
              return <div className="mt-2">{start} – {end} ({diffDays} day(s))</div>;
            })()}
          </div>

          {/* Pricing */}
          <div className="mt-4">
            <div className="text-xl font-semibold">
              {size !== null ? product.product_types[size].price : product.final_price} € / al giorno
            </div>
            <div>
              Total for 5 days: {size !== null ? product.product_types[size].price * 5 : product.final_price * 5} {product.currency}
            </div>
          </div>

          {/* Rental Info */}
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

          <button
            type="button"
            onClick={handleCartChange}
            className="mt-4 w-full sm:w-48 bg-green-500 hover:bg-green-600 active:scale-95 transition p-3 rounded-lg font-bold text-white"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
