import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import CategoryList from '../components/CategoryList';
import RestaurantList from '../components/RestaurantList';
import Footer from '../components/Footer';
import { getRestaurants, getCategories } from '../services/api';

const Home = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [resData, catData] = await Promise.all([
                    getRestaurants(),
                    getCategories()
                ]);
                setRestaurants(resData.data.data);
                setCategories(catData.data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-background text-text">
            <Hero />
            <CategoryList categories={categories} />
            <RestaurantList restaurants={restaurants} />
            <Footer />
        </div>
    );
};

export default Home;
