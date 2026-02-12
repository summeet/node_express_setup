const mongoose = require("mongoose");
const Product = require("../schemas/product.schema");
const Category = require("../schemas/category.schema");
const Restaurant = require("../schemas/restaurant.schema");
require("dotenv").config();

// Extended category list with diverse options
const categoryTemplates = [
    { name: "Appetizers & Starters", description: "Delicious bites to start your meal" },
    { name: "Main Course", description: "Hearty and satisfying main dishes" },
    { name: "Desserts", description: "Sweet treats to end your meal" },
    { name: "Beverages", description: "Refreshing drinks and beverages" },
    { name: "Salads & Soups", description: "Fresh and healthy options" },
    { name: "Pizza & Pasta", description: "Italian favorites" },
    { name: "Burgers & Sandwiches", description: "Classic comfort food" },
    { name: "Indian Curries", description: "Authentic Indian flavors" },
    { name: "Chinese Specials", description: "Oriental delicacies" },
    { name: "Biryani & Rice", description: "Aromatic rice dishes" },
    { name: "Breads & Naan", description: "Freshly baked breads" },
    { name: "Seafood", description: "Fresh from the ocean" },
    { name: "Grills & BBQ", description: "Smoky and grilled delights" },
    { name: "Healthy Options", description: "Nutritious and balanced meals" },
    { name: "Kids Menu", description: "Kid-friendly favorites" }
];

// Extensive product templates for different categories
const productTemplates = {
    "Appetizers & Starters": [
        { name: "Spring Rolls", description: "Crispy vegetable spring rolls with sweet chili sauce", price: 8.99, foodType: "VEG" },
        { name: "Chicken Wings", description: "Spicy buffalo wings with ranch dip", price: 12.99, foodType: "NON_VEG" },
        { name: "Mozzarella Sticks", description: "Golden fried cheese sticks with marinara", price: 9.99, foodType: "VEG" },
        { name: "Samosa Platter", description: "Crispy samosas with mint chutney", price: 7.99, foodType: "VEG" },
        { name: "Fish Fingers", description: "Crispy breaded fish with tartar sauce", price: 11.99, foodType: "NON_VEG" },
        { name: "Paneer Tikka", description: "Grilled cottage cheese with spices", price: 10.99, foodType: "VEG" }
    ],
    "Main Course": [
        { name: "Butter Chicken", description: "Creamy tomato-based chicken curry", price: 16.99, foodType: "NON_VEG" },
        { name: "Paneer Butter Masala", description: "Rich and creamy cottage cheese curry", price: 14.99, foodType: "VEG" },
        { name: "Grilled Salmon", description: "Fresh salmon with lemon butter sauce", price: 22.99, foodType: "NON_VEG" },
        { name: "Vegetable Korma", description: "Mixed vegetables in coconut curry", price: 13.99, foodType: "VEG" },
        { name: "Lamb Rogan Josh", description: "Tender lamb in aromatic gravy", price: 19.99, foodType: "NON_VEG" },
        { name: "Dal Makhani", description: "Black lentils in creamy tomato gravy", price: 12.99, foodType: "VEG" }
    ],
    "Desserts": [
        { name: "Chocolate Lava Cake", description: "Warm chocolate cake with molten center", price: 7.99, foodType: "VEG" },
        { name: "Tiramisu", description: "Classic Italian coffee-flavored dessert", price: 8.99, foodType: "VEG" },
        { name: "Gulab Jamun", description: "Sweet milk dumplings in sugar syrup", price: 5.99, foodType: "VEG" },
        { name: "Cheesecake", description: "New York style cheesecake with berry compote", price: 9.99, foodType: "VEG" },
        { name: "Ice Cream Sundae", description: "Three scoops with toppings", price: 6.99, foodType: "VEG" },
        { name: "Rasmalai", description: "Soft cottage cheese in sweet milk", price: 6.99, foodType: "VEG" }
    ],
    "Beverages": [
        // Cold Drinks
        { name: "Fresh Lime Soda", description: "Refreshing lime with soda", price: 3.99, foodType: "VEG" },
        { name: "Mango Lassi", description: "Sweet yogurt drink with mango", price: 4.99, foodType: "VEG" },
        { name: "Mojito", description: "Refreshing mint and lime drink", price: 6.99, foodType: "VEG" },
        { name: "Virgin Pina Colada", description: "Tropical coconut and pineapple blend", price: 7.49, foodType: "VEG" },
        { name: "Watermelon Cooler", description: "Fresh watermelon juice with mint", price: 5.99, foodType: "VEG" },
        { name: "Blue Lagoon", description: "Blue curacao mocktail with lemon", price: 6.49, foodType: "VEG" },

        // Hot Beverages
        { name: "Masala Chai", description: "Spiced Indian tea", price: 3.49, foodType: "VEG" },
        { name: "Green Tea", description: "Antioxidant-rich green tea", price: 3.99, foodType: "VEG" },
        { name: "Hot Chocolate", description: "Rich creamy hot chocolate", price: 4.99, foodType: "VEG" },
        { name: "Herbal Tea", description: "Soothing herbal infusion", price: 3.99, foodType: "VEG" },

        // Coffee
        { name: "Iced Coffee", description: "Cold brew with ice", price: 5.99, foodType: "VEG" },
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
    ],
    "Salads & Soups": [
        { name: "Caesar Salad", description: "Romaine lettuce with Caesar dressing", price: 9.99, foodType: "VEG" },
        { name: "Greek Salad", description: "Fresh vegetables with feta cheese", price: 10.99, foodType: "VEG" },
        { name: "Tomato Soup", description: "Creamy tomato soup with basil", price: 6.99, foodType: "VEG" },
        { name: "Chicken Soup", description: "Clear chicken broth with vegetables", price: 7.99, foodType: "NON_VEG" },
        { name: "Garden Fresh Salad", description: "Mixed greens with vinaigrette", price: 8.99, foodType: "VEG" },
        { name: "Hot & Sour Soup", description: "Spicy and tangy Asian soup", price: 7.49, foodType: "BOTH" }
    ],
    "Pizza & Pasta": [
        { name: "Margherita Pizza", description: "Classic tomato and mozzarella pizza", price: 14.99, foodType: "VEG" },
        { name: "Pepperoni Pizza", description: "Loaded with pepperoni slices", price: 16.99, foodType: "NON_VEG" },
        { name: "Alfredo Pasta", description: "Creamy white sauce pasta", price: 13.99, foodType: "VEG" },
        { name: "Chicken Pesto Pasta", description: "Pasta with basil pesto and grilled chicken", price: 15.99, foodType: "NON_VEG" },
        { name: "Veggie Supreme Pizza", description: "Loaded with fresh vegetables", price: 15.99, foodType: "VEG" },
        { name: "Spaghetti Bolognese", description: "Classic meat sauce pasta", price: 14.99, foodType: "NON_VEG" }
    ],
    "Burgers & Sandwiches": [
        { name: "Classic Beef Burger", description: "Juicy beef patty with all toppings", price: 12.99, foodType: "NON_VEG" },
        { name: "Veggie Burger", description: "Plant-based patty with fresh veggies", price: 10.99, foodType: "VEG" },
        { name: "Chicken Club Sandwich", description: "Triple-decker with grilled chicken", price: 11.99, foodType: "NON_VEG" },
        { name: "Grilled Cheese Sandwich", description: "Melted cheese on toasted bread", price: 8.99, foodType: "VEG" },
        { name: "Fish Burger", description: "Crispy fish fillet with tartar sauce", price: 13.99, foodType: "NON_VEG" },
        { name: "Paneer Tikka Sandwich", description: "Spiced cottage cheese sandwich", price: 9.99, foodType: "VEG" }
    ],
    "Indian Curries": [
        { name: "Chicken Tikka Masala", description: "Grilled chicken in creamy tomato gravy", price: 16.99, foodType: "NON_VEG" },
        { name: "Palak Paneer", description: "Cottage cheese in spinach gravy", price: 14.99, foodType: "VEG" },
        { name: "Mutton Curry", description: "Tender mutton in spicy gravy", price: 18.99, foodType: "NON_VEG" },
        { name: "Chole Masala", description: "Spiced chickpea curry", price: 12.99, foodType: "VEG" },
        { name: "Fish Curry", description: "Fresh fish in coconut curry", price: 17.99, foodType: "NON_VEG" },
        { name: "Aloo Gobi", description: "Potato and cauliflower curry", price: 11.99, foodType: "VEG" }
    ],
    "Chinese Specials": [
        { name: "Hakka Noodles", description: "Stir-fried noodles with vegetables", price: 11.99, foodType: "VEG" },
        { name: "Chicken Manchurian", description: "Crispy chicken in spicy sauce", price: 14.99, foodType: "NON_VEG" },
        { name: "Fried Rice", description: "Wok-tossed rice with vegetables", price: 10.99, foodType: "VEG" },
        { name: "Chilli Chicken", description: "Spicy chicken with bell peppers", price: 15.99, foodType: "NON_VEG" },
        { name: "Veg Manchurian", description: "Vegetable balls in tangy sauce", price: 12.99, foodType: "VEG" },
        { name: "Szechuan Noodles", description: "Spicy Szechuan style noodles", price: 13.99, foodType: "BOTH" }
    ],
    "Biryani & Rice": [
        { name: "Chicken Biryani", description: "Aromatic basmati rice with chicken", price: 15.99, foodType: "NON_VEG" },
        { name: "Veg Biryani", description: "Fragrant rice with mixed vegetables", price: 13.99, foodType: "VEG" },
        { name: "Mutton Biryani", description: "Tender mutton with aromatic rice", price: 17.99, foodType: "NON_VEG" },
        { name: "Egg Biryani", description: "Boiled eggs in spiced rice", price: 12.99, foodType: "BOTH" },
        { name: "Jeera Rice", description: "Cumin-flavored basmati rice", price: 7.99, foodType: "VEG" },
        { name: "Hyderabadi Biryani", description: "Authentic Hyderabadi style biryani", price: 18.99, foodType: "NON_VEG" }
    ],
    "Breads & Naan": [
        { name: "Butter Naan", description: "Soft leavened bread with butter", price: 3.99, foodType: "VEG" },
        { name: "Garlic Naan", description: "Naan topped with garlic and herbs", price: 4.49, foodType: "VEG" },
        { name: "Tandoori Roti", description: "Whole wheat flatbread", price: 2.99, foodType: "VEG" },
        { name: "Cheese Naan", description: "Naan stuffed with cheese", price: 5.99, foodType: "VEG" },
        { name: "Paratha", description: "Layered flatbread", price: 3.49, foodType: "VEG" },
        { name: "Kulcha", description: "Soft leavened bread", price: 4.99, foodType: "VEG" }
    ],
    "Seafood": [
        { name: "Grilled Prawns", description: "Marinated prawns grilled to perfection", price: 21.99, foodType: "NON_VEG" },
        { name: "Fish & Chips", description: "Battered fish with crispy fries", price: 16.99, foodType: "NON_VEG" },
        { name: "Calamari Rings", description: "Crispy fried squid rings", price: 14.99, foodType: "NON_VEG" },
        { name: "Lobster Thermidor", description: "Creamy lobster in shell", price: 29.99, foodType: "NON_VEG" },
        { name: "Crab Cakes", description: "Pan-fried crab patties", price: 18.99, foodType: "NON_VEG" },
        { name: "Tuna Steak", description: "Seared tuna with wasabi", price: 24.99, foodType: "NON_VEG" }
    ],
    "Grills & BBQ": [
        { name: "BBQ Chicken", description: "Smoky grilled chicken", price: 16.99, foodType: "NON_VEG" },
        { name: "Grilled Vegetables", description: "Assorted grilled veggies", price: 12.99, foodType: "VEG" },
        { name: "Lamb Chops", description: "Tender grilled lamb chops", price: 22.99, foodType: "NON_VEG" },
        { name: "Tandoori Chicken", description: "Clay oven roasted chicken", price: 17.99, foodType: "NON_VEG" },
        { name: "Seekh Kebab", description: "Minced meat skewers", price: 15.99, foodType: "NON_VEG" },
        { name: "Paneer Tikka", description: "Grilled cottage cheese cubes", price: 13.99, foodType: "VEG" }
    ],
    "Healthy Options": [
        { name: "Quinoa Bowl", description: "Protein-rich quinoa with veggies", price: 13.99, foodType: "VEG" },
        { name: "Grilled Chicken Salad", description: "Lean protein with fresh greens", price: 14.99, foodType: "NON_VEG" },
        { name: "Smoothie Bowl", description: "Acai bowl with fresh fruits", price: 11.99, foodType: "VEG" },
        { name: "Steamed Fish", description: "Light and healthy steamed fish", price: 18.99, foodType: "NON_VEG" },
        { name: "Buddha Bowl", description: "Nutritious grain and veggie bowl", price: 12.99, foodType: "VEG" },
        { name: "Protein Shake", description: "High protein smoothie", price: 7.99, foodType: "VEG" }
    ],
    "Kids Menu": [
        { name: "Chicken Nuggets", description: "Crispy chicken nuggets with fries", price: 8.99, foodType: "NON_VEG" },
        { name: "Mac & Cheese", description: "Creamy macaroni and cheese", price: 7.99, foodType: "VEG" },
        { name: "Mini Pizza", description: "Personal sized pizza", price: 9.99, foodType: "VEG" },
        { name: "Fish Sticks", description: "Breaded fish fingers", price: 8.99, foodType: "NON_VEG" },
        { name: "Grilled Cheese", description: "Simple grilled cheese sandwich", price: 6.99, foodType: "VEG" },
        { name: "Pasta with Butter", description: "Simple buttered pasta", price: 7.49, foodType: "VEG" }
    ]
};

const seedProductsAndCategories = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("✅ Connected to MongoDB");

        // Get all restaurants
        const restaurants = await Restaurant.find();
        if (restaurants.length === 0) {
            console.log("❌ No restaurants found. Please create restaurants first.");
            process.exit(1);
        }

        console.log(`📍 Found ${restaurants.length} restaurant(s)`);

        let totalCategoriesCreated = 0;
        let totalProductsCreated = 0;

        // For each restaurant, create categories and products
        for (const restaurant of restaurants) {
            console.log(`\n🏪 Processing restaurant: ${restaurant.name}`);

            // Create categories for this restaurant
            const createdCategories = [];
            for (const catTemplate of categoryTemplates) {
                const category = await Category.create({
                    restaurantId: restaurant._id,
                    name: catTemplate.name,
                    description: catTemplate.description,
                    isActive: true
                });
                createdCategories.push(category);
                totalCategoriesCreated++;
            }

            console.log(`   ✅ Created ${createdCategories.length} categories`);

            // Create products for each category
            for (const category of createdCategories) {
                const products = productTemplates[category.name] || [];

                for (const prodTemplate of products) {
                    // Generate a consistent color based on food type
                    const colorMap = {
                        'VEG': '10b981',      // Green
                        'NON_VEG': 'ef4444',  // Red
                        'BOTH': 'f59e0b'      // Orange
                    };
                    const bgColor = colorMap[prodTemplate.foodType] || '6366f1';

                    await Product.create({
                        restaurantId: restaurant._id,
                        categoryId: category._id,
                        name: prodTemplate.name,
                        description: prodTemplate.description,
                        price: prodTemplate.price,
                        stock: Math.floor(Math.random() * 50) + 10, // Random stock between 10-60
                        image: `https://placehold.co/400x400/${bgColor}/white?text=${encodeURIComponent(prodTemplate.name.substring(0, 15))}`,
                        isAvailable: true,
                        foodType: prodTemplate.foodType,
                        status: "active",
                        rating: {
                            average: (Math.random() * 2 + 3).toFixed(1), // Random rating between 3-5
                            count: Math.floor(Math.random() * 100) + 10 // Random count between 10-110
                        }
                    });
                    totalProductsCreated++;
                }

                console.log(`   ✅ Created ${products.length} products for ${category.name}`);
            }
        }

        console.log(`\n🎉 Seeding completed successfully!`);
        console.log(`   📊 Total Categories Created: ${totalCategoriesCreated}`);
        console.log(`   📊 Total Products Created: ${totalProductsCreated}`);

        process.exit(0);
    } catch (error) {
        console.error("❌ Error seeding data:", error);
        process.exit(1);
    }
};

seedProductsAndCategories();
