import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Project from './pages/Project';
import ProjectList from './pages/ProjectList';
import ProjectForm from './pages/ProjectForm';
import Search from './pages/Search';
import EditProject from './pages/EditProject';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-background to-gray-100 dark:from-darkBg dark:to-gray-800">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/project/:id" element={<Project />} />
            <Route path="/projects" element={<ProjectList />} />
            <Route path="/project/create" element={<ProjectForm />} />
            <Route path="/project/edit/:id" element={<EditProject />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;