import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Plus, Loader2 } from 'lucide-react';
import { createCategory } from '../services/api';
import toast from 'react-hot-toast';

const AddCategoryForm = ({ restaurantId, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        image: '',
        isActive: true
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const categoryData = {
                ...formData,
                restaurantId
            };

            await createCategory(categoryData);
            toast.success('Category created successfully!');
            onSuccess();
            onClose();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to create category');
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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
            >
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-black text-secondary">Add New Category</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-secondary mb-2">
                            Category Name *
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                            placeholder="e.g., Appetizers, Main Course"
                        />
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
                            placeholder="Brief description of this category"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-secondary mb-2">
                            Image URL
                        </label>
                        <input
                            type="url"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                            placeholder="https://example.com/image.jpg"
                        />
                        {formData.image && (
                            <div className="mt-3">
                                <img
                                    src={formData.image}
                                    alt="Preview"
                                    className="w-32 h-32 object-cover rounded-xl border-2 border-gray-200"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            name="isActive"
                            id="isActive"
                            checked={formData.isActive}
                            onChange={handleChange}
                            className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <label htmlFor="isActive" className="text-sm font-medium text-secondary">
                            Active Category
                        </label>
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
                            disabled={loading}
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
                                    Create Category
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default AddCategoryForm;
