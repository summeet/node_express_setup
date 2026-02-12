const mongoose = require('mongoose');
const config = require('../config/config');
const Category = require('../schemas/category.schema');

// Category name to image URL mapping
const categoryImageMap = {
    'pizza': 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400',
    'burgers': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
    'burger': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
    'sushi': 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400',
    'salads': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
    'salad': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
    'desserts': 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400',
    'dessert': 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400',
    'drinks': 'https://images.unsplash.com/photo-1544145945-f904253d0c7b?w=400',
    'drink': 'https://images.unsplash.com/photo-1544145945-f904253d0c7b?w=400',
    'beverages': 'https://images.unsplash.com/photo-1544145945-f904253d0c7b?w=400',
    'pasta': 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400',
    'noodles': 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400',
    'rice': 'https://images.unsplash.com/photo-1516684732162-798a0062be99?w=400',
    'chicken': 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400',
    'seafood': 'https://images.unsplash.com/photo-1559737558-2f5a7a0e5cbc?w=400',
    'steak': 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400',
    'sandwiches': 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400',
    'sandwich': 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400',
    'tacos': 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400',
    'indian': 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400',
    'chinese': 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=400',
    'mexican': 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=400',
    'italian': 'https://images.unsplash.com/photo-1498579150354-977475b7ea0b?w=400',
    'breakfast': 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=400',
    'soup': 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400',
    'snacks': 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=400',
    'appetizers': 'https://images.unsplash.com/photo-1541014741259-de529411b96a?w=400',
    'vegan': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
    'vegetarian': 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400',
    'bakery': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400',
    'coffee': 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
    'tea': 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400',
    'ice cream': 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400',
    'smoothies': 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400',
    'drinks': 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400',
    // Default image for unmatched categories
    'default': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400'
};

const getCategoryImage = (categoryName) => {
    const name = categoryName.toLowerCase().trim();
    
    // Direct match
    if (categoryImageMap[name]) {
        return categoryImageMap[name];
    }
    
    // Partial match
    for (const [key, value] of Object.entries(categoryImageMap)) {
        if (name.includes(key) || key.includes(name)) {
            return value;
        }
    }
    
    // Default image
    return categoryImageMap['default'];
};

const updateCategoryImages = async () => {
    try {
        await mongoose.connect(config.MONGODB_URI);
        console.log('Connected to MongoDB...');

        // Find all categories
        const categories = await Category.find({});
        console.log(`Found ${categories.length} categories to update`);

        let updatedCount = 0;
        let skippedCount = 0;

        for (const category of categories) {
            // Only update if image is not set or empty
            if (!category.image || category.image.trim() === '') {
                const imageUrl = getCategoryImage(category.name);
                category.image = imageUrl;
                await category.save();
                console.log(`✓ Updated category "${category.name}" with image`);
                updatedCount++;
            } else {
                console.log(`⊘ Skipped category "${category.name}" (already has image)`);
                skippedCount++;
            }
        }

        console.log('\n=== Update Summary ===');
        console.log(`Total categories: ${categories.length}`);
        console.log(`Updated: ${updatedCount}`);
        console.log(`Skipped: ${skippedCount}`);
        console.log('✓ Category images updated successfully!');
        
        process.exit(0);
    } catch (error) {
        console.error('Error updating category images:', error);
        process.exit(1);
    }
};

updateCategoryImages();
