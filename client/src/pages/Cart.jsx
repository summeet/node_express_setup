import React from 'react';
import { useCart } from '../contexts/CartContext';
import Navbar from '../components/Navbar';

const CartPage = () => {
  const { cart } = useCart();

  return (
    <>
      <Navbar />
      <div className="container py-20">
        <h1 className="text-4xl font-bold mb-10">Your Cart</h1>
        {cart && cart.products.length > 0 ? (
          <div>
            {cart.products.map(item => (
              <div key={item.product._id} className="flex items-center justify-between border-b py-4">
                <div>
                  <h2 className="text-xl font-semibold">{item.product.name}</h2>
                  <p className="text-gray-500">Quantity: {item.quantity}</p>
                </div>
                <p className="text-lg font-bold">${(item.product.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
            <div className="text-right mt-6">
              <h2 className="text-2xl font-bold">Total: ${cart.totalPrice.toFixed(2)}</h2>
            </div>
          </div>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
    </>
  );
};

export default CartPage;