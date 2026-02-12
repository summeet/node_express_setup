import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const CategoryList = ({ categories }) => {
    return (
        <section className="bg-white py-16">
            <div className="container">
                <div className="flex items-center justify-between mb-10">
                    <h2 className="mb-0 text-3xl font-black text-secondary">Explore Categories</h2>
                    <button className="flex items-center text-primary font-bold hover:gap-2 transition-all">
                        View All <ChevronRight className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex gap-8 overflow-x-auto pb-6 scrollbar-hide px-2">
                    {categories.length > 0 ? categories.map((cat, i) => (
                        <motion.div
                            key={cat._id}
                            whileHover={{ y: -10, scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex-shrink-0 cursor-pointer group"
                        >
                            <div className="w-32 h-32 md:w-40 md:h-40 rounded-[2rem] overflow-hidden mb-4 shadow-xl shadow-gray-200 group-hover:shadow-2xl transition-all duration-300 border-4 border-white">
                                <img
                                    src={cat.image || `https://source.unsplash.com/random/200x200?food,${i}`}
                                    alt={cat.name}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                            <p className="text-center font-bold text-lg text-secondary group-hover:text-primary transition-colors">{cat.name}</p>
                        </motion.div>
                    )) : (
                        [1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="flex-shrink-0">
                                <div className="w-32 h-32 md:w-40 md:h-40 bg-gray-100 rounded-[2rem] animate-pulse mb-4" />
                                <div className="h-4 bg-gray-100 rounded w-20 mx-auto animate-pulse" />
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

export default CategoryList;
