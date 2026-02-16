const allRoles = {
    admin: [
        'createUser', 'queryUsers', 'getUserById', 'updateUser', 'deleteUser',
        'createRestaurant', 'queryRestaurants', 'getRestaurantById', 'updateRestaurant', 'deleteRestaurant',
        'createCategory', 'queryCategories', 'getCategoryById', 'updateCategory', 'deleteCategory', 'getCategoryByRestaurantId',
        'createProduct', 'queryProducts', 'getProductById', 'updateProduct', 'deleteProduct',
        'queryProductsByRestaurantId', 'queryProductsByMenuId', 'getProductByMenuId', 'addBulkProducts',
        'addVariants', 'updateVariant', 'queryVariants', 'removeVariant',
        'createCart', 'getCart', 'updateCart', 'deleteCart', 'clearCart',
    ],
    user: [
        'queryProducts', 'getProductById', 'updateProduct',
        'createCart', 'getCart', 'updateCart', 'deleteCart', 'clearCart',
        'createCategory', 'queryCategories', 'getCategoryById', 'updateCategory', 'deleteCategory', 'getCategoryByRestaurantId',
        'createRestaurant', 'queryRestaurants', 'getRestaurantById',
        'createAddress', 'updateAddress', 'deleteAddress', 'getAddressById', 'getAddressesByUserId', 'updateDefaultAddress', 'getDefaultAddress',
        'createOrder', 'getOrdersByUserId', 'getOrderById'
    ]
}

const roleList = Object.keys(allRoles)
const roleRights = new Map(Object.entries(allRoles))


module.exports = {
    roleList,
    roleRights
}