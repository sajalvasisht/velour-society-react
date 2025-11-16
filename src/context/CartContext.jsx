import React, { createContext, useContext, useState, useEffect } from 'react';

// This is the global "brain"
const CartContext = createContext();

// This is a helper hook to easily use the context
export const useCart = () => {
  return useContext(CartContext);
};

// --- Helper functions to read/write from localStorage ---
const getStoredCart = () => {
  try {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  } catch (error) {
    console.error("Error parsing cart from localStorage", error);
    return [];
  }
};
const saveStoredCart = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

// This is the "Provider" component that wraps your whole app
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(getStoredCart());

  // This ensures all browser tabs stay in sync
  useEffect(() => {
    const handleStorageChange = () => {
      setCart(getStoredCart());
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // This is the main logic function
  const updateCart = (product, change) => {
    const newCart = getStoredCart();
    let itemInCart = newCart.find(i => i.name === product.name);

    if (itemInCart) {
      itemInCart.qty += change;
      if (itemInCart.qty <= 0) {
        const itemIndex = newCart.findIndex(i => i.name === product.name);
        newCart.splice(itemIndex, 1);
      }
    } else if (change > 0) {
      newCart.push({ ...product, qty: change });
    }

    saveStoredCart(newCart);
    setCart(newCart); // This updates the state for ALL components
  };

  const getItemQty = (productName) => {
    const item = cart.find(i => i.name === productName);
    return item ? item.qty : 0;
  };

  const value = {
    cart,
    updateCart,
    getItemQty,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};