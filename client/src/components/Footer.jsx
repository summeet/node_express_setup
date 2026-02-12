import React from 'react';
import { Utensils, ChevronRight } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white pt-20 pb-10 border-t border-gray-100">
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20 text-center md:text-left">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2 mb-6 justify-center md:justify-start">
                            <div className="bg-primary p-2 rounded-xl">
                                <Utensils className="text-white" />
                            </div>
                            <span className="text-2xl font-black text-secondary">CraveDash</span>
                        </div>
                        <p className="text-text-light font-medium tracking-wide">The best food delivery service in town. Fresh, fast, and always delicious.</p>
                    </div>
                    <div>
                        <h4 className="font-bold mb-6 text-lg">Company</h4>
                        <ul className="space-y-4 text-text-light font-medium">
                            <li><a href="#" className="hover:text-primary transition-colors hover:translate-x-1 inline-block">About Us</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors hover:translate-x-1 inline-block">Careers</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors hover:translate-x-1 inline-block">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-6 text-lg">Support</h4>
                        <ul className="space-y-4 text-text-light font-medium">
                            <li><a href="#" className="hover:text-primary transition-colors hover:translate-x-1 inline-block">Help Center</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors hover:translate-x-1 inline-block">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors hover:translate-x-1 inline-block">Terms of Service</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-6 text-lg">Newsletter</h4>
                        <div className="flex bg-gray-100 p-1.5 rounded-2xl w-full">
                            <input type="text" placeholder="Your Email" className="bg-transparent border-none px-4 py-2 focus:outline-none w-full text-sm font-medium" />
                            <button className="btn btn-primary p-3 rounded-xl shadow-lg shadow-primary/20"><ChevronRight className="w-5 h-5" /></button>
                        </div>
                    </div>
                </div>
                <div className="text-center pt-10 border-t border-gray-100/50 text-text-light text-sm font-medium">
                    © 2024 CraveDash. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
