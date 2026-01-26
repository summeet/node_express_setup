# RESTful API Node Server Boilerplate

A robust and scalable RESTful API boilerplate built with Node.js, Express, and MongoDB. This project follows a layered architecture (Controller-Service-Repository pattern) and includes comprehensive error handling and configuration management.

## Features

- **Express.js**: Fast, unopinionated, minimalist web framework for Node.js.
- **MongoDB & Mongoose**: Object Data Modeling (ODM) library for MongoDB and Node.js.
- **Layered Architecture**: Separation of concerns with Routes, Controllers, Services, and Schemas.
- **Centralized Error Handling**: Custom `ApiError` class and global error handling middleware.
- **Validation**: Mongoose schema validation with custom error formatting.
- **Environment Configuration**: Easy configuration using `.env` files.
- **HTTP Status Constants**: Consistent use of HTTP status codes.

## Project Structure

```
node_base_setup/
├── config/             # Environment variables and configuration
├── constant/           # Constants (e.g., HTTP status codes)
├── controller/         # Request validation and response handling
├── middleware/         # Application middleware (Error handling)
├── routes/             # API route definitions
├── schemas/            # Mongoose models and schemas
├── services/           # Business logic and database interactions
├── utils/              # Utility classes (ApiError, etc.)
├── index.js            # App entry point
└── package.json        # Project metadata and dependencies
```

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- MongoDB (running locally or a cloud instance)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd node_base_setup
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env` file in the root directory and add the following:
    ```env
    PORT=3001
    MONGODB_URI=mongodb://localhost:27017/your_database_name
    NODE_ENV=development
    ```

### Running the Server

-   **Development Mode** (with nodemon):
    ```bash
    npm start
    ```
    The server will start on `http://localhost:3001` (or your configured port).

## API Endpoints

### Users

| Method | Endpoint      | Description           |
| :----- | :------------ | :-------------------- |
| POST   | `/api/users`  | Create a new user     |
| GET    | `/api/users`  | Get all users         |
| GET    | `/api/users/:id` | Get user by ID     |
| PUT    | `/api/users/:id` | Update user by ID  |
| DELETE | `/api/users/:id` | Delete user by ID  |

## Error Handling

The application uses a centralized error handling mechanism.
-   **Operational Errors**: Handled gracefully with appropriate HTTP status codes and messages (e.g., Validation Errors, Not Found).
-   **Programmer Errors**: In production, these are generic "Internal Server Error" to prevent leaking sensitive details.
-   **Validation Errors**: Mongoose validation errors are formatted into a clean JSON structure:
    ```json
    {
      "code": 400,
      "message": "Validation failed",
      "errors": {
        "email": "Invalid email address",
        "name": "Path `name` is required."
      }
    }
    ```

## Technologies Used

-   [Node.js](https://nodejs.org/)
-   [Express](https://expressjs.com/)
-   [Mongoose](https://mongoosejs.com/)
-   [Dotenv](https://www.npmjs.com/package/dotenv)
