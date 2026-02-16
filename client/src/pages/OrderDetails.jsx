import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOrderById } from '../services/api';
import { motion } from 'framer-motion';
import {
    Package,
    ChevronRight,
    MapPin,
    CreditCard,
    Clock,
    Truck,
    CheckCircle,
    AlertCircle,
    ArrowLeft,
    Phone,
    Mail,
    User,
    Calendar,
    ShoppingBag,
    Printer
} from 'lucide-react';
import { format } from 'date-fns';

const OrderDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchOrderDetails();
    }, [id]);

    const fetchOrderDetails = async () => {
        try {
            setLoading(true);
            const response = await getOrderById(id);
            setOrder(response.data.order);
        } catch (err) {
            console.error('Failed to fetch order details:', err);
            setError('Failed to load order details. It might have been deleted or the link is invalid.');
        } finally {
            setLoading(false);
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'active': return <Clock className="w-6 h-6 text-blue-500" />;
            case 'processing': return <Package className="w-6 h-6 text-purple-500" />;
            case 'shipped': return <Truck className="w-6 h-6 text-orange-500" />;
            case 'delivered': return <CheckCircle className="w-6 h-6 text-green-500" />;
            case 'completed': return <CheckCircle className="w-6 h-6 text-green-600" />;
            case 'cancelled': return <AlertCircle className="w-6 h-6 text-red-500" />;
            default: return <Clock className="w-6 h-6 text-gray-500" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return 'text-blue-600 bg-blue-50 border-blue-100';
            case 'processing': return 'text-purple-600 bg-purple-50 border-purple-100';
            case 'shipped': return 'text-orange-600 bg-orange-50 border-orange-100';
            case 'delivered': return 'text-green-600 bg-green-50 border-green-100';
            case 'completed': return 'text-green-700 bg-green-100 border-green-200';
            case 'cancelled': return 'text-red-600 bg-red-50 border-red-100';
            default: return 'text-gray-600 bg-gray-50 border-gray-100';
        }
    };

    if (loading) {
        return (
            <>
                <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-slate-600 font-medium tracking-tight">Fetching your order info...</p>
                    </div>
                </div>
            </>
        );
    }

    if (error || !order) {
        return (
            <>
                <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
                    <div className="max-w-md w-full text-center bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100">
                        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <AlertCircle className="w-10 h-10 text-red-500" />
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 mb-2">Order Not Found</h2>
                        <p className="text-slate-500 mb-8">{error || "We couldn't find the order you're looking for."}</p>
                        <button
                            onClick={() => navigate('/orders')}
                            className="w-full py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary-hover transition-all shadow-lg shadow-primary/30"
                        >
                            Back to Orders
                        </button>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <div className="min-h-screen bg-slate-50 pt-28 pb-12">
                <div className="container mx-auto px-4 max-w-6xl">
                    {/* Header Controls */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate('/orders')}
                                className="p-3 bg-white hover:bg-slate-50 rounded-2xl transition-all shadow-sm border border-slate-100 text-slate-600 group"
                            >
                                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            </button>
                            <div>
                                <h1 className="text-3xl font-black text-slate-900 leading-none">Order Details</h1>
                                <p className="text-slate-500 font-bold mt-2 flex items-center gap-2">
                                    <span className="text-primary font-black">#{order.orderNumber}</span>
                                    <span className="text-slate-300">•</span>
                                    <span>Placed on {format(new Date(order.createdAt), 'MMM dd, yyyy • hh:mm a')}</span>
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => window.print()}
                            className="hidden md:flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-2xl transition-all shadow-sm border border-slate-100"
                        >
                            <Printer className="w-5 h-5" />
                            Print Receipt
                        </button>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Left Column: Tracking & Items */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Tracking / Status Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden"
                            >
                                <div className="p-8">
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 ${getStatusColor(order.status)} animate-pulse`}>
                                                {getStatusIcon(order.status)}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Current Status</p>
                                                <h3 className="text-2xl font-black text-slate-900 capitalize">{order.status}</h3>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Simple Stepper UI */}
                                    <div className="relative pt-4 px-2">
                                        <div className="absolute top-8 left-8 right-8 h-1 bg-slate-100 z-0"></div>
                                        <div className="flex justify-between relative z-10 text-center">
                                            {[
                                                { label: 'Placed', icon: ShoppingBag, color: 'text-blue-500', done: true },
                                                { label: 'Confirmed', icon: Package, color: 'text-indigo-500', done: order.status !== 'cancelled' },
                                                { label: 'On Way', icon: Truck, color: 'text-orange-500', done: ['shipped', 'delivered', 'completed'].includes(order.status) },
                                                { label: 'Delivered', icon: CheckCircle, color: 'text-green-500', done: ['delivered', 'completed'].includes(order.status) }
                                            ].map((step, idx) => (
                                                <div key={idx} className="flex flex-col items-center gap-3">
                                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step.done ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-slate-100 text-slate-400'}`}>
                                                        <step.icon className="w-5 h-5" />
                                                    </div>
                                                    <span className={`text-xs font-black uppercase tracking-tighter ${step.done ? 'text-slate-900' : 'text-slate-300'}`}>{step.label}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Items List */}
                            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 p-8">
                                <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                                    <Package className="w-6 h-6 text-primary" />
                                    Items Ordered
                                </h3>
                                <div className="space-y-6">
                                    {order.items.map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-6 group">
                                            <div className="w-24 h-24 bg-slate-50 rounded-3xl flex-shrink-0 overflow-hidden border border-slate-100 group-hover:border-primary/30 transition-colors">
                                                {item.productId?.image ? (
                                                    <img src={item.productId.image} alt={item.productId.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <ShoppingBag className="w-10 h-10 text-slate-200" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-grow">
                                                <h4 className="font-black text-lg text-slate-900 group-hover:text-primary transition-colors">
                                                    {item.productId?.name || 'Unknown Product'}
                                                </h4>
                                                <p className="text-slate-500 font-bold text-sm mt-1">Quantity: {item.quantity}</p>
                                                <p className="text-primary font-black mt-2">₹{item.price} <span className="text-slate-300 mx-1">•</span> <span className="text-slate-400 font-bold text-xs font-mono">Total: ₹{(Number(item.price || 0) * item.quantity).toFixed(2)}</span></p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Address, Payment & Total */}
                        <div className="space-y-8">
                            {/* Customer & Delivery Card */}
                            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 p-8">
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-sm font-black text-slate-300 uppercase tracking-widest mb-4">Delivery To</h3>
                                        <div className="flex gap-4">
                                            <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                                                <User className="w-6 h-6 text-indigo-600" />
                                            </div>
                                            <div>
                                                <p className="font-black text-slate-900 text-lg leading-tight">{order.deliveryAddress.name}</p>
                                                <div className="flex flex-col gap-1 mt-2">
                                                    <div className="flex items-center gap-2 text-slate-500 text-sm font-bold">
                                                        <Phone className="w-3.5 h-3.5" />
                                                        {order.deliveryAddress.phone}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-slate-50">
                                        <div className="flex gap-4">
                                            <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                                                <MapPin className="w-6 h-6 text-orange-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-slate-600 font-bold leading-relaxed">
                                                    {order.deliveryAddress.addressLine},<br />
                                                    {order.deliveryAddress.city}, {order.deliveryAddress.state}<br />
                                                    PIN: {order.deliveryAddress.pinCode}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Method Card */}
                            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 p-8">
                                <h3 className="text-sm font-black text-slate-300 uppercase tracking-widest mb-4">Payment Info</h3>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
                                            <CreditCard className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="font-black text-slate-900 capitalize">{order.paymentMethod}</p>
                                            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-0.5">Method</p>
                                        </div>
                                    </div>
                                    <span className={`px-3 py-1.5 rounded-xl font-black text-[10px] uppercase tracking-wider border ${order.payment.status === 'paid' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-orange-50 text-orange-600 border-orange-100'}`}>
                                        {order.payment.status}
                                    </span>
                                </div>
                            </div>

                            {/* Bill Breakdown Card */}
                            <div className="bg-slate-900 rounded-[2.5rem] shadow-xl p-8 text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-8 opacity-10">
                                    <ShoppingBag className="w-24 h-24" />
                                </div>
                                <h3 className="text-lg font-black mb-6 relative z-10">Bill Details</h3>
                                <div className="space-y-4 relative z-10">
                                    <div className="flex justify-between text-slate-400 font-bold">
                                        <span>Subtotal</span>
                                        <span>₹{Number(order.pricing?.subtotal || 0).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-400 font-bold">
                                        <span>Tax (10%)</span>
                                        <span>₹{Number(order.pricing?.tax || 0).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-400 font-bold">
                                        <span>Delivery Fee</span>
                                        <span className={order.pricing?.deliveryFee === 0 ? 'text-green-400' : ''}>
                                            {order.pricing?.deliveryFee === 0 ? 'FREE' : `₹${Number(order.pricing?.deliveryFee || 0).toFixed(2)}`}
                                        </span>
                                    </div>
                                    <div className="pt-6 border-t border-white/10 mt-6 flex justify-between items-center">
                                        <span className="text-xl font-black">Total Amount</span>
                                        <span className="text-3xl font-black text-primary">₹{Number(order.pricing?.total || 0).toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => navigate('/')}
                                className="w-full py-5 bg-white hover:bg-slate-50 text-slate-900 font-black rounded-3xl transition-all shadow-sm border border-slate-100 flex items-center justify-center gap-2 group"
                            >
                                <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                Back to Shopping
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderDetails;
