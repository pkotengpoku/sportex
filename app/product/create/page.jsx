"use client"

import { CldImage, CldUploadWidget } from 'next-cloudinary';
import { useEffect, useState } from 'react';
import Header from '@/components/Header'

export default function ProductUploadPage() {

  const [imageUrls, setImageUrls] = useState([]); 
  const [title, setTitle] = useState(""); 
  const [brand, setBrand] = useState(""); 
  const [description, setDescription] = useState(""); 
  const [initial_price, setInitial_price] = useState(0); 
  const [final_price, setFinal_price] = useState(0); 
  const [availability, setAvailability] = useState(1); 
  const [categories, setCategories] = useState(""); 
  const [product_dimensions, setProduct_dimensions] = useState("");
  const [date_first_available, setDate_first_available] = useState("");
  const [discount, setDiscount] = useState(0);
  const [product, setProduct] = useState({});
  const [uploading, setUploading] = useState(false);
  const [isReadyToSubmit, setIsReadyToSubmit] = useState(false);



  const resetProductForm = () => {
    setImageUrls([]);
    setTitle("");
    setBrand("");
    setDescription("");
    setInitial_price(0);
    setFinal_price(0);
    setAvailability(1);
    setCategories("");
    setProduct_dimensions("");
    setDate_first_available("");
    setDiscount(0);
    setProduct({});
    setUploading(false);
    setIsReadyToSubmit(false);
  };

  
  const handleSubmit = async () => {
    setUploading(true);
  
    const productData = {
      title,
      brand,
      description,
      initial_price,
      final_price,
      availability,
      categories,
        image_url: imageUrls,
      product_dimensions,
      date_first_available,
      discount,
    };
  
    try {
      const response = await fetch('/api/product', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });
  
      const result = await response.json();
      console.log("API Response:", result);
  
      // Reset the form only if submission was successful
      if (response.ok) {
        resetProductForm();
      } else {
        console.error("Submission failed:", result.message || "Unknown error");
      }
    } catch (error) {
      console.error("Error submitting product:", error);
    } finally {
      setUploading(false);
    }
  };
  

  return (
    <div className="bg-gray-100 min-h-screen p-10">
      <Header />
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-lime-600 mb-6">Upload Product</h1>

        {/* Title */}
        <div className="mb-4">
          <label className="block font-medium">Title</label>
          <input className="w-full p-3 border rounded-xl" placeholder="Enter product title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        {/* Brand */}
        <div className="mb-4">
          <label className="block font-medium">Brand</label>
          <input type="text" className="w-full p-3 border rounded-xl" placeholder="Enter brand name" value={brand} onChange={(e) => setBrand(e.target.value)} />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block font-medium">Description</label>
          <textarea className="w-full p-3 border rounded-xl" rows="4" placeholder="Enter product description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        </div>

        {/* Upload Images */}
        <div className="mb-6">
          <label className="block font-medium">Upload Product Images</label>
          <CldUploadWidget
            uploadPreset="my_unsigned_preset"   // ✅ replace with your Cloudinary preset
            onSuccess={(result) => {
              setImageUrls((prev) => [...prev, result.info.secure_url]);
            }}
          >
            {({ open }) => (
              <button
                type="button"
                onClick={() => open()}
                className="mt-2 bg-lime-600 text-white px-4 py-2 rounded-xl"
              >
                Upload Image
              </button>
            )}
          </CldUploadWidget>

          {/* Image previews */}
          <div className="mt-4 grid grid-cols-3 gap-4">
            {imageUrls.map((url, idx) => (
              <div key={idx} className="relative w-full aspect-square border rounded-lg overflow-hidden">
                <CldImage
                  width="300"
                  height="300"
                  src={url}
                  alt={`Product image ${idx + 1}`}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Pricing */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block font-medium">Price</label>
            <input className="w-full p-3 border rounded-xl" placeholder="$0,00" value={final_price} onChange={(e) => setFinal_price(e.target.value)} />
          </div>
        </div>

        {/* Availability */}
        <div className="mb-4">
          <label className="block font-medium">Availability</label>
          <input type="number" className="w-full p-3 border rounded-xl" placeholder="Enter stock quantity" value={availability} onChange={(e) => setAvailability(Number(e.target.value))} />
        </div>

        {/* Categories */}
        <div className="mb-4">
          <label className="block font-medium">Categories</label>
          <input type="text" className="w-full p-3 border rounded-xl" placeholder="Enter categories" value={categories} onChange={(e) => setCategories(e.target.value)} />
        </div>

        {/* Product Dimensions */}
        <div className="mb-4">
          <label className="block font-medium">Product Dimensions</label>
          <input type="text" className="w-full p-3 border rounded-xl" placeholder="Enter dimensions" value={product_dimensions} onChange={(e) => setProduct_dimensions(e.target.value)} />
        </div>

        {/* Date First Available */}
        <div className="mb-4">
          <label className="block font-medium">Date First Available</label>
          <input type="date" className="w-full p-3 border rounded-xl" value={date_first_available} onChange={(e) => setDate_first_available(e.target.value)} />
        </div>

        {/* Discount */}
        <div className="mb-4">
          <label className="block font-medium">Discount (%)</label>
          <input type="number" className="w-full p-3 border rounded-xl" placeholder="Enter discount" value={discount} onChange={(e) => setDiscount(Number(e.target.value))} />
        </div>

        {/* Submit Button */}
        <button className={`w-full text-white p-3 rounded-xl font-bold text-lg ${uploading? 'bg-lime-400':'bg-lime-600'}`} disabled={uploading} onClick={handleSubmit}>{uploading? (
          <div className="flex items-center justify-center space-x-2">
          <span className="h-3 w-3 rounded-full bg-lime-600 animate-bounce [animation-delay:-0.3s]"></span>
          <span className="h-3 w-3 rounded-full bg-lime-600 animate-bounce [animation-delay:-0.15s]"></span>
          <span className="h-3 w-3 rounded-full bg-lime-600 animate-bounce"></span>
        </div>
        ): (<div>Submit</div>) }</button>
      </div>
    </div>
  );
}
