import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Plus, Trash2, Home, Briefcase, MoreVertical, CheckCircle2, ChevronLeft, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { getAddressesByUserId, createAddress, deleteAddress, setDefaultAddress } from '../services/api';

const SavedAddresses = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const [addresses, setAddresses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        label: 'home',
        address: '',
        city: '',
        state: '',
        country: 'India',
        pinCode: '',
        isDefault: false
    });

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        fetchAddresses();
    }, []);

    const fetchAddresses = async () => {
        try {
            setIsLoading(true);
            const response = await getAddressesByUserId(user.id || user._id);
            setAddresses(response.data.addresses);
        } catch (error) {
            console.error('Error fetching addresses:', error);
            toast.error('Failed to load addresses');
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...formData,
                userId: user.id || user._id,
                pinCode: parseInt(formData.pinCode)
            };
            await createAddress(payload);
            toast.success('Address added successfully');
            setIsAddModalOpen(false);
            setFormData({
                label: 'home',
                address: '',
                city: '',
                state: '',
                country: 'India',
                pinCode: '',
                isDefault: false
            });
            fetchAddresses();
        } catch (error) {
            console.error('Error adding address:', error);
            toast.error(error.response?.data?.message || 'Failed to add address');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this address?')) return;
        try {
            await deleteAddress(id);
            toast.success('Address deleted successfully');
            fetchAddresses();
        } catch (error) {
            toast.error(' to delete address');
        }
    };

    const handleSetDefault = async (addressId) => {
        try {
            await setDefaultAddress(user.id || user._id, addressId);
            toast.success('Default address updated');
            fetchAddresses();
        } catch (error) {
            toast.error('Failed to update default address');
        }
    };

    const getIcon = (label) => {
        switch (label) {
            case 'home': return <Home className="w-5 h-5" />;
            case 'work': return <Briefcase className="w-5 h-5" />;
            default: return <MapPin className="w-5 h-5" />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-20 mt-5">
            <div className="container py-8 max-w-4xl">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-1 text-gray-500 hover:text-primary mb-2 transition-colors"
                        >
                            <ChevronLeft className="w-4 h-4" />
                            Back
                        </button>
                        <h1 className="text-3xl font-black text-secondary">Saved Addresses</h1>
                        <p className="text-text-light">Manage your delivery locations</p>
                    </div>
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="btn btn-primary flex items-center gap-2 shadow-lg shadow-primary/30"
                    >
                        <Plus className="w-5 h-5" />
                        Add New Address
                    </button>
                </div>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
                        <p className="text-gray-500">Loading your addresses...</p>
                    </div>
                ) : addresses.length === 0 ? (
                    <div className="bg-white rounded-3xl p-12 text-center shadow-xl border border-gray-100">
                        <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <MapPin className="w-10 h-10 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold text-secondary mb-2">No addresses found</h3>
                        <p className="text-text-light mb-8 max-w-md mx-auto">
                            Please add a delivery address to ensure a smooth checkout experience.
                        </p>
                        <button
                            onClick={() => setIsAddModalOpen(true)}
                            className="btn btn-primary"
                        >
                            Add Your First Address
                        </button>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {addresses.map((addr) => (
                            <motion.div
                                key={addr._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`bg-white rounded-3xl p-6 shadow-xl border-2 transition-all ${addr.isDefault ? 'border-primary' : 'border-transparent hover:border-gray-200'
                                    }`}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex gap-4">
                                        <div className={`p-3 rounded-2xl ${addr.isDefault ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'
                                            }`}>
                                            {getIcon(addr.label)}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <h4 className="font-bold text-lg capitalize text-secondary">
                                                    {addr.label}
                                                </h4>
                                                {addr.isDefault && (
                                                    <span className="bg-primary/10 text-primary text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border border-primary/20">
                                                        Default
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-text-light leading-relaxed">
                                                {addr.address}<br />
                                                {addr.city}, {addr.state} - {addr.pinCode}<br />
                                                {addr.country}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        {!addr.isDefault && (
                                            <button
                                                onClick={() => handleSetDefault(addr._id)}
                                                className="text-primary text-sm font-bold hover:underline"
                                            >
                                                Set as Default
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleDelete(addr._id)}
                                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all self-end"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* Add Address Modal */}
            <AnimatePresence>
                {isAddModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsAddModalOpen(false)}
                            className="absolute inset-0 bg-secondary/40 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-white rounded-[2rem] w-full max-w-lg overflow-hidden shadow-2xl relative z-10"
                        >
                            <div className="p-8 bg-gradient-to-r from-primary to-primary-hover text-white">
                                <h2 className="text-2xl font-black mb-1">Add New Address</h2>
                                <p className="text-white/80">Where should we deliver your delicious food?</p>
                            </div>

                            <form onSubmit={handleSubmit} className="p-8">
                                <div className="grid gap-5">
                                    <div className="flex gap-4 mb-2">
                                        {['home', 'work', 'other'].map((l) => (
                                            <button
                                                key={l}
                                                type="button"
                                                onClick={() => setFormData(prev => ({ ...prev, label: l }))}
                                                className={`flex-1 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 border-2 transition-all capitalize ${formData.label === l
                                                    ? 'bg-primary border-primary text-white'
                                                    : 'border-gray-100 text-gray-500 hover:border-gray-200'
                                                    }`}
                                            >
                                                {getIcon(l)}
                                                {l}
                                            </button>
                                        ))}
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-sm font-bold text-gray-700 ml-1">Full Address</label>
                                        <textarea
                                            required
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            placeholder="House No, Building Name, Street..."
                                            className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-primary focus:bg-white transition-all outline-none min-h-[100px]"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-sm font-bold text-gray-700 ml-1">City</label>
                                            <input
                                                required
                                                type="text"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                placeholder="Bangalore"
                                                className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-primary focus:bg-white transition-all outline-none"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-sm font-bold text-gray-700 ml-1">Pin Code</label>
                                            <input
                                                required
                                                type="text"
                                                name="pinCode"
                                                value={formData.pinCode}
                                                onChange={handleInputChange}
                                                placeholder="560001"
                                                className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-primary focus:bg-white transition-all outline-none"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-sm font-bold text-gray-700 ml-1">State</label>
                                            <input
                                                required
                                                type="text"
                                                name="state"
                                                value={formData.state}
                                                onChange={handleInputChange}
                                                placeholder="Karnataka"
                                                className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-primary focus:bg-white transition-all outline-none"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-sm font-bold text-gray-700 ml-1">Country</label>
                                            <input
                                                required
                                                type="text"
                                                name="country"
                                                value={formData.country}
                                                onChange={handleInputChange}
                                                className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-primary focus:bg-white transition-all outline-none"
                                            />
                                        </div>
                                    </div>

                                    <label className="flex items-center gap-3 cursor-pointer group p-2">
                                        <input
                                            type="checkbox"
                                            name="isDefault"
                                            checked={formData.isDefault}
                                            onChange={handleInputChange}
                                            className="w-5 h-5 accent-primary cursor-pointer"
                                        />
                                        <span className="text-sm font-bold text-gray-700">Set as default address</span>
                                    </label>

                                    <div className="flex gap-4 mt-4">
                                        <button
                                            type="button"
                                            onClick={() => setIsAddModalOpen(false)}
                                            className="flex-1 py-4 font-bold text-gray-500 hover:text-secondary transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="flex-[2] btn btn-primary py-4 shadow-xl shadow-primary/30"
                                        >
                                            Save Address
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SavedAddresses;
