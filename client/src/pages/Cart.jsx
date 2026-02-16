import React, { useState, useEffect } from 'react';
import { useCart } from '../contexts/CartContext';
import Navbar from '../components/Navbar';
import { getCart, updateCartQuantity, removeFromCart, clearCart } from '../services/api';
import { Trash2, ShoppingBag, Plus, Minus, X } from 'lucide-react';
import { Link } from "react-router-dom"

const CartPage = () => {
  const { fetchCart } = useCart();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      setLoading(true);
      setError(null);
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        setError('Please login to view your cart');
        setLoading(false);
        return;
      }
      const response = await getCart(user._id);
      setCart(response.data.cart);
    } catch (err) {
      console.error('Failed to load cart:', err);
      setError(err.response?.data?.message || 'Failed to load cart');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      setUpdating(true);
      const user = JSON.parse(localStorage.getItem('user'));
      const response = await updateCartQuantity(user._id, productId, newQuantity);
      setCart(response.data.cart);
      fetchCart(); // Update global cart context
    } catch (err) {
      console.error('Failed to update quantity:', err);
      alert('Failed to update quantity');
    } finally {
      setUpdating(false);
    }
  };

  const handleRemoveItem = async (productId) => {
    if (!window.confirm('Remove this item from cart?')) return;

    try {
      setUpdating(true);
      const user = JSON.parse(localStorage.getItem('user'));
      const response = await removeFromCart(user._id, productId);
      setCart(response.data.cart);
      fetchCart(); // Update global cart context
    } catch (err) {
      console.error('Failed to remove item:', err);
      alert('Failed to remove item');
    } finally {
      setUpdating(false);
    }
  };

  const handleClearCart = async () => {
    if (!window.confirm('Clear all items from cart?')) return;

    try {
      setUpdating(true);
      const user = JSON.parse(localStorage.getItem('user'));
      const response = await clearCart(user._id);
      setCart(response.data.cart);
      fetchCart(); // Update global cart context
    } catch (err) {
      console.error('Failed to clear cart:', err);
      alert('Failed to clear cart');
    } finally {
      setUpdating(false);
    }
  };

  const calculateSubtotal = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const tax = subtotal * 0.1; // 10% tax
    return subtotal + tax;
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
          <div className="container mx-auto px-4 pt-28 pb-12">
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-slate-300 border-t-indigo-600 mb-4"></div>
                <p className="text-slate-600 font-medium">Loading your cart...</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
          <div className="container mx-auto px-4 pt-28 pb-12">
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center bg-white rounded-2xl shadow-lg p-8 max-w-md">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <X className="w-8 h-8 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Error</h2>
                <p className="text-slate-600 mb-6">{error}</p>
                <button
                  onClick={loadCart}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  const isEmpty = !cart || !cart.items || cart.items.length === 0;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 mt-20 pt-10">
        <div className="container mx-auto px-4 pt-28 pb-12">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2 flex items-center gap-3">
              <ShoppingBag className="w-10 h-10 text-indigo-600" />
              Shopping Cart
            </h1>
            <p className="text-slate-600 text-lg">
              {isEmpty ? 'Your cart is waiting to be filled' : `${cart.items.length} item${cart.items.length !== 1 ? 's' : ''} in your cart`}
            </p>
          </div>

          {isEmpty ? (
            /* Empty State */
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center bg-white rounded-2xl shadow-lg p-12 max-w-md">
                <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShoppingBag className="w-12 h-12 text-indigo-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-3">Your cart is empty</h2>
                <p className="text-slate-600 mb-8">Start adding some delicious items to your cart!</p>
                <a
                  href="/"
                  className="inline-block px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
                >
                  Browse Restaurants
                </a>
              </div>
            </div>
          ) : (
            /* Cart Content */
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {/* Clear Cart Button */}
                <div className="flex justify-end mb-4">
                  <button
                    onClick={handleClearCart}
                    disabled={updating}
                    className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium disabled:opacity-50"
                  >
                    <Trash2 className="w-4 h-4" />
                    Clear Cart
                  </button>
                </div>

                {cart.items.map((item) => {
                  const product = item.productId;
                  const isPopulated = product && typeof product === 'object';

                  return (
                    <div
                      key={isPopulated ? product._id : item.productId}
                      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 border border-slate-200"
                    >
                      <div className="flex flex-col sm:flex-row gap-6">
                        {/* Product Image */}
                        <div className="w-full sm:w-32 h-32 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                          {isPopulated && product.image ? (
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <ShoppingBag className="w-12 h-12 text-indigo-600" />
                          )}
                        </div>

                        {/* Product Details */}
                        <div className="flex-grow">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="text-xl font-bold text-slate-900 mb-1">
                                {isPopulated ? product.name : `Product #${item.productId.slice(-6)}`}
                              </h3>
                              {isPopulated && product.description && (
                                <p className="text-sm text-slate-500 mb-2">{product.description}</p>
                              )}
                              <p className="text-slate-600">
                                ${item.price.toFixed(2)} each
                              </p>
                            </div>
                            <button
                              onClick={() => handleRemoveItem(isPopulated ? product._id : item.productId)}
                              disabled={updating}
                              className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors disabled:opacity-50"
                              title="Remove item"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 bg-slate-100 rounded-lg p-1">
                              <button
                                onClick={() => handleUpdateQuantity(isPopulated ? product._id : item.productId, item.quantity - 1)}
                                disabled={updating || item.quantity <= 1}
                                className="w-8 h-8 flex items-center justify-center bg-white rounded-md hover:bg-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <Minus className="w-4 h-4 text-slate-700" />
                              </button>
                              <span className="w-12 text-center font-semibold text-slate-900">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => handleUpdateQuantity(isPopulated ? product._id : item.productId, item.quantity + 1)}
                                disabled={updating}
                                className="w-8 h-8 flex items-center justify-center bg-white rounded-md hover:bg-slate-200 transition-colors disabled:opacity-50"
                              >
                                <Plus className="w-4 h-4 text-slate-700" />
                              </button>
                            </div>

                            {/* Item Total */}
                            <div className="text-right">
                              <p className="text-sm text-slate-600 mb-1">Item Total</p>
                              <p className="text-2xl font-bold text-indigo-600">
                                ${(item.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24 border border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Order Summary</h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-slate-700">
                      <span>Subtotal</span>
                      <span className="font-semibold">${calculateSubtotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-slate-700">
                      <span>Tax (10%)</span>
                      <span className="font-semibold">${(calculateSubtotal() * 0.1).toFixed(2)}</span>
                    </div>
                    <div className="border-t border-slate-200 pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-slate-900">Total</span>
                        <span className="text-3xl font-bold text-indigo-600">
                          ${calculateTotal().toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Link to="/checkout">
                    <button
                      disabled={updating}
                      className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-bold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >

                      Proceed to Checkout
                    </button>
                  </Link>
                  <Link to="/">
                    <button
                      className="w-full mt-3 py-3 bg-slate-100 text-slate-700 rounded-lg font-semibold hover:bg-slate-200 transition-colors"
                    >
                      Continue Shopping
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartPage;