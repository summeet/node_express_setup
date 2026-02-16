# CraveDash - Modern Food Delivery Platform

CraveDash is a full-stack, robust, and scalable food delivery application built with React, Node.js, Express, and MongoDB. It features a premium UI, real-time cart synchronization, and a comprehensive order management system.

## 🚀 Key Features

- **Premium UI/UX**: Built with React, Tailwind-inspired Vanilla CSS, and Framer Motion for smooth animations.
- **Global Navigation**: Unified Navbar with real-time authentication state synchronization.
- **Discovery**: Integrated product and restaurant search functionality.
- **Cart Management**: Persistent shopping cart with instant quantity updates across the application.
- **Secure Ordering**: Role-based access control (RBAC), JWT authentication, and secure checkout flow.
- **Address Management**: Save and manage multiple delivery locations with a default preference.
- **API Documentation**: Automated Swagger generation and full Postman collection included.

## 📁 Project Structure

```bash
node_base_setup/
├── client/              # Frontend React application
│   ├── src/
│   │   ├── components/  # Reusable UI components (Navbar, ProductCard, etc.)
│   │   ├── pages/       # Page views (Home, Checkout, Orders, etc.)
│   │   └── contexts/    # React Contexts (CartProvider, etc.)
├── config/              # Server configuration and RBAC roles
├── controller/          # Request validation and API logic
├── routes/              # Express API route definitions
├── schemas/             # Mongoose models and data schemas
├── services/            # Business logic and database interactions
├── index.js             # Backend entry point
└── cravdash_postman_collection.json # Direct import for Postman testing
```

## 🛠️ Getting Started

### Prerequisites

- **Node.js** (v16+ recommended)
- **MongoDB** (running locally or a cloud instance)

### Installation

1. **Clone and Install**:
```bash
git clone <repository-url>
cd node_base_setup
npm install
cd client && npm install
cd ..
```

2. **Environment Setup**:
Create a `.env` file in the root directory:
```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/cravdash
JWT_SECRET=your_jwt_secret_here
NODE_ENV=development
```

### Running the Application

You can run both client and server simultaneously using:
```bash
npm run dev
```
- **Backend**: `http://localhost:3001`
- **Frontend**: `http://localhost:5173` (or configured Vite port)

## 📡 API Documentation

### Postman
A pre-configured Postman collection is provided in the root directory: `cravdash_postman_collection.json`. Import this into Postman to test all endpoints instantly.

### Swagger
Interactive API documentation is available at:
- **Local**: `http://localhost:3001/api-docs`
- **JSON Definition**: `./swagger-output.json`

### Core Endpoints

| Category | Endpoint | Description |
| :--- | :--- | :--- |
| **Auth** | `POST /api/auth/login` | User authentication |
| **Restaurants** | `GET /api/restaurants` | List all venues |
| **Products** | `GET /api/products/restaurant/:id` | Get menu for a restaurant |
| **Cart** | `POST /api/cart/add` | Add product to bag |
| **Orders** | `POST /api/orders` | Place a new order |
| **Addresses** | `GET /api/addresses/user/:id` | Fetch saved locations |

## 🧪 Error Handling

CraveDash uses a centralized error-handling system:
- **Custom ApiError Class**: For consistent error responses.
- **Joi Validation**: Schema-based validation for all incoming requests.
- **Global Middleware**: Catches and formats all operational errors.

## 🧰 Tech Stack

- **Frontend**: React, Framer Motion, Lucide Icons, Axios, React Hot Toast.
- **Backend**: Node.js, Express, Mongoose, JWT, BcryptJS.
- **Docs**: Swagger Autogen.

---
Developed by **Sumit FE** @ Doodleblue
