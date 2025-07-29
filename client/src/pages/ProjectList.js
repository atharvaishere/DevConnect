import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function ProjectList() {
  const { user } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        console.log('Fetching all projects');
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/projects/all`, {
          headers: { Authorization: `Bearer ${user?.token}` },
        });
        console.log('Projects response:', res.data);
        setProjects(res.data);
      } catch (err) {
        console.error('Fetch projects error:', err.response?.data || err.message);
        setError(err.response?.data?.message || 'Failed to load projects');
      }
    };
    fetchProjects();
  }, [user]);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-primary dark:text-secondary mb-6 text-center">
          All Projects
        </h2>
        {error && (
          <p className="text-red-500 bg-red-100 dark:bg-red-900 p-3 rounded mb-4 text-center">
            {error}
          </p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project._id} className="p-4 border rounded-lg">
              <h3 className="text-xl font-semibold">{project.title}</h3>
              <p>{project.description}</p>
              <div className="mt-2">
                {project.links.map((link, index) => (
                  <a key={index} href={link} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                    Link {index + 1}
                  </a>
                ))}
              </div>
              {user?.userId === project.userId && (
                <Link to={`/edit-project/${project._id}`} className="text-blue-500 mt-2 block">
                  Edit
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectList;