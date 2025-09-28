"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { mainCategories } from '@/data/categories';
import { useEffect } from "react";
import { CldImage, CldUploadWidget } from "next-cloudinary";

/**
 * Product Upload Page (Airbnb-like detailed UI)
 *
 * - Full form for every field in your provided schema
 * - Cloudinary image upload: replace CLOUD_NAME and UPLOAD_PRESET below
 * - Dynamic arrays with add/remove
 * - Live preview panel on the right (image gallery + summary)
 * - Submits JSON to /api/products (example route included below)
 *
 * NOTE: install uuid: npm i uuid
 */

const CLOUDINARY_CLOUD = process.env.CLOUDINARY_CLOUD
const CLOUDINARY_UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET

const Pill = ({ children }) => (
  <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full mr-2">
    {children}
  </span>
);

// small util: slug generator (underscores)
const toUrlName = (s = "") =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "_") // spaces to underscores
    .replace(/_+/g, "_");

export default function ProductUploadPage() {
  // Basic single-value fields
  const [title, setTitle] = useState('Rockrider E-Bike 29" Orange');
  const [nameUrl, setNameUrl] = useState(toUrlName(title));
  const [brand, setBrand] = useState("Rockrider");
  const [asin, setAsin] = useState("21");
  const [inputAsin, setInputAsin] = useState("N/A");
  const [upc, setUpc] = useState("N/A");
  const [description, setDescription] = useState(
    "Designed for touring on any terrain with medium climbs.\n\nThis versatile eMTB is perfect for touring on any terrain with medium climbs. Download the Decathlon Ride app to unleash the full potential of your bike!"
  );
  const [finalPrice, setFinalPrice] = useState(2199);
  const [initialPrice, setInitialPrice] = useState(2199.99);
  const [discount, setDiscount] = useState("2");
  const [currency, setCurrency] = useState("USD");
  const [availability, setAvailability] = useState("1");
  const [isAvailable, setIsAvailable] = useState(true);
  const [badge, setBadge] = useState("None");
  const [amazonChoice, setAmazonChoice] = useState(false);
  const [format, setFormat] = useState("Standard");
  const [department, setDepartment] = useState("General");
  const [domain, setDomain] = useState("amazon.com");
  const [originUrl, setOriginUrl] = useState("#");
  const [countryOfOrigin, setCountryOfOrigin] = useState("Unknown");
  const [manufacturer, setManufacturer] = useState("Unknown");
  const [modelNumber, setModelNumber] = useState("N/A");
  const [productDimensions, setProductDimensions] = useState('29"');
  const [itemWeight, setItemWeight] = useState("Unknown");
  const [ingredients, setIngredients] = useState("Not specified");
  const [dateFirstAvailable, setDateFirstAvailable] = useState("2002-01-09");
  const [createdAt, setCreatedAt] = useState(new Date().toISOString().split("T")[0]);
  const [updatedAt, setUpdatedAt] = useState(new Date().toISOString().split("T")[0]);

  // Arrays
  const [categories, setCategories] = useState(["E-Bike"]);
  const [subCategories, setSubCategories] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [variations, setVariations] = useState([]);
  const [features, setFeatures] = useState([]);
  const [delivery, setDelivery] = useState([]);
  const [buyboxPrices, setBuyboxPrices] = useState([]);
  const [videoUrl, setVideoUrl] = useState("");
  const [imageUrls, setImageUrls] = useState([]); // stored Cloudinary URLs
  const [imageUploading, setImageUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Metadata
  const [rating, setRating] = useState(0);
  const [reviewsCount, setReviewsCount] = useState(0);
  const [numberOfSellers, setNumberOfSellers] = useState(1);
  const [sellerName, setSellerName] = useState("Unknown Seller");
  const [sellerId, setSellerId] = useState("Unknown");
  const [isPlusContent, setIsPlusContent] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);


      const handleCategory = (item) => {
    if (selectedCategories.includes(item)) {


      removeCategory(item)
      return;
    } else {
      setSelectedCategories([...selectedCategories, item]);
    }
  };


    const removeCategory = (item) => {
    setSelectedCategories((prev) => prev.filter((cat) => cat !== item));
  };



  function FadeCategory({ category, onRemove }) {
    const [visible, setVisible] = useState(false);
  
    useEffect(() => {
      const t = setTimeout(() => setVisible(true), 10); // trigger fade-in
      return () => clearTimeout(t);
    }, []);
  
    const handleClick = () => {
      setVisible(false); // trigger fade-out
      setTimeout(() => onRemove(category), 300); // wait for animation before removing
    };
  
    return (
      <div
        onClick={handleClick}
        className={`
          m-1 p-2 rounded-2xl bg-blue-500 w-fit cursor-pointer
          transition-opacity duration-300
          ${visible ? "opacity-100" : "opacity-0"}
        `}
      >
        {category}
      </div>
    );
  }



  // Helper for dynamic array forms
  function arrayAdd(setter, arr, item = "") {
    setter([...arr, item]);
  }
  function arrayRemove(setter, arr, idx) {
    setter(arr.filter((_, i) => i !== idx));
  }
  function arrayUpdate(setter, arr, idx, value) {
    const copy = [...arr];
    copy[idx] = value;
    setter(copy);
  }

  // Cloudinary file upload (unsigned preset)
  async function uploadFilesToCloudinary(files) {
    if (!files || files.length === 0) return;
    setImageUploading(true);
    const uploadedUrls = [];
    try {
      for (let file of files) {
        const fd = new FormData();
        fd.append("file", file);
        fd.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD}/image/upload`,
          {
            method: "POST",
            body: fd,
          }
        );
        const data = await res.json();
        if (data?.secure_url) {
          uploadedUrls.push(data.secure_url);
        } else {
          console.error("Cloudinary upload failed", data);
        }
      }
      // append
      setImageUrls((prev) => [...prev, ...uploadedUrls]);
    } catch (err) {
      console.error("Upload error", err);
      alert("Image upload failed. Check console.");
    } finally {
      setImageUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  // remove image helper
  function removeImageAt(idx) {
    setImageUrls((arr) => arr.filter((_, i) => i !== idx));
  }

  // reorder image (move left or right)
  function moveImage(idx, dir) {
    setImageUrls((arr) => {
      const copy = [...arr];
      const swapIdx = dir === "left" ? idx - 1 : idx + 1;
      if (swapIdx < 0 || swapIdx >= copy.length) return copy;
      const tmp = copy[swapIdx];
      copy[swapIdx] = copy[idx];
      copy[idx] = tmp;
      return copy;
    });
  }

  // generate name_url automatically when title changes
  function onTitleChange(v) {
    setTitle(v);
    setNameUrl(toUrlName(v));
  }

  // submit form
  async function handleSubmit(e) {
    e.preventDefault();

    // build full product object mapping to your schema
    const payload = {
      asin: asin || inputAsin || null,
      availability: String(availability),
      badge: badge || "None",
      bought_past_month: 0,
      brand,
      bs_category: subCategories[0] || "Unknown",
      bs_rank: 0,
      buybox_prices: buyboxPrices.map((p) => ({
        id: uuidv4(),
        price: parseFloat(p) || 0,
      })),
      buybox_seller: sellerName,
      categories,
      country_of_origin: countryOfOrigin,
      currency,
      date_first_available: dateFirstAvailable,
      delivery,
      department,
      description,
      discount,
      features,
      final_price: Number(finalPrice),
      format,
      image_url: imageUrls,
      images: imageUrls,
      images_count: imageUrls.length,
      ingredients,
      initial_price: Number(initialPrice),
      input_asin: inputAsin,
      is_available: !!isAvailable,
      item_weight: itemWeight,
      manufacturer,
      model_number: modelNumber,
      origin_url: originUrl,
      parent_asin: null,
      plus_content: !!isPlusContent,
      product_dimensions: productDimensions,
      product_types: productTypes,
      root_bs_category: "Unknown",
      root_bs_rank: 0,
      seller_id: sellerId,
      sub_categories: subCategories,
      subcategory_rank: 0,
      title,
      upc,
      url: [originUrl],
      variations,
      video: !!videoEnabled,
      video_count: videoEnabled ? 1 : 0,
      name_url: nameUrl,
    };

    // Post to API route
    try {
      const res = await fetch("/api/product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const body = await res.json();
        alert("Product uploaded: " + (body?.id || "ok"));
        // reset or keep values as needed
      } else {
        const err = await res.text();
        console.error("API error", err);
        alert("Upload failed. See console.");
      }
    } catch (err) {
      console.error(err);
      alert("Upload error. See console.");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT: Form (7/12 on large) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl shadow p-6 space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-semibold text-yellow-600">Create Product</h1>
                  <p className="text-sm text-gray-500 mt-1">
                    Fill in all product data. This form maps to your product schema exactly.
                  </p>
                </div>
                <div>
                  <Pill>Draft</Pill>
                </div>
              </div>

              {/* Title & Slug */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => onTitleChange(e.target.value)}
                  className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-yellow-300"
                  placeholder='eg. "Rockrider E-Bike 29" Orange"'
                />
                <div className="flex items-center gap-3">
                  <label className="text-sm text-gray-500">URL slug</label>
                  <input
                    type="text"
                    value={nameUrl}
                    onChange={(e) => setNameUrl(toUrlName(e.target.value))}
                    className="border px-2 py-1 rounded-md text-sm"
                  />
                  <button
                    type="button"
                    className="text-xs text-gray-500 hover:text-yellow-600"
                    onClick={() => setNameUrl(toUrlName(title))}
                  >
                    regenerate
                  </button>
                </div>
              </div>

                     {/* Upload Images */}
                     <div className="mb-6">
  <label className="block font-medium mb-2">Product Images</label>

  <div className="grid grid-cols-3 gap-4">
    {/* Uploaded Images */}
    {imageUrls.map((url, idx) => (
      <div
        key={idx}
        className="relative w-full aspect-square border rounded-lg overflow-hidden group"
      >
        <CldImage
          width="300"
          height="300"
          src={url}
          alt={`Product image ${idx + 1}`}
          className="object-cover w-full h-full"
        />

        {/* X Button */}
        <button
          type="button"
          className="
            absolute top-2 right-2 z-10
            bg-black/60 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm
            transition-opacity duration-200
            opacity-100 md:opacity-0 md:group-hover:opacity-100 hover:bg-white hover:text-black
          "
        >
          ✕
        </button>
      </div>
    ))}

    {/* Upload Button as a Grid Item */}
    <CldUploadWidget
      uploadPreset="my_unsigned_preset"
      onSuccess={(result) => {
        setImageUrls((prev) => [...prev, result.info.secure_url]);
      }}
    >
      {({ open }) => (
        <button
          type="button"
          onClick={() => open()}
          className="
            w-full aspect-square flex items-center justify-center
            border-2 border-dashed border-yellow-500 rounded-lg
            text-yellow-500 text-4xl font-bold
            hover:bg-yellow-50 transition
          "
        >
          +
        </button>
      )}
    </CldUploadWidget>
  </div>
</div>


              {/* Price & availability */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="text-sm text-gray-700">Final price</label>
                  <input
                    type="number"
                    value={finalPrice}
                    onChange={(e) => setFinalPrice(e.target.value)}
                    className="w-full border rounded-md px-3 py-2"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-700">Initial price</label>
                  <input
                    type="number"
                    value={initialPrice}
                    onChange={(e) => setInitialPrice(e.target.value)}
                    className="w-full border rounded-md px-3 py-2"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-700">Discount (%)</label>
                  <input
                    type="text"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    className="w-full border rounded-md px-3 py-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="text-sm text-gray-700">Currency</label>
                  <input value={currency} onChange={(e) => setCurrency(e.target.value)} className="w-full border rounded-md px-3 py-2" />
                </div>
                <div>
                  <label className="text-sm text-gray-700">Availability</label>
                  <input value={availability} onChange={(e) => setAvailability(e.target.value)} className="w-full border rounded-md px-3 py-2" />
                </div>
              </div>

                      {/* Categories */}
                      <div className="mb-4">
                        <div className="mb-6 border-b flex flex-wrap">
                          {selectedCategories.map((category, index) => (
                            <FadeCategory
                              key={category}
                              category={category}
                              onRemove={removeCategory}
                            />
                          ))}
                        </div>
              
                        <div className="flex flex-wrap">
                          {mainCategories.map((category, index) => (
                            <div
                              key={index}
                              className="m-1 p-2 rounded-2xl bg-gray-300 w-fit cursor-pointer"
                              onClick={() => handleCategory(category)}
                            >
                              {category}
                            </div>
                          ))}
                        </div>
                      </div>

              {/* Features (dynamic list) */}
              <div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">Features</label>
                  <button type="button" onClick={() => arrayAdd(setFeatures, features, "")} className="text-sm text-yellow-600">
                    + Add feature
                  </button>
                </div>

                <div className="mt-3 space-y-2">
                  {features.map((f, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input
                        value={f}
                        onChange={(e) => arrayUpdate(setFeatures, features, idx, e.target.value)}
                        className="flex-1 border rounded-md px-3 py-2"
                        placeholder={`Feature #${idx + 1}`}
                      />
                      <button type="button" onClick={() => arrayRemove(setFeatures, features, idx)} className="bg-red-50 text-red-600 rounded px-3">
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* variations, delivery structured like features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:flex">
                <div>
                  <label className="text-sm font-medium text-gray-700">Variations</label>
                  <div className="mt-2 space-y-2">
                    {variations.map((v, i) => (
                      <div key={i} className="flex gap-2">
                        <input value={v} onChange={(e) => arrayUpdate(setVariations, variations, i, e.target.value)} className="flex-1 border rounded-md px-3 py-2" />
                        <button type="button" onClick={() => arrayRemove(setVariations, variations, i)} className="bg-red-50 text-red-600 rounded px-3">Remove</button>
                      </div>
                    ))}
                    <button type="button" onClick={() => arrayAdd(setVariations, variations, "")} className="text-yellow-600 text-sm mt-2">+ Add</button>
                  </div>
                </div>


                <div>
                  <label className="text-sm font-medium text-gray-700">Delivery options</label>
                  <div className="mt-2 space-y-2">
                    {delivery.map((d, i) => (
                      <div key={i} className="flex gap-2">
                        <input value={d} onChange={(e) => arrayUpdate(setDelivery, delivery, i, e.target.value)} className="flex-1 border rounded-md px-3 py-2" placeholder="Delivery option" />
                        <button type="button" onClick={() => arrayRemove(setDelivery, delivery, i)} className="bg-red-50 text-red-600 rounded px-3">Remove</button>
                      </div>
                    ))}
                    <button type="button" onClick={() => arrayAdd(setDelivery, delivery, "")} className="text-yellow-600 text-sm mt-2">+ Add</button>
                  </div>
                </div>
              </div>

              {/* metadata / logistical */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="text-sm text-gray-700">Product Dimensions</label>
                  <input value={productDimensions} onChange={(e) => setProductDimensions(e.target.value)} className="w-full border rounded-md px-3 py-2" />
                </div>
              </div>


              {/* dates */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="text-sm text-gray-700">Date first available</label>
                  <input type="date" value={dateFirstAvailable} onChange={(e) => setDateFirstAvailable(e.target.value)} className="w-full border rounded-md px-3 py-2" />
                </div>
                <div>
                  <label className="text-sm text-gray-700">Unavailable Dates</label>
                  <input type="date" value={createdAt} onChange={(e) => setCreatedAt(e.target.value)} className="w-full border rounded-md px-3 py-2" />
                  at a later time we make a selection for dates unavailable like all weekends or weekdays or summer or winter etc
                </div>
              </div>

              {/* toggles */}
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={amazonChoice} onChange={(e) => setAmazonChoice(e.target.checked)} />
                  <span className="text-sm">Amazon Choice</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={isPlusContent} onChange={(e) => setIsPlusContent(e.target.checked)} />
                  <span className="text-sm">Plus content</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={videoEnabled} onChange={(e) => setVideoEnabled(e.target.checked)} />
                  <span className="text-sm">Video</span>
                </label>
              </div>

              {/* seller info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="text-sm text-gray-700">Seller name</label>
                  <input value={sellerName} onChange={(e) => setSellerName(e.target.value)} className="w-full border rounded-md px-3 py-2" />
                </div>
                <div>
                  <label className="text-sm text-gray-700">Seller id</label>
                  <input value={sellerId} onChange={(e) => setSellerId(e.target.value)} className="w-full border rounded-md px-3 py-2" />
                </div>
                <div>
                  <label className="text-sm text-gray-700">Number of sellers</label>
                  <input type="number" value={numberOfSellers} onChange={(e) => setNumberOfSellers(e.target.value)} className="w-full border rounded-md px-3 py-2" />
                </div>
              </div>

              {/* Technical & extra raw fields */}
              <div>
                <label className="text-sm text-gray-700">Extra fields (JSON)</label>
                <textarea placeholder='Add any extra JSON properties' className="w-full border rounded-md px-3 py-2 h-24" />
              </div>

              {/* submit */}
              <div className="pt-4 border-t flex items-center justify-between">
                <div className="text-sm text-gray-500">When you click Publish we will POST to /api/products</div>
                <button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-md font-semibold shadow">
                  Publish product
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: Live preview / gallery (5/12 on large) */}
          <aside className="lg:col-span-5">
            <div className="bg-white rounded-2xl shadow p-6 sticky top-8 space-y-5">
              {/* gallery */}
              <div className="space-y-3">
                <div className="w-full h-64 bg-gray-100 rounded-lg overflow-hidden relative">
                  {imageUrls[0] ? (
                    <img src={imageUrls[0]} alt="main" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">No main image yet</div>
                  )}
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="h-20 rounded overflow-hidden border">
                      {imageUrls[i] ? <img src={imageUrls[i]} alt={`thumb-${i}`} className="w-full h-full object-cover" /> : <div className="h-full flex items-center justify-center text-gray-300">+</div>}
                    </div>
                  ))}
                </div>
              </div>

              {/* title + price */}
              <div>
                <h2 className="text-xl font-semibold">{title}</h2>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-2xl font-bold text-yellow-600">${finalPrice}</span>
                  <span className="text-sm line-through text-gray-400">${initialPrice}</span>
                  <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded">{discount}% off</span>
                </div>
                <p className="mt-3 text-gray-600 text-sm whitespace-pre-line">{description.slice(0, 220)}{description.length > 220 ? "..." : ""}</p>
              </div>

              {/* quick meta */}
              <div className="flex items-center gap-4 pt-4 border-t">
                <div>
                  <div className="text-xs text-gray-500">Brand</div>
                  <div className="text-sm font-medium">{brand}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">ASIN</div>
                  <div className="text-sm font-medium">{asin}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Availability</div>
                  <div className="text-sm font-medium">{isAvailable ? "In stock" : "Out of stock"}</div>
                </div>
              </div>

              {/* features preview */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700">Features</h3>
                <ul className="mt-2 grid grid-cols-1 gap-1 text-sm text-gray-600">
                  {features.length === 0 ? <li className="text-gray-400">No features added</li> : features.map((f, i) => <li key={i}>• {f}</li>)}
                </ul>
              </div>

              {/* meta list */}
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                <div>
                  <div className="text-xs text-gray-500">Weight</div>
                  <div className="font-medium">{itemWeight}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Dimensions</div>
                  <div className="font-medium">{productDimensions}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Manufacturer</div>
                  <div className="font-medium">{manufacturer}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">SKU / UPC</div>
                  <div className="font-medium">{upc}</div>
                </div>
              </div>

              {/* small actions */}
              <div className="flex items-center gap-3 pt-4 border-t">
                <button type="button" className="text-sm text-yellow-600 hover:underline">Preview on site</button>
                <button type="button" className="text-sm text-gray-500">Duplicate</button>
                <button type="button" className="text-sm text-gray-500">Save draft</button>
              </div>
            </div>
          </aside>
        </form>
      </div>
    </div>
  );
}
