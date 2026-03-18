# DAY-7 Backend Application

A Node.js/Express.js backend application with authentication, user management, and messaging features.

## Features

- **Authentication**: User registration and login with JWT tokens
- **User Management**: CRUD operations for user profiles
- **Messaging System**: Send and receive messages between users
- **File Uploads**: Support for file uploads via Multer
- **Database Integration**: MongoDB with Mongoose ODM
- **Security**: Environment-based configuration for sensitive data

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

```text
src/
├── app.controller.js      # Main application setup and server configuration
├── main.js               # Application entry point
├── common/               # Shared utilities and middleware
├── config/               # Environment configuration and services
│   ├── .env             # Environment variables (gitignored)
│   └── env.service.js   # Environment service loader
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

Create a `.env` file in the `config/` directory with the following variables:

```env
# Server Configuration
PORT=3000
BASE_URL=http://localhost:3000

# Database Configuration
DATA_BASE_URL_Y=mongodb+srv://username:password@cluster.mongodb.net/database_name

# Email Configuration
EMAIL=your_email@gmail.com
PASSWORD=your_email_password

# Security Configuration
HASH=10
SIGNATURE_ADMIN=your_admin_jwt_signature
SIGNATURE_USER=your_user_jwt_signature
VERIFY_SIGNATURE_Y=your_verification_jwt_signature

# Token Configuration
ACCESS_TOKEN=30m
REFRESH_TOKEN=1Y

# Additional Security
BCRYPT_ROUNDS=10
JWT_EXPIRE_TIME=30m
```

**Security Note**: All sensitive data (database credentials, JWT secrets, email passwords) are stored in environment variables and not hardcoded in the application.

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
