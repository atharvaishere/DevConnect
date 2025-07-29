import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-5xl font-extrabold text-primary dark:text-secondary mb-4">
          Welcome to DevConnect
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Connect with developers, showcase your projects, and collaborate on innovative ideas.
        </p>
        <div className="space-x-4">
          <Link
            to="/projects"
            className="inline-block bg-accent text-white px-6 py-3 rounded-full hover:bg-green-600 transition"
          >
            Explore Projects
          </Link>
          <Link
            to="/signup"
            className="inline-block bg-secondary text-white px-6 py-3 rounded-full hover:bg-blue-600 transition"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;