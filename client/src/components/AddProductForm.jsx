import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Plus, Loader2, Upload } from 'lucide-react';
import { createProduct, getCategoryByRestaurantId } from '../services/api';
import toast from 'react-hot-toast';

const AddProductForm = ({ restaurantId, onClose, onSuccess }) => {
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        categoryId: '',
        foodType: 'VEG',
        image: '',
        isAvailable: true,
        status: 'active'
    });
    const [loading, setLoading] = useState(false);
    const [loadingCategories, setLoadingCategories] = useState(true);

    useEffect(() => {
        fetchCategories();
    }, [restaurantId]);

    const fetchCategories = async () => {
        try {
            const response = await getCategoryByRestaurantId(restaurantId);
            setCategories(response.data.data || []);
        } catch (error) {
            toast.error('Failed to load categories');
        } finally {
            setLoadingCategories(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const productData = {
                ...formData,
                restaurantId,
                price: parseFloat(formData.price),
                stock: parseInt(formData.stock),
                rating: {
                    average: 0,
                    count: 0
                }
            };

            await createProduct(productData);
            toast.success('Product created successfully!');
            onSuccess();
            onClose();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to create product');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl my-8"
            >
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-black text-secondary">Add New Product</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-secondary mb-2">
                                Product Name *
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                placeholder="e.g., Margherita Pizza"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-secondary mb-2">
                                Category *
                            </label>
                            <select
                                name="categoryId"
                                value={formData.categoryId}
                                onChange={handleChange}
                                required
                                disabled={loadingCategories}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                            >
                                <option value="">Select Category</option>
                                {categories.map(cat => (
                                    <option key={cat._id} value={cat._id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-secondary mb-2">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={3}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                            placeholder="Brief description of the product"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-secondary mb-2">
                                Price ($) *
                            </label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                                min="0"
                                step="0.01"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                placeholder="0.00"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-secondary mb-2">
                                Stock *
                            </label>
                            <input
                                type="number"
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                required
                                min="0"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                placeholder="0"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-secondary mb-2">
                                Food Type *
                            </label>
                            <select
                                name="foodType"
                                value={formData.foodType}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                            >
                                <option value="VEG">Vegetarian</option>
                                <option value="NON_VEG">Non-Vegetarian</option>
                                <option value="BOTH">Both</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-secondary mb-2">
                            Image URL
                        </label>
                        <div className="relative">
                            <input
                                type="url"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                className="w-full px-4 py-3 pl-12 rounded-xl border border-gray-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                placeholder="https://example.com/image.jpg"
                            />
                            <Upload className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                name="isAvailable"
                                id="isAvailable"
                                checked={formData.isAvailable}
                                onChange={handleChange}
                                className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                            />
                            <label htmlFor="isAvailable" className="text-sm font-medium text-secondary">
                                Available for Order
                            </label>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-secondary mb-2">
                                Status
                            </label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                            >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                                <option value="out_of_stock">Out of Stock</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-6 py-3 rounded-xl border border-gray-200 font-bold text-secondary hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading || loadingCategories}
                            className="flex-1 px-6 py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary-hover transition-colors shadow-lg shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Creating...
                                </>
                            ) : (
                                <>
                                    <Plus className="w-5 h-5" />
                                    Create Product
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default AddProductForm;
