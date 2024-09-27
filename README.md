
# Project Name: MERN Project

## Description
A Full-Stack Web Application built using the **MERN** stack: MongoDB, Express.js, React.js, and Node.js. This project is designed to demonstrate CRUD operations, authentication, and state management across the stack.

### Features:
- User Authentication (Sign up, Sign in, Logout)
- RESTful API endpoints
- Role-based access (Admin/User)
- Dynamic content management with MongoDB
- Secure user sessions using JWT tokens and HTTP-only cookies
- Responsive design using TailwindCSS

## Technologies
1. **MongoDB**: NoSQL database for storing user and application data.
2. **Express.js**: Web framework for Node.js, handling API requests and responses.
3. **React.js**: Frontend framework used to build a dynamic and responsive UI.
4. **Node.js**: Backend runtime that handles requests and API integration.

## Setup & Installation

1. Clone the repository:
```bash
git clone https://github.com/vietnguyen51/MERN-Project.git
```

2. Navigate to backend and frontend folders and install the dependencies:
```bash
cd backend
npm install
cd ../frontend
npm install
```

3. Setup environment variables:
   - In the `backend/` folder, create a `.env` file and add your configuration:
     ```bash
     MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/yourdb
     TOKEN_SECRET_KEY=your_secret_key
     FRONTEND_URL=http://localhost:3000
     ```

4. Run the backend and frontend:
```bash
cd backend
npm run dev
```
For frontend:
```bash
cd frontend
npm start
```

5. Navigate to `http://localhost:3000` to view the application.

## API Endpoints

- **POST** `/api/signup`: Register a new user.
- **POST** `/api/signin`: Log in an existing user.
- **GET** `/api/user-details`: Get the authenticated user's information.
- **GET** `/api/user-logout`: Log out the user.

## License

This project is licensed under the MIT License.
