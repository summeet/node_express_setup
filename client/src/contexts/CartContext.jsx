import React, { createContext, useState, useContext, useEffect, useEffectEvent } from 'react';
import { getCart, addToCart as addToCartApi } from '../services/api';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  const onAuthenticated = useEffectEvent(() => {
      fetchCart();
  })

  const fetchCart = async () => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    if (token) {
      try {
        const response = await getCart(user._id);
        setCart(response.data.cart);
        setCartCount(response.data.cart.items.reduce((acc, item) => acc + item.quantity, 0));
      } catch (error) {
        console.error('Failed to fetch cart:', error);
      }
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      const response = await addToCartApi(productId, quantity);
      setCart(response.data);
      setCartCount(response.data.products.reduce((acc, item) => acc + item.quantity, 0));
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  useEffect(() => {
    onAuthenticated();
  }, []);


  return (
    <CartContext.Provider value={{ cart, cartCount, addToCart, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};