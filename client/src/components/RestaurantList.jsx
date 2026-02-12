import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Star, MapPin, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

const RestaurantList = ({ restaurants }) => {
    return (
        <section>
            <div className="container">
                <h2 className="mb-10 text-4xl font-black text-secondary">Restaurants Near You</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 pb-20">
                    {restaurants.length > 0 ? restaurants.map((res, i) => (
                        <motion.div
                            key={res._id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            whileHover={{ y: -5 }}
                            viewport={{ once: true, margin: "-50px" }}
                            className="glass-card overflow-hidden group border border-white/50 bg-white/40"
                        >
                            <ProtectedRoute>
                                <Link to={`/restaurant/${res._id}`} className="block h-full">
                                    <div className="relative h-64 overflow-hidden rounded-t-[20px]">
                                        <img
                                            src={res.image || `https://source.unsplash.com/random/800x600?restaurant,${i}`}
                                            alt={res.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 font-bold text-sm shadow-lg">
                                            <Star className="w-4 h-4 text-orange-400 fill-orange-400" />
                                            {res.rating}
                                        </div>

                                        {res.restaurantType && (
                                            <div className={`absolute top-4 left-4 text-white text-[10px] font-black px-2.5 py-1.5 rounded-lg uppercase tracking-wider shadow-lg ${res.restaurantType === 'VEG' ? 'bg-green-500' :
                                                res.restaurantType === 'NON_VEG' ? 'bg-red-500' : 'bg-orange-500'
                                                }`}>
                                                {res.restaurantType}
                                            </div>
                                        )}

                                        <div className="absolute bottom-4 left-4 text-white">
                                            <div className="flex items-center gap-2 text-xs font-medium bg-black/40 backdrop-blur-sm px-2 py-1 rounded-lg">
                                                <Clock className="w-3 h-3" />
                                                <span>30-40 min</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <h3 className="text-2xl font-bold mb-2 text-secondary group-hover:text-primary transition-colors line-clamp-1">{res.name}</h3>
                                        <p className="text-text-light text-sm line-clamp-2 mb-4 font-medium leading-relaxed">{res.description}</p>

                                        <div className="flex items-center text-sm text-text-light mb-6 gap-4">
                                            <div className="flex items-center gap-1">
                                                <MapPin className="w-4 h-4 text-primary" />
                                                <span>{res.address ? res.address.split(',')[0] : 'Downtown'}</span>
                                            </div>
                                            <div className="w-1 h-1 bg-gray-300 rounded-full" />
                                            <span>$$</span>
                                        </div>

                                        <div className="flex items-center justify-between pt-4 border-t border-gray-100/50">
                                            <div className="flex items-center gap-2 text-green-600 font-bold bg-green-50 px-3 py-1 rounded-full text-xs">
                                                <Truck className="w-3 h-3" />
                                                Free Delivery
                                            </div>
                                            <button className="btn btn-primary py-2.5 px-6 text-sm shadow-lg shadow-primary/20 group-hover:shadow-primary/40">
                                                Order Now
                                            </button>
                                        </div>
                                    </div>
                                </Link>
                            </ProtectedRoute>
                        </motion.div>
                    )) : (
                        [1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="h-[400px] bg-white rounded-[20px] p-4 shadow-sm border border-gray-100 animate-pulse">
                                <div className="h-48 bg-gray-200 rounded-2xl mb-4" />
                                <div className="h-6 w-3/4 bg-gray-200 rounded mb-2" />
                                <div className="h-4 w-full bg-gray-200 rounded mb-2" />
                                <div className="h-4 w-1/2 bg-gray-200 rounded mb-6" />
                                <div className="h-10 w-full bg-gray-200 rounded-xl" />
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

export default RestaurantList;