import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Star, Minus } from 'lucide-react';
import { addToCart, updateCartQuantity, removeFromCart, getCart } from '../services/api';
import toast from 'react-hot-toast';
import { useCart } from '../contexts/CartContext';

const ProductCard = ({ product }) => {
    const { fetchCart } = useCart();
    const [quantity, setQuantity] = useState(0);
    const [loading, setLoading] = useState(false);

    // Get user from localStorage
    const getUserId = () => {
        const user = localStorage.getItem('user');
        if (user) {
            try {
                return JSON.parse(user)._id;
            } catch (e) {
                return null;
            }
        }
        return null;
    };

    // Load cart quantity on mount
    useEffect(() => {
        const loadCartQuantity = async () => {
            const userId = getUserId();
            if (!userId) return;

            try {
                const response = await getCart(userId);
                const cartItem = response.data.cart?.items?.find(
                    item => item.productId._id === product._id || item.productId === product._id
                );
                if (cartItem) {
                    setQuantity(cartItem.quantity);
                }
            } catch (error) {
                // Cart might not exist yet, that's okay
                console.log('Cart not loaded:', error.message);
            }
        };

        loadCartQuantity();
    }, [product._id]);

    const handleAddToCart = async () => {
        const userId = getUserId();
        if (!userId) {
            toast.error('Please login to add items to cart');
            return;
        }

        setLoading(true);
        try {
            await addToCart(userId, product._id, 1);
            setQuantity(1);
            await fetchCart(); // Update global cart count
            toast.success(`${product.name} added to cart!`);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to add to cart');
        } finally {
            setLoading(false);
        }
    };

    const handleIncrease = async () => {
        const userId = getUserId();
        if (!userId) {
            toast.error('Please login to update cart');
            return;
        }

        setLoading(true);
        try {
            const newQuantity = quantity + 1;
            await updateCartQuantity(userId, product._id, newQuantity);
            setQuantity(newQuantity);
            await fetchCart(); // Update global cart count
            toast.success('Quantity updated');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update quantity');
        } finally {
            setLoading(false);
        }
    };

    const handleDecrease = async () => {
        const userId = getUserId();
        if (!userId) {
            toast.error('Please login to update cart');
            return;
        }

        setLoading(true);
        try {
            if (quantity === 1) {
                // Remove from cart
                await removeFromCart(userId, product._id);
                setQuantity(0);
                toast.success('Removed from cart');
            } else {
                const newQuantity = quantity - 1;
                await updateCartQuantity(userId, product._id, newQuantity);
                setQuantity(newQuantity);
                toast.success('Quantity updated');
            }
            await fetchCart(); // Update global cart count
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update quantity');
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -5 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 relative group overflow-hidden border border-gray-100"
        >
            <div className="relative h-48 mb-4 rounded-2xl overflow-hidden">
                <img
                    src={product.image || 'https://placehold.co/400x400/6366f1/white?text=No+Image'}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                    <span className={`text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-wider text-white ${product.foodType === 'VEG' ? 'bg-green-500' :
                        product.foodType === 'NON_VEG' ? 'bg-red-500' : 'bg-orange-500'
                        }`}>
                        {product.foodType === 'VEG' ? 'VEG' : product.foodType === 'NON_VEG' ? 'NON-VEG' : 'EGG'}
                    </span>
                </div>
                {product.rating && (
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 text-xs font-bold shadow-sm">
                        <Star className="w-3 h-3 text-orange-400 fill-orange-400" />
                        {product.rating.average || product.rating}
                    </div>
                )}
            </div>

            <div className="flex justify-between items-start mb-2">
                <div>
                    <h3 className="text-lg font-bold text-secondary line-clamp-1 group-hover:text-primary transition-colors">
                        {product.name}
                    </h3>
                    <p className="text-xs text-text-light line-clamp-2 mt-1 h-8">
                        {product.description}
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                <span className="text-xl font-black text-secondary">
                    ₹{product.price}
                </span>

                {quantity === 0 ? (
                    <button
                        onClick={handleAddToCart}
                        disabled={loading}
                        className="bg-primary text-white px-4 py-2.5 rounded-xl hover:bg-primary-hover transition-colors shadow-lg shadow-primary/30 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-bold text-sm"
                    >
                        <Plus className="w-4 h-4" />
                        Add
                    </button>
                ) : (
                    <div className="flex items-center gap-2 bg-primary/10 rounded-xl p-1">
                        <button
                            onClick={handleDecrease}
                            disabled={loading}
                            className="bg-primary text-white p-2 rounded-lg hover:bg-primary-hover transition-colors active:scale-95 disabled:opacity-50"
                        >
                            <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-black text-secondary w-8 text-center">
                            {quantity}
                        </span>
                        <button
                            onClick={handleIncrease}
                            disabled={loading}
                            className="bg-primary text-white p-2 rounded-lg hover:bg-primary-hover transition-colors active:scale-95 disabled:opacity-50"
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default ProductCard;
