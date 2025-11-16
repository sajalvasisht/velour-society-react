import React from 'react';
// <-- IMPORT FROM THE NEW LOCATION
import { useCart } from '../context/CartContext'; 

// This is the component for the +/- quantity controls
const QuantityControl = ({ product, qty }) => {
  const { updateCart } = useCart();
  return (
    <div className="quantity-selector">
      <button className="decrease" onClick={() => updateCart(product, -1)}>–</button>
      <span className="qty">{qty}</span>
      <button className="increase" onClick={() => updateCart(product, 1)}>+</button>
    </div>
  );
};

// This is the main button component
const AddToCartButton = ({ product, className = 'add-to-cart' }) => {
  const { getItemQty, updateCart } = useCart();
  const quantity = getItemQty(product.name);

  if (quantity === 0) {
    return (
      <button 
        className={className} 
        onClick={() => updateCart(product, 1)}
      >
        Add to Cart
      </button>
    );
  }

  return <QuantityControl product={product} qty={quantity} />;
};

export default AddToCartButton;