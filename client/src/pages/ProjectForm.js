import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ProjectForm() {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [links, setLinks] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    if (!user) {
      setError('You must be logged in to create a project');
      setLoading(false);
      navigate('/login');
      return;
    }
    try {
      console.log('Creating project with:', { userId: user.userId, title, description, links });
      const res = await axios.post(
        'http://localhost:4000/api/projects/create',
        { userId: user.userId, title, description, links: links.split(',').map(link => link.trim()) },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      console.log('Project creation response:', res.data);
      navigate('/projects');
    } catch (err) {
      console.error('Project creation error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Failed to create project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="glass max-w-lg w-full p-8 rounded-xl">
        <h2 className="text-3xl font-bold text-primary dark:text-secondary mb-6 text-center">
          Create a New Project
        </h2>
        {error && (
          <p className="text-red-500 bg-red-100 dark:bg-red-900 p-3 rounded mb-4 text-center">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Project Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-secondary focus:border-secondary"
              required
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-secondary focus:border-secondary"
              rows="4"
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Links (comma-separated)
            </label>
            <input
              type="text"
              value={links}
              onChange={(e) => setLinks(e.target.value)}
              className="mt-1 w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-secondary focus:border-secondary"
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-accent text-white p-3 rounded-lg hover:bg-green-600 transition disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Project'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProjectForm;