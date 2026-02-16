import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCart, createOrder, clearCart, getDefaultAddress, getAddressesByUserId } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MapPin,
    CreditCard,
    Wallet,
    Smartphone,
    Truck,
    ShoppingBag,
    CheckCircle,
    AlertCircle,
    ArrowLeft,
    ChevronRight,
    Home,
    Briefcase,
    X
} from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const Checkout = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [orderNumber, setOrderNumber] = useState('');
    const [savedAddresses, setSavedAddresses] = useState([]);
    const [isSelectingAddress, setIsSelectingAddress] = useState(false);

    const { cart, fetchCart } = useCart()

    // Form state
    const [deliveryAddress, setDeliveryAddress] = useState({
        name: '',
        phone: '',
        addressLine: '',
        city: '',
        state: '',
        pinCode: '',
        country: 'India'
    });
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        loadUserData();
        fetchUserAddresses();
    }, []);

    const fetchUserAddresses = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const [defaultRes, allRes] = await Promise.all([
                getDefaultAddress(user._id),
                getAddressesByUserId(user._id)
            ]);

            const { address } = defaultRes.data;
            setSavedAddresses(allRes.data.addresses);

            if (address) {
                let defaultAddr = {
                    addressLine: address.address,
                    city: address.city,
                    state: address.state,
                    pinCode: address.pinCode,
                    country: address.country
                };
                setDeliveryAddress(prev => ({
                    ...prev,
                    ...defaultAddr
                }));
            }
        } catch (err) {
            console.error('Failed to fetch user addresses:', err);
            // Don't set error if it's just no default address found
            if (err.response?.status !== 404) {
                setError('Failed to fetch user addresses. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSelectSavedAddress = (addr) => {
        setDeliveryAddress(prev => ({
            ...prev,
            addressLine: addr.address,
            city: addr.city,
            state: addr.state,
            pinCode: addr.pinCode.toString(),
            country: addr.country
        }));
        setIsSelectingAddress(false);
    };

    const loadUserData = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setDeliveryAddress(prev => ({
                ...prev,
                name: user.name || '',
                phone: user.contact || ''
            }));
        }
    };

    const calculateSubtotal = () => {
        if (!cart || !cart.items) return 0;
        return cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const calculateTax = () => {
        return calculateSubtotal() * 0.1; // 10% tax
    };

    const calculateDeliveryFee = () => {
        return calculateSubtotal() > 500 ? 0 : 50; // Free delivery above ₹500
    };

    const calculateTotal = () => {
        return calculateSubtotal() + calculateTax() + calculateDeliveryFee();
    };

    const validateForm = () => {
        const errors = {};
        console.log('deliveryAddress', deliveryAddress)
        if (!deliveryAddress.name.trim()) errors.name = 'Name is required';
        if (!deliveryAddress.phone) errors.phone = 'Phone is required';
        else if (!/^\d{10}$/.test(deliveryAddress.phone)) errors.phone = 'Invalid phone number';
        if (!deliveryAddress.addressLine.trim()) errors.addressLine = 'Address is required';
        if (!deliveryAddress.city.trim()) errors.city = 'City is required';
        if (!deliveryAddress.state.trim()) errors.state = 'State is required';
        if (!deliveryAddress.pinCode || !/^\d{6}$/.test(deliveryAddress.pinCode.toString())) errors.pinCode = 'Invalid PIN code';

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDeliveryAddress(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error for this field
        if (formErrors[name]) {
            setFormErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handlePlaceOrder = async () => {
        if (!validateForm()) {
            return;
        }

        try {
            setSubmitting(true);
            setError(null);
            const user = JSON.parse(localStorage.getItem('user'));

            const orderData = {
                userId: user._id,
                deliveryAddress,
                items: cart.items.map(item => ({
                    productId: typeof item.productId === 'object' ? item.productId._id : item.productId,
                    quantity: item.quantity
                })),
                paymentMethod,
                pricing: {
                    subtotal: calculateSubtotal(),
                    discount: 0,
                    tax: calculateTax(),
                    deliveryFee: calculateDeliveryFee(),
                    total: calculateTotal()
                },
                orderNumber: `ORD${Date.now()}${Math.floor(Math.random() * 1000)}`
            };

            const response = await createOrder(orderData);

            // Clear cart after successful order
            await clearCart(user._id);
            await fetchCart(); // Reset global cart count

            setOrderNumber(response.data.order.orderNumber);
            setOrderSuccess(true);
        } catch (err) {
            console.error('Failed to place order:', err);
            setError(err.response?.data?.message || 'Failed to place order. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <>
                <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
                    <div className="container mx-auto px-4 pt-28 pb-12">
                        <div className="flex items-center justify-center min-h-[400px]">
                            <div className="text-center">
                                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-slate-300 border-t-indigo-600 mb-4"></div>
                                <p className="text-slate-600 font-medium">Loading checkout...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    if (orderSuccess) {
        return (
            <>
                <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
                    <div className="container mx-auto px-4 pt-28 pb-12 ">
                        <div className="max-w-2xl mx-auto pt-20">
                            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center mt-20">
                                <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle className="w-12 h-12 text-green-600" />
                                </div>
                                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
                                    Order Placed Successfully!
                                </h1>
                                <p className="text-lg text-slate-600 mb-6">
                                    Thank you for your order. Your order has been confirmed.
                                </p>
                                <div className="bg-slate-50 rounded-xl p-6 mb-8">
                                    <p className="text-sm text-slate-600 mb-2">Order Number</p>
                                    <p className="text-2xl font-bold text-indigo-600">{orderNumber}</p>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <button
                                        onClick={() => navigate('/')}
                                        className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
                                    >
                                        Continue Shopping
                                    </button>
                                    <button
                                        onClick={() => navigate('/orders')}
                                        className="px-8 py-3 bg-slate-100 text-slate-700 rounded-lg font-semibold hover:bg-slate-200 transition-colors"
                                    >
                                        View Orders
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 mt-20 pt-10">
                <div className="container mx-auto px-4 pt-28 pb-12">
                    {/* Header */}
                    <div className="mb-8">
                        <button
                            onClick={() => navigate('/cart')}
                            className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 mb-4 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Back to Cart
                        </button>
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">
                            Checkout
                        </h1>
                        <p className="text-slate-600 text-lg">
                            Complete your order
                        </p>
                    </div>

                    {error && (
                        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                            <p className="text-red-800">{error}</p>
                        </div>
                    )}

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Main Form */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Delivery Address */}
                            <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                                            <MapPin className="w-5 h-5 text-indigo-600" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-slate-900 mb-0">Delivery Address</h2>
                                    </div>
                                    {savedAddresses.length > 0 && (
                                        <button
                                            onClick={() => setIsSelectingAddress(true)}
                                            className="text-indigo-600 font-bold hover:text-indigo-700 transition-colors flex items-center gap-1"
                                        >
                                            Change
                                            <ChevronRight className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={deliveryAddress.name}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border ${formErrors.name ? 'border-red-300' : 'border-slate-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all`}
                                            placeholder="John Doe"
                                        />
                                        {formErrors.name && (
                                            <p className="text-red-600 text-sm mt-1">{formErrors.name}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                                            Phone Number *
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={deliveryAddress.phone}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border ${formErrors.phone ? 'border-red-300' : 'border-slate-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all`}
                                            placeholder="9876543210"
                                        />
                                        {formErrors.phone && (
                                            <p className="text-red-600 text-sm mt-1">{formErrors.phone}</p>
                                        )}
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                                            Address *
                                        </label>
                                        <textarea
                                            name="addressLine"
                                            value={deliveryAddress.addressLine}
                                            onChange={handleInputChange}
                                            rows="3"
                                            className={`w-full px-4 py-3 border ${formErrors.addressLine ? 'border-red-300' : 'border-slate-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all`}
                                            placeholder="House/Flat No., Street, Area"
                                        />
                                        {formErrors.addressLine && (
                                            <p className="text-red-600 text-sm mt-1">{formErrors.addressLine}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                                            City *
                                        </label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={deliveryAddress.city}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border ${formErrors.city ? 'border-red-300' : 'border-slate-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all`}
                                            placeholder="Mumbai"
                                        />
                                        {formErrors.city && (
                                            <p className="text-red-600 text-sm mt-1">{formErrors.city}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                                            State *
                                        </label>
                                        <input
                                            type="text"
                                            name="state"
                                            value={deliveryAddress.state}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border ${formErrors.state ? 'border-red-300' : 'border-slate-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all`}
                                            placeholder="Maharashtra"
                                        />
                                        {formErrors.state && (
                                            <p className="text-red-600 text-sm mt-1">{formErrors.state}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                                            PIN Code *
                                        </label>
                                        <input
                                            type="text"
                                            name="pinCode"
                                            value={deliveryAddress.pinCode}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border ${formErrors.pinCode ? 'border-red-300' : 'border-slate-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all`}
                                            placeholder="400001"
                                        />
                                        {formErrors.pinCode && (
                                            <p className="text-red-600 text-sm mt-1">{formErrors.pinCode}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                                            Country *
                                        </label>
                                        <input
                                            type="text"
                                            name="country"
                                            value={deliveryAddress.country}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-slate-50 outline-none"
                                            readOnly
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Payment Method */}
                            <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                                        <CreditCard className="w-5 h-5 text-indigo-600" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-slate-900">Payment Method</h2>
                                </div>

                                <div className="space-y-3">
                                    {/* Cash on Delivery */}
                                    <label className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-indigo-600 bg-indigo-50' : 'border-slate-200 hover:border-slate-300'}`}>
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="cod"
                                            checked={paymentMethod === 'cod'}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            className="w-5 h-5 text-indigo-600"
                                        />
                                        <Truck className="w-6 h-6 text-slate-600" />
                                        <div className="flex-grow">
                                            <p className="font-semibold text-slate-900">Cash on Delivery</p>
                                            <p className="text-sm text-slate-600">Pay when you receive</p>
                                        </div>
                                    </label>

                                    {/* Card Payment */}
                                    <label className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-indigo-600 bg-indigo-50' : 'border-slate-200 hover:border-slate-300'}`}>
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="card"
                                            checked={paymentMethod === 'card'}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            className="w-5 h-5 text-indigo-600"
                                        />
                                        <CreditCard className="w-6 h-6 text-slate-600" />
                                        <div className="flex-grow">
                                            <p className="font-semibold text-slate-900">Credit/Debit Card</p>
                                            <p className="text-sm text-slate-600">Visa, Mastercard, Rupay</p>
                                        </div>
                                    </label>

                                    {/* UPI */}
                                    <label className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${paymentMethod === 'upi' ? 'border-indigo-600 bg-indigo-50' : 'border-slate-200 hover:border-slate-300'}`}>
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="upi"
                                            checked={paymentMethod === 'upi'}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            className="w-5 h-5 text-indigo-600"
                                        />
                                        <Smartphone className="w-6 h-6 text-slate-600" />
                                        <div className="flex-grow">
                                            <p className="font-semibold text-slate-900">UPI</p>
                                            <p className="text-sm text-slate-600">Google Pay, PhonePe, Paytm</p>
                                        </div>
                                    </label>

                                    {/* Wallet */}
                                    <label className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${paymentMethod === 'wallet' ? 'border-indigo-600 bg-indigo-50' : 'border-slate-200 hover:border-slate-300'}`}>
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="wallet"
                                            checked={paymentMethod === 'wallet'}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            className="w-5 h-5 text-indigo-600"
                                        />
                                        <Wallet className="w-6 h-6 text-slate-600" />
                                        <div className="flex-grow">
                                            <p className="font-semibold text-slate-900">Wallet</p>
                                            <p className="text-sm text-slate-600">Paytm, Amazon Pay</p>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24 border border-slate-200">
                                <h2 className="text-2xl font-bold text-slate-900 mb-6">Order Summary</h2>

                                {/* Items */}
                                <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                                    {cart && cart.items.map((item, index) => {
                                        const product = item.productId;
                                        const isPopulated = product && typeof product === 'object';
                                        return (
                                            <div key={index} className="flex items-center gap-3 pb-3 border-b border-slate-100">
                                                <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                    <ShoppingBag className="w-8 h-8 text-indigo-600" />
                                                </div>
                                                <div className="flex-grow">
                                                    <p className="font-semibold text-slate-900 text-sm">
                                                        {isPopulated ? product.name : `Product #${item.productId.slice(-6)}`}
                                                    </p>
                                                    <p className="text-xs text-slate-600">Qty: {item.quantity}</p>
                                                </div>
                                                <p className="font-bold text-slate-900">
                                                    ₹{(item.price * item.quantity).toFixed(2)}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Pricing */}
                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-slate-700">
                                        <span>Subtotal</span>
                                        <span className="font-semibold">₹{calculateSubtotal().toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-700">
                                        <span>Tax (10%)</span>
                                        <span className="font-semibold">₹{calculateTax().toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-700">
                                        <span>Delivery Fee</span>
                                        <span className="font-semibold">
                                            {calculateDeliveryFee() === 0 ? (
                                                <span className="text-green-600">FREE</span>
                                            ) : (
                                                `₹${calculateDeliveryFee().toFixed(2)}`
                                            )}
                                        </span>
                                    </div>
                                    {calculateSubtotal() < 500 && (
                                        <p className="text-xs text-slate-600 bg-slate-50 p-2 rounded">
                                            Add ₹{(500 - calculateSubtotal()).toFixed(2)} more for free delivery
                                        </p>
                                    )}
                                    <div className="border-t border-slate-200 pt-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-lg font-bold text-slate-900">Total</span>
                                            <span className="text-3xl font-bold text-indigo-600">
                                                ₹{calculateTotal().toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={handlePlaceOrder}
                                    disabled={submitting}
                                    className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-bold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                >
                                    {submitting ? 'Placing Order...' : 'Place Order'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Address Selection Modal */}
            <AnimatePresence>
                {isSelectingAddress && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsSelectingAddress(false)}
                            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative z-10"
                        >
                            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                                <h3 className="text-xl font-bold text-slate-900">Select Delivery Address</h3>
                                <button
                                    onClick={() => setIsSelectingAddress(false)}
                                    className="p-2 hover:bg-slate-50 rounded-full transition-colors"
                                >
                                    <X className="w-5 h-5 text-slate-400" />
                                </button>
                            </div>

                            <div className="p-6 max-h-[60vh] overflow-y-auto space-y-4">
                                {savedAddresses.map((addr) => (
                                    <button
                                        key={addr._id}
                                        onClick={() => handleSelectSavedAddress(addr)}
                                        className="w-full text-left p-4 rounded-2xl border-2 border-slate-100 hover:border-indigo-600 hover:bg-indigo-50/50 transition-all group flex gap-4"
                                    >
                                        <div className="p-3 bg-slate-100 rounded-xl group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                                            {addr.label === 'home' ? <Home className="w-5 h-5" /> :
                                                addr.label === 'work' ? <Briefcase className="w-5 h-5" /> :
                                                    <MapPin className="w-5 h-5" />}
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-900 capitalize mb-1">{addr.label}</p>
                                            <p className="text-sm text-slate-600 line-clamp-2">
                                                {addr.address}, {addr.city}, {addr.state} - {addr.pinCode}
                                            </p>
                                        </div>
                                    </button>
                                ))}

                                <button
                                    onClick={() => navigate('/saved-addresses')}
                                    className="w-full p-4 rounded-2xl border-2 border-dashed border-slate-200 text-slate-500 font-bold hover:border-indigo-600 hover:text-indigo-600 transition-all flex items-center justify-center gap-2"
                                >
                                    <MapPin className="w-5 h-5" />
                                    Manage Addresses
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Checkout;