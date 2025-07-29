import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function EditProject() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [links, setLinks] = useState(['']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setError('You must be logged in to edit projects');
      setLoading(false);
      navigate('/login');
      return;
    }
    const fetchProject = async () => {
      try {
        console.log('Fetching project:', id, 'Token:', user.token);
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/projects/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        console.log('Project response:', res.data);
        setTitle(res.data.title);
        setDescription(res.data.description);
        setLinks(res.data.links || ['']);
        setLoading(false);
      } catch (err) {
        console.error('Fetch project error:', err.response?.data || err.message);
        setError(err.response?.data?.message || 'Failed to load project');
        setLoading(false);
      }
    };
    fetchProject();
  }, [id, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!user) {
      setError('You must be logged in to edit projects');
      return;
    }
    try {
      console.log('Updating project:', { id, title, description, links });
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/projects/${id}`,
        { title, description, links: links.filter(link => link.trim() !== '') },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      console.log('Update response:', res.data);
      navigate('/profile');
    } catch (err) {
      console.error('Update project error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Update failed');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    setError('');
    if (!user) {
      setError('You must be logged in to delete projects');
      return;
    }
    try {
      console.log('Deleting project:', id);
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      console.log('Project deleted');
      navigate('/profile');
    } catch (err) {
      console.error('Delete project error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Delete failed');
    }
  };

  const addLink = () => setLinks([...links, '']);
  const updateLink = (index, value) => {
    const newLinks = [...links];
    newLinks[index] = value;
    setLinks(newLinks);
  };
  const removeLink = (index) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-12">{error}</div>;

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="glass max-w-lg w-full p-8 rounded-xl">
        <h2 className="text-3xl font-bold text-primary dark:text-secondary mb-6 text-center">
          Edit Project
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
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Links
            </label>
            {links.map((link, index) => (
              <div key={index} className="flex space-x-2 mt-1">
                <input
                  type="url"
                  value={link}
                  onChange={(e) => updateLink(index, e.target.value)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-secondary focus:border-secondary"
                />
                {links.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeLink(index)}
                    className="text-red-500 p-3"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addLink}
              className="mt-2 text-blue-500 hover:underline"
            >
              Add Link
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-accent text-white p-3 rounded-lg hover:bg-green-600 transition"
          >
            Update Project
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="w-full bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition mt-2"
          >
            Delete Project
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProject;