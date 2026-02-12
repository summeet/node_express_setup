import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Search } from 'lucide-react';

const Hero = () => {
    return (
        <header className="relative h-[90vh] flex items-center justify-center pt-20 overflow-hidden bg-gradient-to-br from-[#fdfcfb] to-[#e2d1c3]">
            <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
                <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
            </div>

            <div className="absolute inset-0">
                <img
                    src="/hero-bg.png"
                    alt="Hero Background"
                    className="w-full h-full object-cover scale-105 opacity-80 mix-blend-multiply"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80" />
            </div>

            <div className="container relative z-10 text-white text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="bg-white/10 backdrop-blur-sm border border-white/20 inline-block px-6 py-2 rounded-full mb-6 font-medium text-sm tracking-wide shadow-lg"
                >
                    🚀 Fast Delivery in 20 Minutes
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                    className="text-6xl md:text-8xl font-black mb-8 leading-tight drop-shadow-lg tracking-tighter"
                >
                    Taste the <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-orange-400"
                        style={{ WebkitTextFillColor: 'transparent', WebkitBackgroundClip: 'text', backgroundImage: 'linear-gradient(to right, #ff4757, #ff9f43)' }}>Extraordinary</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="text-xl md:text-2xl mb-12 text-gray-200 max-w-3xl mx-auto font-light leading-relaxed drop-shadow-md"
                >
                    Experience gourmet dining from the comfort of your home.
                    Curated restaurants, zero compromise on quality.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4, type: 'spring' }}
                    className="bg-white/95 backdrop-blur-xl p-3 rounded-[2rem] max-w-3xl mx-auto shadow-2xl flex flex-col md:flex-row items-center gap-2 border border-white/40 ring-4 ring-black/5"
                >
                    <div className="flex items-center gap-3 px-6 h-14 md:border-r border-gray-200 w-full md:w-1/3">
                        <MapPin className="text-primary w-6 h-6 flex-shrink-0" />
                        <input
                            type="text"
                            placeholder="Your Location"
                            className="bg-transparent border-none focus:outline-none text-text w-full placeholder-gray-400 font-medium"
                        />
                    </div>
                    <div className="flex items-center gap-3 px-6 h-14 flex-1 w-full relative">
                        <Search className="text-gray-400 w-6 h-6 flex-shrink-0" />
                        <input
                            type="text"
                            placeholder="Search for restaurants, cuisine..."
                            className="bg-transparent border-none focus:outline-none text-text w-full placeholder-gray-400 font-medium"
                        />
                    </div>
                    <button className="btn btn-primary h-14 px-10 rounded-[1.5rem] shadow-lg shadow-primary/30 w-full md:w-auto text-lg hover:shadow-primary/50 transition-shadow">
                        Search
                    </button>
                </motion.div>

                <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
                    <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
                </div>
            </div>
        </header>
    );
};

export default Hero;
