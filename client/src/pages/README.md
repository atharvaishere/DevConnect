# DevConnect

   A full-stack web application for developers to create profiles, showcase projects, and collaborate through comments and search.

   ## Features
   - **User Authentication**: Signup/login with JWT, persistent via `localStorage`.
   - **User Profiles**: Edit/display username, bio, avatar, social links (GitHub, LinkedIn, Twitter), and projects.
   - **Project Management**: Create, edit, delete, and view projects with title, description, links, and category.
   - **Comments**: Add, edit, delete, and view comments on projects.
   - **Search**: Search users/projects with filters (category, date: newest/oldest).
   - **Social Sharing**: Share projects via Facebook/Twitter.
   - **UI**: Modern, responsive design with TailwindCSS, glassmorphism, dark mode, and thoughtful UX.

   ## Tech Stack
   - **Frontend**: React, TailwindCSS, React Router, Axios, react-share
   - **Backend**: Node.js, Express, MongoDB (Atlas), JWT, Bcrypt, Multer
   - **Tools**: Git, Nodemon, Vercel (frontend), Render (backend)

   ## Setup

   ### Prerequisites
   - Node.js (v16+)
   - MongoDB Atlas account
   - Git

   ### Backend
   ```bash
   cd server
   npm install
   cp .env.example .env
   ```
   Edit `server/.env`:
   ```
   MONGO_URI=<your-mongodb-atlas-uri>
   JWT_SECRET=<your-secret>
   PORT=4000
   ```
   Run:
   ```bash
   npm run dev
   ```

   ### Frontend
   ```bash
   cd client
   npm install
   npm start
   ```

   ## Deployment
   - **Frontend**: Deployed on Vercel.
     - Run `vercel` in `client/`.
     - Set environment variable `REACT_APP_API_URL=<backend-url>` in Vercel dashboard.
   - **Backend**: Deployed on Render.
     - Push `server/` to GitHub.
     - Configure Render Web Service with `MONGO_URI`, `JWT_SECRET`, `PORT=4000`.

   ## Hosted Links
   - Frontend: [Add Vercel URL after deployment]
   - Backend: [Add Render URL after deployment]

   ## File Structure
   ```
   DevConnect/
   ├── client/
   │   ├── src/
   │   │   ├── components/
   │   │   │   ├── ErrorBoundary.js
   │   │   │   ├── Navbar.js
   │   │   ├── context/
   │   │   │   ├── AuthContext.js
   │   │   ├── pages/
   │   │   │   ├── Home.js
   │   │   │   ├── Login.js
   │   │   │   ├── Signup.js
   │   │   │   ├── Profile.js
   │   │   │   ├── Project.js
   │   │   │   ├── ProjectList.js
   │   │   │   ├── ProjectForm.js
   │   │   │   ├── ProjectEdit.js
   │   │   │   ├── Search.js
   │   ├── public/
   │   │   ├── index.html
   │   │   ├── manifest.json
   │   │   ├── 1.png
   │   ├── package.json
   │   ├── tailwind.config.js
   ├── server/
   │   ├── config/
   │   │   ├── db.js
   │   ├── middleware/
   │   │   ├── auth.js
   │   ├── models/
   │   │   ├── Comment.js
   │   │   ├── Project.js
   │   │   ├── User.js
   │   ├── routes/
   │   │   ├── auth.js
   │   │   ├── comments.js
   │   │   ├── projects.js
   │   │   ├── search.js
   │   │   ├── users.js
   │   ├── uploads/
   │   ├── server.js
   │   ├── .env
   │   ├── package.json
   ├── README.md
   ```

   ## Usage
   1. Sign up or log in at `/signup` or `/login`.
   2. Edit profile at `/profile` (bio, avatar, social links).
   3. Create/edit/delete projects at `/project/create` or `/project/edit/:id`.
   4. View projects at `/projects` or `/project/:id`.
   5. Add/edit/delete comments on project pages.
   6. Search users/projects at `/search` with category and date filters.
   7. Share projects via Facebook/Twitter on project pages.
   8. Toggle dark mode in the navbar.

   ## Notes
   - Ensure MongoDB Atlas is running and `.env` is configured.
   - Frontend runs on `http://localhost:3000`, backend on `http://localhost:4000` locally.
   - For production, update frontend API calls to use `REACT_APP_API_URL`.