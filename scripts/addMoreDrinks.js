const mongoose = require("mongoose");
const Product = require("../schemas/product.schema");
const Category = require("../schemas/category.schema");
require("dotenv").config();

// New drinks to add to Beverages category
const newDrinks = [
    // Cold Drinks
    { name: "Virgin Pina Colada", description: "Tropical coconut and pineapple blend", price: 7.49, foodType: "VEG" },
    { name: "Watermelon Cooler", description: "Fresh watermelon juice with mint", price: 5.99, foodType: "VEG" },
    { name: "Blue Lagoon", description: "Blue curacao mocktail with lemon", price: 6.49, foodType: "VEG" },

    // Hot Beverages
    { name: "Green Tea", description: "Antioxidant-rich green tea", price: 3.99, foodType: "VEG" },
    { name: "Hot Chocolate", description: "Rich creamy hot chocolate", price: 4.99, foodType: "VEG" },
    { name: "Herbal Tea", description: "Soothing herbal infusion", price: 3.99, foodType: "VEG" },

    // Coffee
    { name: "Cappuccino", description: "Espresso with steamed milk foam", price: 5.49, foodType: "VEG" },
    { name: "Latte", description: "Smooth espresso with milk", price: 5.49, foodType: "VEG" },
    { name: "Americano", description: "Espresso with hot water", price: 4.99, foodType: "VEG" },

    // Fresh Juices & Smoothies
    { name: "Fresh Orange Juice", description: "Freshly squeezed orange juice", price: 5.49, foodType: "VEG" },
    { name: "Mixed Fruit Juice", description: "Seasonal fruit blend", price: 5.99, foodType: "VEG" },
    { name: "Berry Smoothie", description: "Mixed berries with yogurt", price: 6.99, foodType: "VEG" },
    { name: "Banana Shake", description: "Creamy banana milkshake", price: 5.99, foodType: "VEG" },
    { name: "Chocolate Shake", description: "Rich chocolate milkshake", price: 6.49, foodType: "VEG" },
    { name: "Strawberry Shake", description: "Fresh strawberry milkshake", price: 6.49, foodType: "VEG" }
];

const addDrinksToRestaurants = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("✅ Connected to MongoDB");

        // Find all Beverages categories
        const beverageCategories = await Category.find({ name: "Beverages" });
        console.log(`📍 Found ${beverageCategories.length} Beverages categories`);

        let totalDrinksAdded = 0;

        for (const category of beverageCategories) {
            console.log(`\n🍹 Adding drinks to category: ${category._id}`);

            for (const drink of newDrinks) {
                // Check if drink already exists
                const existingProduct = await Product.findOne({
                    categoryId: category._id,
                    name: drink.name
                });

                if (existingProduct) {
                    console.log(`   ⏭️  Skipping "${drink.name}" - already exists`);
                    continue;
                }

                // Generate color based on food type
                const colorMap = {
                    'VEG': '10b981',      // Green
                    'NON_VEG': 'ef4444',  // Red
                    'BOTH': 'f59e0b'      // Orange
                };
                const bgColor = colorMap[drink.foodType] || '6366f1';

                await Product.create({
                    restaurantId: category.restaurantId,
                    categoryId: category._id,
                    name: drink.name,
                    description: drink.description,
                    price: drink.price,
                    stock: Math.floor(Math.random() * 50) + 10,
                    image: `https://placehold.co/400x400/${bgColor}/white?text=${encodeURIComponent(drink.name.substring(0, 15))}`,
                    isAvailable: true,
                    foodType: drink.foodType,
                    status: "active",
                    rating: {
                        average: (Math.random() * 2 + 3).toFixed(1),
                        count: Math.floor(Math.random() * 100) + 10
                    }
                });

                totalDrinksAdded++;
                console.log(`   ✅ Added "${drink.name}"`);
            }
        }

        console.log(`\n🎉 Successfully added ${totalDrinksAdded} new drinks!`);
        process.exit(0);
    } catch (error) {
        console.error("❌ Error adding drinks:", error);
        process.exit(1);
    }
};

addDrinksToRestaurants();
