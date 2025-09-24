// components/ProductCard.js

import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.image_url[0]} alt={product.title} className="product-image" />
      <h3 className="product-title">{product.title}</h3>
      <p className="product-brand">{product.brand}</p>
      <p className="product-description">{product.description}</p>
      <p className="product-price">€{product.final_price}</p>
      <p className="product-availability">{product.availability}</p>
      <p className="product-rating">{product.rating} ⭐</p>
      <button className="rent-button">Rent Now</button>
    </div>
  );
};

export default ProductCard2;
