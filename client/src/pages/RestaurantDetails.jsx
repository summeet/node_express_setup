import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRestaurantById, getProductsByRestaurantId, getCategories } from '../services/api';
import ProductCard from '../components/ProductCard';
import AddCategoryForm from '../components/AddCategoryForm';
import AddProductForm from '../components/AddProductForm';
import { Star, MapPin, Clock, ArrowLeft, Loader2, Utensils, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const RestaurantDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [restaurant, setRestaurant] = useState(null);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [loading, setLoading] = useState(true);
    const [showAddCategory, setShowAddCategory] = useState(false);
    const [showAddProduct, setShowAddProduct] = useState(false);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const [resData, prodData, catData] = await Promise.all([
                    getRestaurantById(id),
                    getProductsByRestaurantId(id),
                    getCategories()
                ]);
                setRestaurant(resData.data.data);
                setProducts(prodData.data.data);

                // Filter categories that belong to this restaurant
                const restaurantCategories = catData.data.data.filter(
                    cat => cat.restaurantId === id
                );
                setCategories(restaurantCategories);
            } catch (error) {
                console.error("Error fetching restaurant details:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [id]);

    // Group products by category
    const productsByCategory = useMemo(() => {
        const grouped = {};
        products.forEach(product => {
            const categoryId = product.categoryId?._id || product.categoryId;
            if (!grouped[categoryId]) {
                grouped[categoryId] = [];
            }
            grouped[categoryId].push(product);
        });
        return grouped;
    }, [products]);

    // Filter products based on selected category
    const filteredProducts = useMemo(() => {
        if (selectedCategory === 'all') return products;
        return products.filter(p => {
            const categoryId = p.categoryId?._id || p.categoryId;
            return categoryId === selectedCategory;
        });
    }, [products, selectedCategory]);

    const handleCategoryAdded = async () => {
        try {
            const [prodData, catData] = await Promise.all([
                getProductsByRestaurantId(id),
                getCategories()
            ]);
            setProducts(prodData.data.data);
            const restaurantCategories = catData.data.data.filter(
                cat => cat.restaurantId === id
            );
            setCategories(restaurantCategories);
        } catch (error) {
            console.error("Error refreshing data:", error);
        }
    };

    const handleProductAdded = async () => {
        try {
            const prodData = await getProductsByRestaurantId(id);
            setProducts(prodData.data.data);
        } catch (error) {
            console.error("Error refreshing products:", error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
            </div>
        );
    }

    if (!restaurant) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-background text-text-light gap-4">
                <Utensils className="w-16 h-16 text-gray-300" />
                <p className="text-xl font-medium">Restaurant not found</p>
                <button onClick={() => navigate('/')} className="text-primary hover:underline font-bold">Back to Home</button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background pt-20">
            {/* Header Image */}
            <div className="relative h-[400px] w-full">
                <img
                    src={restaurant.image || 'https://source.unsplash.com/random/1200x600?restaurant'}
                    alt={restaurant.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-6 left-6 bg-white/20 backdrop-blur-md p-3 rounded-full text-white hover:bg-white/40 transition-colors z-20"
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>

                <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 text-white bg-gradient-to-t from-black/90 to-transparent">
                    <div className="container">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="max-w-4xl"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <span className={`text-xs font-black px-2.5 py-1 rounded uppercase tracking-wider ${restaurant.restaurantType === 'VEG' ? 'bg-green-500' :
                                    restaurant.restaurantType === 'NON_VEG' ? 'bg-red-500' : 'bg-orange-500'
                                    }`}>
                                    {restaurant.restaurantType}
                                </span>
                                <div className="flex items-center gap-1 bg-white/20 backdrop-blur px-2 py-1 rounded text-xs font-bold">
                                    <Star className="w-3 h-3 text-orange-400 fill-orange-400" />
                                    {restaurant.rating} Rating
                                </div>
                            </div>

                            <h1 className="text-4xl md:text-6xl font-black mb-4 drop-shadow-lg">{restaurant.name}</h1>
                            <p className="text-lg text-gray-200 mb-8 max-w-2xl line-clamp-2">{restaurant.description}</p>

                            <div className="flex flex-wrap gap-6 text-sm font-medium text-gray-300">
                                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/10">
                                    <MapPin className="w-4 h-4 text-primary" />
                                    {restaurant.address || 'Address not available'}
                                </div>
                                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/10">
                                    <Clock className="w-4 h-4 text-primary" />
                                    30-45 min delivery
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container py-12">
                {/* Action Buttons */}
                {/* <div className="flex flex-wrap gap-4 mb-8">
                    <button
                        onClick={() => setShowAddCategory(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40"
                    >
                        <Plus className="w-5 h-5" />
                        Add Category
                    </button>
                    <button
                        onClick={(  ) => setShowAddProduct(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-primary-hover text-white font-bold rounded-xl hover:from-primary-hover hover:to-primary transition-all shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40"
                    >
                        <Plus className="w-5 h-5" />
                        Add Product
                    </button>
                </div> */}

                {/* Category Filter */}
                {categories.length > 0 && (
                    <div className="mb-8 mt-8">
                        <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-hide">
                            <button
                                onClick={() => setSelectedCategory('all')}
                                className={`px-6 py-3 rounded-xl font-bold whitespace-nowrap transition-all ${selectedCategory === 'all'
                                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                                    : 'bg-white text-text-light hover:bg-gray-50 border border-gray-200'
                                    }`}
                            >
                                All Items ({products.length})
                            </button>
                            {categories.map((category) => {
                                const count = productsByCategory[category._id]?.length || 0;
                                return (
                                    <button
                                        key={category._id}
                                        onClick={() => setSelectedCategory(category._id)}
                                        className={`px-6 py-3 rounded-xl font-bold whitespace-nowrap transition-all ${selectedCategory === category._id
                                            ? 'bg-primary text-white shadow-lg shadow-primary/30'
                                            : 'bg-white text-text-light hover:bg-gray-50 border border-gray-200'
                                            }`}
                                    >
                                        {category.name} ({count})
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-black text-secondary">
                        {selectedCategory === 'all' ? 'All Items' : categories.find(c => c._id === selectedCategory)?.name || 'Menu'}
                    </h2>
                    <div className="text-sm text-text-light font-medium">{filteredProducts.length} items</div>
                </div>

                {filteredProducts.length > 0 ? (
                    <motion.div
                        key={selectedCategory}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    >
                        {filteredProducts.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </motion.div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                        <Utensils className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-400">No items found</h3>
                        <p className="text-gray-400">
                            {selectedCategory === 'all'
                                ? "This restaurant hasn't listed any items yet."
                                : "No items in this category."}
                        </p>
                    </div>
                )}
            </div>

            {/* Modals */}
            <AnimatePresence>
                {showAddCategory && (
                    <AddCategoryForm
                        restaurantId={id}
                        onClose={() => setShowAddCategory(false)}
                        onSuccess={handleCategoryAdded}
                    />
                )}
                {showAddProduct && (
                    <AddProductForm
                        restaurantId={id}
                        onClose={() => setShowAddProduct(false)}
                        onSuccess={handleProductAdded}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default RestaurantDetails;
