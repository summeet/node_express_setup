import React, { useState, useEffect } from 'react';
import {
    Users,
    UtensilsCrossed,
    ShoppingBag,
    TrendingUp,
    Package,
    Plus,
    ArrowRight,
    Loader2,
    Calendar
} from 'lucide-react';
import { getRestaurants, getProducts, getOrders, getUsers } from '../../services/api';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        restaurants: 0,
        products: 0,
        orders: 0,
        users: 0,
    });
    const [recentOrders, setRecentOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [resRest, resProd, resOrders, resUsers] = await Promise.all([
                    getRestaurants(),
                    getProducts(),
                    getOrders(),
                    getUsers()
                ]);

                setStats({
                    restaurants: resRest.data?.data?.length || 0,
                    products: resProd.data?.data?.length || 0,
                    orders: resOrders.data?.orders?.length || 0,
                    users: resUsers.data?.data?.length || 0,
                });

                // Set recent 5 orders
                if (resOrders.data?.orders) {
                    setRecentOrders(resOrders.data.orders.slice(0, 5));
                }
            } catch (error) {
                console.error('Error fetching dashboard stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const statCards = [
        { title: 'Partner Restaurants', value: stats.restaurants, icon: UtensilsCrossed, color: 'text-blue-600', bg: 'bg-blue-50', path: '/admin/restaurants' },
        { title: 'Global Products', value: stats.products, icon: ShoppingBag, color: 'text-orange-600', bg: 'bg-orange-50', path: '/admin/products' },
        { title: 'Total Orders', value: stats.orders, icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50', path: '/admin/orders' },
        { title: 'Registered Users', value: stats.users, icon: Users, color: 'text-purple-600', bg: 'bg-purple-50', path: '/admin/users' },
    ];

    if (loading) return (
        <div className="space-y-8 animate-pulse">
            <div className="h-10 bg-slate-200 rounded-lg w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map(i => <div key={i} className="h-40 bg-slate-200 rounded-3xl"></div>)}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="h-80 bg-slate-200 rounded-3xl"></div>
                <div className="h-80 bg-slate-200 rounded-3xl"></div>
            </div>
        </div>
    );

    return (
        <div className="space-y-10">
            <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Dashboard Overview</h1>
                <p className="text-slate-500 mt-2 font-medium">Monitoring platform-wide activity and growth metrics.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, idx) => (
                    <Link key={idx} to={stat.path} className="group overflow-hidden relative bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 hover:translate-y-[-4px]">
                        <div className={`p-4 rounded-2xl ${stat.bg} w-fit mb-6 group-hover:scale-110 transition-transform duration-500`}>
                            <stat.icon className={`w-7 h-7 ${stat.color}`} />
                        </div>
                        <h3 className="text-slate-500 font-bold text-sm uppercase tracking-wider">{stat.title}</h3>
                        <div className="flex items-end justify-between mt-2">
                            <p className="text-4xl font-black text-slate-900">{stat.value}</p>
                            <div className="p-2 rounded-full bg-slate-50 opacity-0 group-hover:opacity-100 transition-opacity">
                                <ArrowRight className="w-4 h-4 text-slate-400" />
                            </div>
                        </div>
                        {/* Subtle background decoration */}
                        <div className={`absolute -right-4 -bottom-4 w-24 h-24 ${stat.bg} opacity-20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700`} />
                    </Link>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-xl font-black text-slate-900">Recent Orders</h3>
                            <p className="text-xs text-slate-500 font-bold mt-1 uppercase tracking-tight">Real-time update</p>
                        </div>
                        <Link to="/admin/orders" className="flex items-center gap-2 text-primary font-bold text-sm hover:underline">
                            View Reports
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="space-y-4">
                        {recentOrders.length === 0 ? (
                            <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                                <Package className="w-12 h-12 text-slate-300 mx-auto" />
                                <p className="text-slate-400 font-medium mt-4 italic">No orders recorded yet.</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-slate-50">
                                {recentOrders.map((order) => (
                                    <div key={order._id} className="flex items-center justify-between py-4 hover:bg-slate-50 transition-colors rounded-xl px-2">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 font-mono text-xs">
                                                #{order._id.slice(-4).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900">{order.userId?.name || 'Guest User'}</p>
                                                <div className="flex items-center gap-2 mt-0.5">
                                                    <Calendar className="w-3 h-3 text-slate-400" />
                                                    <span className="text-[10px] font-bold text-slate-500 uppercase">
                                                        {format(new Date(order.createdAt), 'MMM dd, HH:mm')}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-black text-slate-900">${order.totalAmount}</p>
                                            <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${order.status === 'completed' ? 'text-green-500 bg-green-50' :
                                                order.status === 'pending' ? 'text-amber-500 bg-amber-50' :
                                                    'text-red-500 bg-red-50'
                                                }`}>
                                                {order.status}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-slate-900 p-8 rounded-[2rem] shadow-xl shadow-slate-900/20 text-white overflow-hidden relative">
                    <div className="relative z-10">
                        <h3 className="text-xl font-black mb-8">Admin Quick Actions</h3>
                        <div className="grid grid-cols-1 gap-4">
                            <Link to="/admin/restaurants" className="p-5 rounded-2xl bg-white/10 hover:bg-white/20 transition-all border border-white/5 group flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 rounded-xl bg-primary shadow-lg shadow-primary/20">
                                        <UtensilsCrossed className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm">Add Restaurant</p>
                                        <p className="text-[10px] text-white/50">Register new partner</p>
                                    </div>
                                </div>
                                <Plus className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>

                            <Link to="/admin/products" className="p-5 rounded-2xl bg-white/10 hover:bg-white/20 transition-all border border-white/5 group flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 rounded-xl bg-orange-500 shadow-lg shadow-orange-500/20">
                                        <ShoppingBag className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm">Create Product</p>
                                        <p className="text-[10px] text-white/50">Add items to menu</p>
                                    </div>
                                </div>
                                <Plus className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>

                            <Link to="/admin/users" className="p-5 rounded-2xl bg-white/10 hover:bg-white/20 transition-all border border-white/5 group flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 rounded-xl bg-blue-500 shadow-lg shadow-blue-500/20">
                                        <Users className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm">Manage Users</p>
                                        <p className="text-[10px] text-white/50">Roles & permissions</p>
                                    </div>
                                </div>
                                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>

                            <div className="mt-6 p-6 rounded-3xl bg-gradient-to-br from-primary to-primary-hover relative overflow-hidden group">
                                <div className="relative z-10">
                                    <p className="text-xs font-bold text-white/80 uppercase">Coming Soon</p>
                                    <h4 className="text-lg font-black mt-1">Analytics Report</h4>
                                    <p className="text-xs text-white/60 mt-2">Get detailed sales and traffic insights with automated weekly reports.</p>
                                </div>
                                <TrendingUp className="absolute -right-4 -bottom-4 w-24 h-24 text-white/10 group-hover:scale-125 transition-transform duration-700" />
                            </div>
                        </div>
                    </div>

                    {/* Decorative circles */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
