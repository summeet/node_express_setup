const mongoose = require('mongoose');
const config = require('./config/config');
const Restaurant = require('./schemas/restaurant.schema');
const Category = require('./schemas/category.schema');
const Product = require('./schemas/product.schema');

const seedData = async () => {
    try {
        await mongoose.connect(config.MONGODB_URI);
        console.log('Connected to MongoDB for seeding...');

        // Clear existing data
        await Restaurant.deleteMany({});
        await Category.deleteMany({});
        await Product.deleteMany({});

        // Restaurants
        const restaurants = await Restaurant.insertMany([
            {
                name: 'The Italian Bistro',
                description: 'Authentic Italian pizza and pasta made with love.',
                rating: 4.8,
                image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800',
                address: '123 Pizza Lane, Food City',
                restaurantType: 'BOTH'
            },
            {
                name: 'Burger Kingdom',
                description: 'Juicy burgers and crispy fries for the soul.',
                rating: 4.5,
                image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800',
                address: '456 Patty Way, Meat Town',
                restaurantType: 'BOTH'
            },
            {
                name: 'Sushi Zen',
                description: 'Fresh sushi and sashimi from the heart of Japan.',
                rating: 4.9,
                image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
                address: '789 Nori Road, Sea Port',
                restaurantType: 'BOTH'
            },
            {
                name: 'Green Leaf Salads',
                description: 'Healthy, fresh, and delicious salads for everyone.',
                rating: 4.2,
                image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800',
                address: '101 Veggie Garden, Green City',
                restaurantType: 'VEG'
            }
        ]);

        console.log('Restaurants seeded');

        // Categories (Now require restaurantId)
        // For simplicity, we'll associate categories with specific restaurants or multiple
        const categories = await Category.insertMany([
            { name: 'Pizza', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400', restaurantId: restaurants[0]._id },
            { name: 'Burgers', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400', restaurantId: restaurants[1]._id },
            { name: 'Sushi', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400', restaurantId: restaurants[2]._id },
            { name: 'Salads', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400', restaurantId: restaurants[3]._id },
            { name: 'Desserts', image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400', restaurantId: restaurants[1]._id }, // Example
            { name: 'Drinks', image: 'https://images.unsplash.com/photo-1544145945-f904253d0c7b?w=400', restaurantId: restaurants[0]._id }  // Example
        ]);

        console.log('Categories seeded');

        // Products
        await Product.insertMany([
            {
                name: 'Margherita Pizza',
                description: 'Classic tomato and mozzarella pizza.',
                price: 12.99,
                stock: 50, // Required
                image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400',
                categoryId: categories[0]._id, // Fixed field name
                restaurantId: restaurants[0]._id, // Fixed field name
                foodType: 'VEG', // Required
                rating: { average: 4.7, count: 10 }
            },
            {
                name: 'Classic Cheeseburger',
                description: 'Gourmet beef patty with melted cheese.',
                price: 9.99,
                stock: 100, // Required
                image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
                categoryId: categories[1]._id,
                restaurantId: restaurants[1]._id,
                foodType: 'NON_VEG', // Required
                rating: { average: 4.6, count: 25 }
            }
        ]);

        console.log('Products seeded');
        console.log('Seeding completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData();
