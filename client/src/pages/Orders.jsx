import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getOrdersByUserId } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ShoppingBag,
    Clock,
    Package,
    Truck,
    CheckCircle,
    ChevronRight,
    MapPin,
    CreditCard,
    AlertCircle,
    Calendar,
    ArrowLeft
} from 'lucide-react';
import { format } from 'date-fns';

const Orders = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            if (!user) {
                navigate('/login');
                return;
            }
            const response = await getOrdersByUserId(user._id);
            setOrders(response.data.orders);
        } catch (err) {
            console.error('Failed to fetch orders:', err);
            setError('Failed to load your orders. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'active': return <Clock className="w-5 h-5 text-blue-500" />;
            case 'processing': return <Package className="w-5 h-5 text-purple-500" />;
            case 'shipped': return <Truck className="w-5 h-5 text-orange-500" />;
            case 'delivered': return <CheckCircle className="w-5 h-5 text-green-500" />;
            case 'completed': return <CheckCircle className="w-5 h-5 text-green-600" />;
            case 'cancelled': return <AlertCircle className="w-5 h-5 text-red-500" />;
            default: return <Clock className="w-5 h-5 text-gray-500" />;
        }
    };

    const getStatusStyles = (status) => {
        switch (status) {
            case 'active': return 'bg-blue-50 text-blue-700 border-blue-100';
            case 'processing': return 'bg-purple-50 text-purple-700 border-purple-100';
            case 'shipped': return 'bg-orange-50 text-orange-700 border-orange-100';
            case 'delivered': return 'bg-green-50 text-green-700 border-green-100';
            case 'completed': return 'bg-green-100 text-green-800 border-green-200';
            case 'cancelled': return 'bg-red-50 text-red-700 border-red-100';
            default: return 'bg-gray-50 text-gray-700 border-gray-100';
        }
    };

    if (loading) {
        return (
            <>
                <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-slate-600 font-medium">Loading your orders...</p>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <div className="min-h-screen bg-slate-50 pt-28 pb-12">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="flex items-center gap-4 mb-8">
                        <button
                            onClick={() => navigate(-1)}
                            className="p-2 hover:bg-white rounded-full transition-colors shadow-sm"
                        >
                            <ArrowLeft className="w-6 h-6 text-slate-600" />
                        </button>
                        <h1 className="text-3xl font-black text-slate-900">My Orders</h1>
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl mb-8 flex items-center gap-3">
                            <AlertCircle className="w-5 h-5" />
                            {error}
                        </div>
                    )}

                    {orders.length === 0 ? (
                        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-12 text-center">
                            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <ShoppingBag className="w-10 h-10 text-slate-300" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-2">No orders found</h2>
                            <p className="text-slate-500 mb-8">Looks like you haven't placed any orders yet.</p>
                            <button
                                onClick={() => navigate('/')}
                                className="px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-all shadow-lg shadow-primary/30"
                            >
                                Start Ordering
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {orders.map((order) => (
                                <motion.div
                                    key={order._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow"
                                >
                                    {/* Order Header */}
                                    <div className="p-6 border-b border-slate-50 flex flex-wrap items-center justify-between gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center">
                                                <ShoppingBag className="w-6 h-6 text-slate-400" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Order #{order.orderNumber}</p>
                                                <div className="flex items-center gap-2 text-slate-600">
                                                    <Calendar className="w-4 h-4" />
                                                    <span className="text-sm font-medium">{format(new Date(order.createdAt), 'MMM dd, yyyy • hh:mm a')}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`px-4 py-2 rounded-full border flex items-center gap-2 font-bold text-sm capitalize ${getStatusStyles(order.status)}`}>
                                            {getStatusIcon(order.status)}
                                            {order.status}
                                        </div>
                                    </div>

                                    {/* Order Content */}
                                    <div className="p-6">
                                        <div className="grid md:grid-cols-2 gap-8">
                                            {/* Items List */}
                                            <div className="space-y-4">
                                                <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Items</p>
                                                <div className="space-y-3">
                                                    {order.items.map((item, idx) => (
                                                        <div key={idx} className="flex justify-between items-center bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                                                            <div className="flex items-center gap-3">
                                                                <span className="w-6 h-6 bg-white rounded-lg flex items-center justify-center text-xs font-bold text-slate-500 border border-slate-100">{item.quantity}x</span>
                                                                <span className="font-bold text-slate-700">{item.productId?.name || 'Product'}</span>
                                                            </div>
                                                            <span className="font-bold text-slate-900">₹{(item.productId?.price || 0) * item.quantity}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Delivery & Payment Info */}
                                            <div className="space-y-6">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Delivery Address</p>
                                                        <div className="flex gap-2">
                                                            <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
                                                            <p className="text-sm text-slate-600 leading-relaxed">
                                                                {order.deliveryAddress.addressLine}, {order.deliveryAddress.city}<br />
                                                                {order.deliveryAddress.state} - {order.deliveryAddress.pinCode}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Payment</p>
                                                        <div className="flex gap-2 items-center">
                                                            <CreditCard className="w-4 h-4 text-slate-400" />
                                                            <p className="text-sm text-slate-600 font-bold capitalize">{order.paymentMethod}</p>
                                                            <span className={`text-[10px] px-2 py-0.5 rounded-md font-black uppercase ${order.payment.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                                                                {order.payment.status}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="bg-slate-900 rounded-2xl p-4 flex items-center justify-between">
                                                    <div>
                                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total Amount</p>
                                                        <p className="text-2xl font-black text-white">₹{Number(order.pricing?.total || 0).toFixed(2)}</p>
                                                    </div>
                                                    <button
                                                        className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-colors border border-white/10"
                                                        onClick={() => navigate(`/orders/${order._id}`)}
                                                    >
                                                        View Details
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Orders;
