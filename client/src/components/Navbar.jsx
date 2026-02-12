import React, { useState } from 'react';
import { Utensils, Search, ShoppingCart, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ cartCount }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        navigate('/login');
    };

    const navigateToCart = () => {
        navigate('/cart');
    }

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

                <div className="hidden md:flex items-center gap-8 font-medium text-text-light">
                    <Link to="/" className="hover:text-primary transition-colors font-semibold">Home</Link>
                    <a href="#restaurants" className="hover:text-primary transition-colors">Restaurants</a>
                    <a href="#" className="hover:text-primary transition-colors">Orders</a>
                </div>

                <div className="flex items-center gap-4">
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative group">
                        <Search className="w-6 h-6 text-text" />
                        <span className="absolute top-full right-0 mt-2 w-max bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            Search Food
                        </span>
                    </button>
                    <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <ShoppingCart className="w-6 h-6 text-text" onClick={navigateToCart}/>
                        {cartCount > 0 && (
                            <span className="absolute top-0 right-0 bg-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full border-2 border-white font-bold">
                                {cartCount}
                            </span>
                        )}
                    </button>

                    {user ? (
                        <div className="flex items-center gap-4">
                            <span className="font-bold text-secondary hidden md:block">Hi, {user.name}</span>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 btn btn-primary ml-2 shadow-lg shadow-primary/30"
                            >
                                <span>Logout</span>
                            </button>
                        </div>
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
