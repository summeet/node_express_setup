import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Phone, Calendar, Loader2 } from 'lucide-react';
import { register } from '../services/api';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        contact: '',
        dob: ''
    });
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
            const response = await register(formData);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
            <div className="absolute inset-0 z-0 overflow-hidden">
                <img src="/hero-bg.png" alt="" className="w-full h-full object-cover opacity-10 blur-sm" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/80 backdrop-blur-md p-8 md:p-12 rounded-3xl shadow-2xl w-full max-w-lg relative z-10 border border-white/50"
            >
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-black text-secondary mb-2">Create Account</h2>
                    <p className="text-text-light">Join us and start ordering today!</p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-500 p-3 rounded-xl mb-6 text-sm font-medium text-center border border-red-100">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-secondary ml-1">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border-2 border-transparent focus:border-primary focus:outline-none transition-colors font-medium text-secondary shadow-sm"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-secondary ml-1">Date of Birth</label>
                            <div className="relative">
                                <Calendar className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                                <input
                                    type="date"
                                    name="dob"
                                    required
                                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border-2 border-transparent focus:border-primary focus:outline-none transition-colors font-medium text-secondary shadow-sm"
                                    value={formData.dob}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

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
                        <label className="text-sm font-bold text-secondary ml-1">Phone Number</label>
                        <div className="relative">
                            <Phone className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                            <input
                                type="tel"
                                name="contact"
                                required
                                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border-2 border-transparent focus:border-primary focus:outline-none transition-colors font-medium text-secondary shadow-sm"
                                placeholder="1234567890"
                                value={formData.contact}
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

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-primary-hover transition-all shadow-lg shadow-primary/30 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-4 active:scale-95"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : 'Create Account'}
                    </button>
                </form>

                <p className="text-center mt-8 text-text-light">
                    Already have an account? {' '}
                    <Link to="/login" className="font-bold text-primary hover:text-primary-hover transition-colors">
                        Log In
                    </Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Register;
