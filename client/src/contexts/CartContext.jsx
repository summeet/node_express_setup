import React, { createContext, useState, useContext, useEffect } from 'react';
import { getCart, addToCart as addToCartApi } from '../services/api';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  const fetchCart = async () => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (token && user) {
      try {
        const userId = user._id || user.id;
        const response = await getCart(userId);
        const cartData = response.data.cart;
        setCart(cartData);
      } catch (error) {
        console.error('Failed to fetch cart:', error);
      }
    }
  };

  // Automatically update cartCount whenever cart changes
  useEffect(() => {
    if (cart && cart.items) {
      setCartCount(cart.items.reduce((acc, item) => acc + item.quantity, 0));
    } else {
      setCartCount(0);
    }
  }, [cart]);

  const addToCart = async (productId, quantity = 1) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return;

    try {
      const userId = user._id || user.id;
      const response = await addToCartApi(userId, productId, quantity);
      setCart(response.data.cart);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);


  return (
    <CartContext.Provider value={{ cart, cartCount, addToCart, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};