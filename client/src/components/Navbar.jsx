import React, { useState, useRef, useEffect } from 'react';
import { Utensils, Search, ShoppingCart, User, ChevronDown, MapPin, Package, UserCircle, CreditCard, Bell, LogOut } from 'lucide-react';

import { Link, useNavigate, useLocation } from 'react-router-dom';
import NotificationDropdown from './NotificationDropdown';
import { useCart } from '../contexts/CartContext';
import ProfileDropdown from './ProfileDropdown';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(null);
    const { cartCount } = useCart();
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${searchQuery.trim()}`);
        }
    };

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        } else {
            setUser(null);
        }
    }, [location.pathname]);

    useEffect(() => {
        const handleStorage = () => {
            const userData = localStorage.getItem('user');
            setUser(userData ? JSON.parse(userData) : null);
        };
        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, []);

    const navigateToCart = () => {
        navigate('/cart');
    };




    const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

    if (isAuthPage) return null;

    return (
        <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-md border-b border-white/20">
            <div className="container flex items-center justify-between h-20">
                <Link to="/" className="flex items-center gap-2 cursor-pointer">
                    <div className="bg-primary p-2 rounded-xl">
                        <Utensils className="text-white" />
                    </div>
                    <span className="text-2xl font-black bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">
                        CraveDash
                    </span>
                </Link>

                <form
                    onSubmit={handleSearch}
                    className="hidden md:flex items-center flex-1 max-w-md mx-10 relative group"
                >
                    <Search className="absolute left-4 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                    <input
                        type="text"
                        placeholder="Search for delicious food or restaurants..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:border-primary/30 focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all text-sm font-medium text-secondary"
                    />
                    <div className="absolute right-3 hidden group-focus-within:flex items-center gap-1">
                        <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">ESC</span>
                    </div>
                </form>

                <div className="flex items-center gap-4">
                    <NotificationDropdown />
                    <Link to="/cart" className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <ShoppingCart className="w-6 h-6 text-text" onClick={navigateToCart} />
                        {cartCount > 0 && (
                            <span className="absolute top-0 right-0 bg-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full border-2 border-white font-bold">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    {user ? (
                        <ProfileDropdown user={user} setUser={setUser} navigate={navigate} />
                    ) : (
                        <Link
                            to="/login"
                            className="flex items-center gap-2 btn btn-primary ml-2 shadow-lg shadow-primary/30"
                        >
                            <User className="w-4 h-4" />
                            <span>Login</span>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
