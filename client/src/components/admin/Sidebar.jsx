import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    UtensilsCrossed,
    Tags,
    Package,
    ShoppingBag,
    ChevronRight,
    LogOut
} from 'lucide-react';

const Sidebar = () => {
    const location = useLocation();

    const menuItems = [
        { title: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
        { title: 'Users', icon: Users, path: '/admin/users' },
        { title: 'Restaurants', icon: UtensilsCrossed, path: '/admin/restaurants' },
        { title: 'Categories', icon: Tags, path: '/admin/categories' },
        { title: 'Products', icon: Package, path: '/admin/products' },
        { title: 'Orders', icon: ShoppingBag, path: '/admin/orders' },
    ];

    return (
        <div className="fixed left-0 top-0 h-screen w-64 bg-slate-900 text-white p-4 z-50 overflow-y-auto">
            <div className="flex items-center gap-3 mb-10 px-2 py-4 border-b border-slate-800">
                <div className="bg-primary p-2 rounded-xl">
                    <UtensilsCrossed className="text-white w-6 h-6" />
                </div>
                <span className="text-xl font-black bg-gradient-to-r from-primary to-orange-400 bg-clip-text text-transparent">
                    Admin Portal
                </span>
            </div>

            <nav className="space-y-2">
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center justify-between p-3 rounded-xl transition-all group ${isActive
                                    ? 'bg-primary/20 text-primary border border-primary/20'
                                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <item.icon className="w-5 h-5" />
                                <span className="font-semibold">{item.title}</span>
                            </div>
                            <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? 'translate-x-0' : '-translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'}`} />
                        </Link>
                    );
                })}
            </nav>

            <div className="absolute bottom-10 left-4 right-4 pt-10 border-t border-slate-800">
                <button
                    onClick={() => {
                        localStorage.removeItem('user');
                        localStorage.removeItem('tokens');
                        window.location.href = '/login';
                    }}
                    className="flex items-center gap-3 w-full p-3 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-500 transition-all font-semibold"
                >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
