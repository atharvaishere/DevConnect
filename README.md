# DevConnect

DevConnect is a full-stack web application that allows developers to create, share, and explore projects. Users can sign up, log in, manage their profiles, create/edit/delete projects, comment on projects, and search for projects. The app is built with a React frontend, Node.js/Express backend, and MongoDB for data storage, deployed on Vercel (frontend) and Render (backend).

## Hosted Links
- **Frontend**: [https://devconnect-sandy.vercel.app](https://devconnect-sandy.vercel.app)
- **Backend**: [https://devconnect-backend-epkr.onrender.com](https://devconnect-backend-epkr.onrender.com)
- **GitHub Repository**: [https://github.com/atharvaishere/devconnect](https://github.com/your-username/devconnect) 

## Features
- **User Authentication**: Sign up, log in, and log out with JWT-based authentication.
- **Profile Management**: Update user bio, social links (GitHub, LinkedIn, Twitter), and upload avatars.
- **Project Management**: Create, edit, and delete projects with titles, descriptions, and links.
- **Project Exploration**: View all projects, filter by search, and view individual project details.
- **Comments**: Add, edit, and delete comments on projects.
- **Search**: Search projects by title or description.
- **Responsive Design**: Tailwind CSS for a modern, responsive UI with light/dark mode support.

## Tech Stack
- **Frontend**: React, React Router, Axios, Tailwind CSS, react-share
- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT
- **Deployment**:
  - Frontend: Vercel
  - Backend: Render
  - Database: MongoDB Atlas
- **Environment Variables**:
  - Frontend: `REACT_APP_API_URL` (backend URL)
  - Backend: `MONGO_URI`, `JWT_SECRET`, `FRONTEND_URL` (for CORS)

## Installation and Setup
To run the project locally, follow these steps:

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account
- Git
- Vercel CLI (for frontend deployment)
- Render account (for backend deployment)

### Clone the Repository
```bash
git clone https://github.com/your-username/devconnect.git
cd devconnect
```

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `server` directory:
   ```bash
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   FRONTEND_URL=http://localhost:3000
   ```
4. Start the backend server:
   ```bash
   npm start
   ```
   The backend will run on `http://localhost:5000`.

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `client` directory:
   ```bash
   REACT_APP_API_URL=http://localhost:5000
   ```
4. Start the frontend development server:
   ```bash
   npm start
   ```
   The frontend will run on `http://localhost:3000`.

### Database Setup
- Set up a MongoDB Atlas cluster and obtain the `MONGO_URI`.
- Ensure the `Project` and `User` models (`server/models/`) are correctly defined.

## Deployment
### Backend (Render)
1. Create a new Web Service on Render.
2. Connect to your GitHub repository (`server` directory).
3. Set environment variables in Render dashboard:
   - `MONGO_URI`: MongoDB connection string
   - `JWT_SECRET`: Secret key for JWT
   - `FRONTEND_URL`: `https://devconnect-sandy.vercel.app`
4. Deploy using the latest commit.

### Frontend (Vercel)
1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```
2. Navigate to the `client` directory:
   ```bash
   cd client
   ```
3. Deploy to Vercel:
   ```bash
   vercel --prod
   ```
4. Set environment variable in Vercel dashboard:
   - `REACT_APP_API_URL`: `https://devconnect-backend-epkr.onrender.com`

## API Endpoints
### Authentication
- `POST /api/auth/signup`: Register a new user
- `POST /api/auth/login`: Log in and receive JWT token

### User
- `GET /api/users/profile`: Get user profile (requires token)
- `PUT /api/users/profile`: Update user profile (requires token)
- `POST /api/users/avatar`: Upload user avatar (requires token)

### Projects
- `POST /api/projects/create`: Create a project (requires token)
- `GET /api/projects/all`: Get all projects (public)
- `GET /api/projects/:id`: Get a project by ID (requires token)
- `PUT /api/projects/:id`: Update a project (requires token)
- `DELETE /api/projects/:id`: Delete a project (requires token)

### Comments
- `POST /api/comments/create`: Add a comment to a project (requires token)
- `GET /api/comments/project/:projectId`: Get comments for a project (public)
- `PUT /api/comments/:id`: Update a comment (requires token)
- `DELETE /api/comments/:id`: Delete a comment (requires token)

### Search
- `GET /api/search?q=<query>`: Search projects by title or description (requires token)

## Testing
1. **Project Creation**:
   - Navigate to `/project/create`, log in, and create a project.
   - Verify in Network tab: `POST /api/projects/create`.
2. **Project Edit/Delete**:
   - Go to `/profile`, click "Edit" on a project (`/project/edit/:id`).
   - Update or delete; verify `PUT /api/projects/:id` and `DELETE /api/projects/:id`.
3. **Project View**:
   - Visit `/project/:id`, ensure project and comments load.
4. **Search**:
   - Go to `/search`, enter a query, verify `GET /api/search?q=<query>`.
5. **DevTools**:
   - Check Console for logs (e.g., `Project creation response:`).
   - Verify `localStorage` for `token` and `userId`.

## Troubleshooting
- **404 on Project Creation**: Ensure `REACT_APP_API_URL` matches backend URL and `POST /api/projects/create` is used.
- **401 Unauthorized**: Verify `token` in `localStorage` and `Authorization: Bearer <token>` in requests.
- **CORS Issues**: Ensure `FRONTEND_URL` in backend matches frontend URL.
- **MongoDB Errors**: Check `MONGO_URI` and database connection in Render logs.

## Credits
- Built with assistance from Grok, created by xAI.
- Dependencies: React, Express, MongoDB, Tailwind CSS, Axios, react-share.

## License
MIT License. See `LICENSE` file for details.

*(Replace `your-username` and repository URL with your actual GitHub details.)*











































































































































































































Last updated: 2026-02-16 **