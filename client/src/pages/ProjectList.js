import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setError('');
      setLoading(true);
      try {
        console.log('Fetching all projects');
        const res = await axios.get('http://localhost:4000/api/projects/all');
        console.log('Projects response:', res.data);
        setProjects(res.data);
        setFilteredProjects(res.data);
      } catch (err) {
        console.error('Projects fetch error:', err.response?.data || err.message);
        setError(err.response?.data?.message || 'Failed to fetch projects');
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    setFilteredProjects(
      projects.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, projects]);

  if (loading) return <div className="text-center py-12">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-12">{error}</div>;

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-primary dark:text-secondary mb-6 text-center">
          Explore Projects
        </h2>
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md mx-auto p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-secondary focus:border-secondary"
          />
        </div>
        {filteredProjects.length === 0 && !error && (
          <p className="text-center text-gray-600 dark:text-gray-400">
            No projects found
          </p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div key={project._id} className="glass p-6 rounded-xl hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-primary dark:text-secondary">
                {project.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2 line-clamp-3">
                {project.description || 'No description provided'}
              </p>
              <Link
                to={`/project/${project._id}`}
                className="mt-4 inline-block text-accent hover:underline"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectList;