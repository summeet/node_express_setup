import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(config => config, error => {
    if (error.response.status === 401) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        window.location.href = '/login'
    }
    throw error
})

// Restaurant APIs
export const getRestaurants = () => api.get('/restaurants');
export const getRestaurantById = (id) => api.get(`/restaurants/${id}`);

// Category APIs
export const getCategories = () => api.get('/categories');
export const getCategoryByRestaurantId = (restaurantId) => api.get(`/categories/restaurant/${restaurantId}`);
export const createCategory = (categoryData) => api.post('/categories', categoryData);

// Product APIs
export const getProducts = () => api.get('/products');
export const getProductsByRestaurantId = (restaurantId) => api.get(`/products/restaurant/${restaurantId}`);
export const createProduct = (productData) => api.post('/products', productData);

// Auth APIs
export const login = (email, password) => api.post('/auth/login', { email, password });
export const register = (userData) => api.post('/auth/register', userData);

// Cart APIs
export const getCart = (userId) => api.get(`/cart/${userId}`);
export const addToCart = (userId, productId, quantity = 1) => api.post('/cart/add', { userId, productId, quantity });
export const updateCartQuantity = (userId, productId, quantity) => api.put('/cart/update', { userId, productId, quantity });
export const removeFromCart = (userId, productId) => api.delete('/cart/delete', { data: { userId, productId } });
export const clearCart = (userId) => api.delete(`/cart/clear/${userId}`);

// Checkout APIs
export const createCheckout = (checkoutData) => api.post('/checkout', checkoutData);
export const getCheckoutById = (id) => api.get(`/checkout/${id}`);

// Order APIs
export const createOrder = (orderData) => api.post('/orders', orderData);
export const getOrdersByUserId = (userId) => api.get(`/orders/user/${userId}`);
export const getOrderById = (id) => api.get(`/orders/${id}`);

// Notification APIs (External API)
const NOTIFICATION_API_URL = 'https://nedevbe.zimbea.com/api';

export const getNotifications = () => {
    const token = localStorage.getItem('token');
    return axios.get(`${NOTIFICATION_API_URL}/notifications`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

export const markAllNotificationsAsRead = () => {
    const token = localStorage.getItem('token');
    return axios.patch(`${NOTIFICATION_API_URL}/notifications/read-all`, {}, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

export default api;
