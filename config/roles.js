const allRoles = {
    admin: [
        'createUser', 'queryUsers', 'getUserById', 'updateUser', 'deleteUser',
        'createRestaurant', 'queryRestaurants', 'getRestaurantById', 'updateRestaurant', 'deleteRestaurant',
        'createCategory', 'queryCategories', 'getCategoryById', 'updateCategory', 'deleteCategory', 'getCategoryByRestaurantId',
        'createProduct', 'queryProducts', 'getProductById', 'updateProduct', 'deleteProduct',
        'queryProductsByRestaurantId', 'queryProductsByMenuId', 'getProductByMenuId',
        'addVariants', 'updateVariant', 'queryVariants', 'removeVariant',
        'createCart', 'getCart', 'updateCart', 'deleteCart', 'clearCart',
    ],
    user: [
        'createProduct', 'queryProducts', 'getProductById', 'updateProduct', 'deleteProduct',
        'createCart', 'getCart', 'updateCart', 'deleteCart', 'clearCart',
    ]
}

const roleList = Object.keys(allRoles)
const roleRights = new Map(Object.entries(allRoles))


module.exports = {
    roleList,
    roleRights
}