"use client"

import { CldImage, CldUploadWidget } from 'next-cloudinary';
import { useState } from 'react';

export default function ProductUploadPage() {

    const [images, setImages] = useState([]);
      const [previews, setPreviews] = useState([]);
      const [uploadedUrls, setUploadedUrls] = useState([]);
      const [product, setProduct] = useState({});
      const [title, setTitle] = useState("");
    
      const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);
        setPreviews(files.map(file => URL.createObjectURL(file)));
      };
    
      const handleTitlechange = (e) => {
        setTitle(e.target.value);
        console.log(e.target.value); // Logs the actual input value
      };
      
    
      const handleUpload = async () => {
       console.log("Uploaded")
      };
    return (
      <div className="bg-gray-100 min-h-screen p-10">
        <div className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
          <h1 className="text-3xl font-bold text-lime-600 mb-6">Upload Product</h1>
          
          {/* Title */}
          <div className="mb-4">
            <label className="block font-medium">Title</label>
            <input
                className="w-full p-3 border rounded-xl"
                placeholder="Enter product title"
                value={title}
                onChange={(e) => handleTitlechange(e)}
                />
          </div>
          
          {/* Brand */}
          <div className="mb-4">
            <label className="block font-medium">Brand</label>
            <input type="text" className="w-full p-3 border rounded-xl" placeholder="Enter brand name" />
          </div>
          
          {/* Description */}
          <div className="mb-4">
            <label className="block font-medium">Description</label>
            <textarea className="w-full p-3 border rounded-xl" rows="4" placeholder="Enter product description"></textarea>
          </div>
          
          {/* Pricing */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block font-medium">Initial Price</label>
              <input type="number" className="w-full p-3 border rounded-xl" placeholder="$0.00" />
            </div>
            <div>
              <label className="block font-medium">Final Price</label>
              <input type="number" className="w-full p-3 border rounded-xl" placeholder="$0.00" />
            </div>
          </div>
          
          {/* ASIN */}
          <div className="mb-4">
            <label className="block font-medium">ASIN</label>
            <input type="text" className="w-full p-3 border rounded-xl" placeholder="Enter ASIN" />
          </div>
          
          {/* Image URL */}
          <div className=''>
          <div className='flex'>
          <label className='p-4  border-4 border-slate-600 rounded-lg cursor-pointer'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-16 text-slate-600">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>

        <input
          type="file"
          multiple
          onChange={handleFileChange}
          style={{ display: "none" }} // Hides default input
        />
      </label>
      </div>
      <button onClick={handleUpload} className='mt-3 p-3 bg-black ml-3 rounded-lg text-white font-bold'>Upload Image</button>
      <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
        {previews.map((src, index) => (
          <img key={index} src={src} alt="Preview" width={100} />
        ))}
      </div>
      <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
        {uploadedUrls.map((src, index) => (
          <img key={index} src={src} alt="Uploaded" width={100} />
        ))}
      </div>
    </div>
          
          {/* Dynamic Fields Placeholder */}
          <div className="mb-6">
            <p className="text-lg font-semibold text-lime-600">Dynamic Fields (Variations, Features, Buybox Prices, Delivery)</p>
            <p className="text-gray-500 text-sm">Use buttons to add/remove fields dynamically.</p>
          </div>
          
          {/* Submit Button */}
          <button className="w-full bg-lime-600 text-white p-3 rounded-xl font-bold text-lg">Submit</button>
        </div>
      </div>
    )};