# DAY-7 Backend Application

A Node.js/Express.js backend application inspired by **Sarhne.com** - an anonymous messaging platform that allows users to send and receive anonymous messages securely. This backend provides the core functionality for a modern anonymous communication system with user authentication, profile management, and secure messaging features.

## What is Sarhne?

Sarhne (صرحني) is an anonymous messaging platform where users can:

- Create anonymous accounts to send and receive messages
- Share their profile links to receive anonymous messages
- Communicate privately without revealing their identity
- Manage their messaging privacy and security

This backend application implements the core functionality similar to Sarhne.com, providing a secure foundation for anonymous communication services.

## Features

- **Anonymous Messaging**: Send and receive messages anonymously like Sarhne.com
- **User Authentication**: Secure registration and login with JWT tokens
- **Profile Management**: Create and manage user profiles with unique usernames
- **Profile Sharing**: Generate shareable profile URLs (e.g., `http://localhost:3000/user/username`)
- **File Attachments**: Support for image/file uploads in messages
- **Email Verification**: Secure email verification for account activation
- **Password Recovery**: Forgot password functionality with OTP verification
- **Security**: Environment-based configuration for sensitive data
- **Role-based Access**: Admin and user role management

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

The server will run on port 3000. Once running, you can:

1. **Register a new account** at `POST /auth/register`
2. **Login** at `POST /auth/login` to get JWT tokens
3. **Get your profile URL** at `GET /user/profile-url` to share with others
4. **Receive anonymous messages** from anyone who has your profile URL
5. **Send messages** to other users using their `POST /message/send`

## How It Works (Similar to Sarhne.com)

1. **User Registration**: Users create accounts with email verification
2. **Profile Creation**: Each user gets a unique username and profile URL
3. **Anonymous Messaging**: Anyone with the profile URL can send anonymous messages
4. **Privacy**: Senders remain anonymous while receivers can manage their messages
5. **File Sharing**: Users can attach files to their messages

## API Endpoints

### Authentication

- `POST /auth/register` - Register a new user with email verification
- `POST /auth/login` - User login with JWT tokens
- `POST /auth/forget-password` - Request password reset with OTP
- `POST /auth/reset-password` - Reset password with OTP
- `GET /auth/verify-email` - Verify email account
- `POST /auth/resend-otp` - Resend verification OTP

### Users

- `GET /user/profile` - Get user profile
- `PUT /user/profile` - Update user profile
- `DELETE /user/profile` - Delete user account
- `GET /user/profile-url` - Get shareable profile URL
- `GET /user/get-user-data-from-user-name` - Get user data by username

### Messages

- `POST /message/send` - Send anonymous message to user
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
