# DAY-7 Backend Application

A comprehensive Node.js/Express.js backend application inspired by **Sarhne.com** - an anonymous messaging platform that enables secure, private communication between users. This backend provides a robust foundation for modern anonymous messaging systems with complete user authentication, profile management, and secure messaging capabilities.

## 🌟 What is Sarhne?

Sarhne (صرحني) is an anonymous messaging platform where users can:

- Create anonymous accounts to send and receive messages
- Share their profile links to receive anonymous messages from anyone
- Communicate privately without revealing their identity
- Manage their messaging privacy and security
- Attach files and images to messages

This backend application implements the core functionality similar to Sarhne.com, providing a secure and scalable foundation for anonymous communication services.

## 🚀 Features

- **🔐 Anonymous Messaging**: Send and receive messages anonymously like Sarhne.com
- **👤 User Authentication**: Secure registration and login with JWT tokens
- **📝 Profile Management**: Create and manage user profiles with unique usernames
- **🔗 Profile Sharing**: Generate shareable profile URLs (e.g., `http://localhost:3000/user/username`)
- **📎 File Attachments**: Support for image/file uploads in messages
- **✉️ Email Verification**: Secure email verification for account activation
- **🔑 Password Recovery**: Forgot password functionality with OTP verification
- **🛡️ Security**: Environment-based configuration for sensitive data
- **👥 Role-based Access**: Admin and user role management
- **📱 Real-time Ready**: Structured for easy WebSocket integration
- **☁️ Cloud Deployable**: Vercel configuration included

## 🛠️ Tech Stack

- **Node.js** - JavaScript runtime environment
- **Express.js** - Fast, unopinionated web framework
- **MongoDB** - NoSQL database for flexible data storage
- **Mongoose** - MongoDB object modeling for Node.js
- **JWT** - JSON Web Tokens for authentication
- **Bcrypt** - Password hashing for security
- **Joi** - Schema description language and data validator
- **Multer** - Middleware for handling multipart/form-data
- **Nodemailer** - Email sending module
- **Dotenv** - Environment variable management

## 📁 Project Structure

```text
src/
├── app.controller.js      # Main application setup and server configuration
├── main.js               # Application entry point
├── common/               # Shared utilities and middleware
│   ├── middleware/       # Authentication, file upload, etc.
│   └── utils/           # Validation, helpers, etc.
├── config/               # Environment configuration and services
│   ├── .env             # Environment variables (gitignored)
│   └── env.service.js   # Environment service loader
├── database/             # Database configuration and models
│   ├── connection.js     # MongoDB connection setup
│   └── model/           # Mongoose schemas and models
│       ├── user.model.js
│       └── message.model.js
├── module/              # Feature modules
│   ├── auth/            # Authentication routes, controllers, services
│   │   ├── auth.controller.js
│   │   ├── auth.service.js
│   │   └── auth.validate.js
│   ├── users/           # User management routes and controllers
│   │   ├── user.controller.js
│   │   ├── user.service.js
│   │   └── user.validate.js
│   └── message/         # Messaging routes and controllers
│       ├── message.controller.js
│       ├── message.service.js
│       └── message.validate.js
└── uploads/             # File upload storage directory
```

## 📦 Installation

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- Git

### Setup

1. **Clone the repository**

```bash
git clone <repository-url>
cd DAY-7
```

2. **Install dependencies**

```bash
npm install
```

3. **Environment Configuration**

Create a `.env` file in the `config/` directory (see Environment Variables section below).

4. **Start MongoDB**

Make sure your MongoDB server is running locally or update the `DATA_BASE_URL_Y` in your `.env` file with your MongoDB Atlas connection string.

## 🚀 Usage

### Development

Start the development server with file watching:

```bash
npm start
```

The server will run on port 3000 (or your configured PORT).

### Production Deployment

This project is configured for Vercel deployment. Simply push to your Git repository connected to Vercel, and it will automatically deploy.

### Testing the Application

Once the server is running, you can:

1. **Register a new account** at `POST /auth/signup`
2. **Login** at `POST /auth/login` to get JWT tokens
3. **Get your profile URL** at `GET /user/profile-url` to share with others
4. **Receive anonymous messages** from anyone who has your profile URL
5. **Send messages** to other users using their `POST /message/send`

## 🔐 How It Works (Similar to Sarhne.com)

1. **User Registration**: Users create accounts with email verification
2. **Profile Creation**: Each user gets a unique username and profile URL
3. **Anonymous Messaging**: Anyone with the profile URL can send anonymous messages
4. **Privacy**: Senders remain anonymous while receivers can manage their messages
5. **File Sharing**: Users can attach files to their messages

## 📡 API Endpoints

### Authentication

- `POST /auth/signup` - Register a new user with email verification
- `POST /auth/login` - User login with JWT tokens
- `POST /auth/generate-new-access-token` - Refresh access token
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

## ⚙️ Environment Variables

Create a `.env` file in the `config/` directory with the following variables:


**🔒 Security Note**: All sensitive data (database credentials, JWT secrets, email passwords) are stored in environment variables and not hardcoded in the application. Never commit your `.env` file to version control.

## 📚 Dependencies

| Package          | Version | Description                           |
| ---------------- | ------- | ------------------------------------- |
| **express**      | ^5.2.1  | Fast, unopinionated web framework     |
| **mongoose**     | ^9.3.0  | MongoDB object modeling               |
| **jsonwebtoken** | ^9.0.3  | JWT implementation for authentication |
| **bcrypt**       | ^6.0.0  | Password hashing for security         |
| **joi**          | ^18.0.2 | Schema validation                     |
| **multer**       | ^2.1.1  | File upload middleware                |
| **nodemailer**   | ^8.0.2  | Email sending module                  |
| **dotenv**       | ^17.3.1 | Environment variable management       |

## 🎯 Scripts

```bash
npm start          # Start the server with file watching
npm install        # Install all dependencies
```

## 🚀 Deployment

### Vercel (Recommended)

This project comes with pre-configured Vercel deployment:

1. Push your code to a Git repository
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Manual Deployment

For other hosting providers, make sure to:

1. Set all environment variables
2. Ensure MongoDB is accessible
3. Configure the correct port
4. Handle file uploads appropriately

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

ISC License - Feel free to use this project for personal or commercial purposes.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the API documentation above
2. Verify your environment variables
3. Ensure MongoDB is running and accessible
4. Check the console logs for detailed error messages

---

**Built with ❤️ for anonymous communication** - Inspired by Sarhne.com
