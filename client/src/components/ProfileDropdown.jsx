import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { User, ChevronDown, MapPin, Package, UserCircle, CreditCard, Bell, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProfileDropdown = ({ user, setUser, navigate }) => {
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsProfileDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const profileMenuItems = [
        { icon: MapPin, label: 'Saved Addresses', path: '/saved-addresses' },
        { icon: Package, label: 'Orders', path: '/orders' },
        { icon: UserCircle, label: 'My Profile', path: '/profile' },
        { icon: CreditCard, label: 'Saved Cards', path: '/saved-cards' },
        { icon: Bell, label: 'Notifications', path: '/notifications' },
    ];

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setIsProfileDropdownOpen(false);
        navigate('/login');
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-primary-hover text-white font-semibold shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300"
            >
                <User className="w-4 h-4" />
                <span className="hidden md:block">Hi, {user.name}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
                {isProfileDropdownOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50"
                    >
                        <div className="p-4 bg-gradient-to-r from-primary to-primary-hover text-white">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                                    <User className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="font-bold text-lg">{user.name}</p>
                                    <p className="text-sm text-white/80">{user.email}</p>
                                </div>
                            </div>
                        </div>

                        <div className="py-2">
                            {profileMenuItems.map((item, index) => {
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={index}
                                        to={item.path}
                                        onClick={() => setIsProfileDropdownOpen(false)}
                                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors group"
                                    >
                                        <Icon className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                                        <span className="text-gray-700 group-hover:text-primary font-medium transition-colors">
                                            {item.label}
                                        </span>
                                    </Link>
                                );
                            })}
                        </div>

                        <div className="border-t border-gray-100">
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-3 px-4 py-3 w-full hover:bg-red-50 transition-colors group"
                            >
                                <LogOut className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors" />
                                <span className="text-gray-700 group-hover:text-red-500 font-medium transition-colors">
                                    Logout
                                </span>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProfileDropdown;