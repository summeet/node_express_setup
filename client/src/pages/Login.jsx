import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Utensils, Mail, Lock, Loader2 } from 'lucide-react';
import { login } from '../services/api';
import { useCart } from '../contexts/CartContext';

const Login = () => {
    const { fetchCart } = useCart();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await login(formData.email, formData.password);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            await fetchCart();
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
            <div className="absolute inset-0 z-0 overflow-hidden">
                <img src="/hero-bg.png" alt="" className="w-full h-full object-cover opacity-10 blur-sm" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/80 backdrop-blur-md p-8 md:p-12 rounded-3xl shadow-2xl w-full max-w-md relative z-10 border border-white/50"
            >
                <div className="flex justify-center mb-8">
                    <div className="bg-primary p-3 rounded-2xl shadow-lg shadow-primary/30">
                        <Utensils className="w-8 h-8 text-white" />
                    </div>
                </div>

                <h2 className="text-3xl font-black text-center text-secondary mb-2">Welcome Back</h2>
                <p className="text-text-light text-center mb-8">Sign in to continue your delicious journey</p>

                {error && (
                    <div className="bg-red-50 text-red-500 p-3 rounded-xl mb-6 text-sm font-medium text-center border border-red-100">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-secondary ml-1">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                            <input
                                type="email"
                                name="email"
                                required
                                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border-2 border-transparent focus:border-primary focus:outline-none transition-colors font-medium text-secondary shadow-sm"
                                placeholder="hello@example.com"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-secondary ml-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                            <input
                                type="password"
                                name="password"
                                required
                                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border-2 border-transparent focus:border-primary focus:outline-none transition-colors font-medium text-secondary shadow-sm"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <a href="#" className="text-sm font-bold text-primary hover:text-primary-hover transition-colors">Forgot Password?</a>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-primary-hover transition-all shadow-lg shadow-primary/30 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed active:scale-95"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : 'Log In'}
                    </button>
                </form>

                <p className="text-center mt-8 text-text-light">
                    Don't have an account? {' '}
                    <Link to="/register" className="font-bold text-primary hover:text-primary-hover transition-colors">
                        Sign Up
                    </Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Login;
