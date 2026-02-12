const mongoose = require("mongoose");
const Product = require("../schemas/product.schema");
require("dotenv").config();

const updateProductImages = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("✅ Connected to MongoDB");

        // Get all products
        const products = await Product.find();
        console.log(`📦 Found ${products.length} products to update`);

        let updatedCount = 0;

        for (const product of products) {
            // Generate color based on food type
            const colorMap = {
                'VEG': '10b981',      // Green
                'NON_VEG': 'ef4444',  // Red
                'BOTH': 'f59e0b'      // Orange
            };
            const bgColor = colorMap[product.foodType] || '6366f1';

            // Update image URL
            product.image = `https://placehold.co/400x400/${bgColor}/white?text=${encodeURIComponent(product.name.substring(0, 15))}`;
            await product.save();
            updatedCount++;
        }

        console.log(`✅ Updated ${updatedCount} product images`);
        process.exit(0);
    } catch (error) {
        console.error("❌ Error updating images:", error);
        process.exit(1);
    }
};

updateProductImages();
