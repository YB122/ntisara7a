# DAY-7 Backend Application

A Node.js/Express.js backend application with authentication, user management, and messaging features.

## Features

- **Authentication**: User registration and login with JWT tokens
- **User Management**: CRUD operations for user profiles
- **Messaging System**: Send and receive messages between users
- **File Uploads**: Support for file uploads via Multer
- **Database Integration**: MongoDB with Mongoose ODM

## Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **Bcrypt** - Password hashing
- **Joi** - Data validation
- **Multer** - File upload handling

## Project Structure

```
src/
├── app.controller.js      # Main application setup and server configuration
├── main.js               # Application entry point
├── common/               # Shared utilities and middleware
├── database/             # Database configuration and models
│   ├── connection.js     # MongoDB connection setup
│   └── model/           # Mongoose schemas and models
├── module/              # Feature modules
│   ├── auth/            # Authentication routes and controllers
│   ├── users/           # User management routes and controllers
│   └── message/         # Messaging routes and controllers
└── uploads/             # File upload storage directory
```

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

Start the development server:
```bash
npm start
```

The server will run on port 3000.

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - User login

### Users
- `GET /user/profile` - Get user profile
- `PUT /user/profile` - Update user profile
- `DELETE /user/profile` - Delete user account

### Messages
- `POST /message/send` - Send a message
- `GET /message/inbox` - Get received messages
- `GET /message/sent` - Get sent messages

## Environment Variables

Create a `.env` file in the root directory with the following variables:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=3000
```

## Dependencies

- **express**: Web application framework
- **mongoose**: MongoDB object modeling
- **jsonwebtoken**: JWT implementation
- **bcrypt**: Password hashing
- **joi**: Schema validation
- **multer**: File upload middleware

## Scripts

- `npm start` - Start the server with file watching

## License

ISC
