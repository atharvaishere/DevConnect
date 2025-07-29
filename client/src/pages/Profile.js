import React, { useState, useEffect, useContext } from 'react';
  import axios from 'axios';
  import { AuthContext } from '../context/AuthContext';
  import { Link, useNavigate } from 'react-router-dom';

  function Profile() {
    const { user } = useContext(AuthContext);
    const [profile, setProfile] = useState(null);
    const [projects, setProjects] = useState([]);
    const [bio, setBio] = useState('');
    const [github, setGithub] = useState('');
    const [linkedin, setLinkedin] = useState('');
    const [twitter, setTwitter] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
      const fetchProfile = async () => {
        setError('');
        setLoading(true);
        try {
          const profileRes = await axios.get('http://localhost:4000/api/users/profile', {
            headers: { Authorization: `Bearer ${user.token}` }
          });
          const projectsRes = await axios.get('http://localhost:4000/api/projects/all');
          setProfile(profileRes.data);
          setBio(profileRes.data.bio || '');
          setGithub(profileRes.data.socialLinks?.github || '');
          setLinkedin(profileRes.data.socialLinks?.linkedin || '');
          setTwitter(profileRes.data.socialLinks?.twitter || '');
          setProjects(projectsRes.data.filter(project => project.userId === user.userId));
        } catch (err) {
          setError(err.response?.data?.message || 'Failed to fetch profile');
        } finally {
          setLoading(false);
        }
      };
      if (user) fetchProfile();
    }, [user]);

    const handleProfileUpdate = async (e) => {
      e.preventDefault();
      setError('');
      try {
        const res = await axios.put(
          'http://localhost:4000/api/users/profile',
          { bio, github, linkedin, twitter },
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
        setProfile(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to update profile');
      }
    };

    const handleAvatarUpload = async (e) => {
      e.preventDefault();
      setError('');
      if (!avatar) {
        setError('Please select an image');
        return;
      }
      const formData = new FormData();
      formData.append('avatar', avatar);
      try {
        const res = await axios.post('http://localhost:4000/api/users/avatar', formData, {
          headers: {
            Authorization: `Bearer ${user.token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
        setProfile(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to upload avatar');
      }
    };

    const handleDelete = async (projectId) => {
      if (window.confirm('Are you sure you want to delete this project?')) {
        try {
          await axios.delete(`http://localhost:4000/api/projects/${projectId}`, {
            headers: { Authorization: `Bearer ${user.token}` }
          });
          setProjects(projects.filter(project => project._id !== projectId));
        } catch (err) {
          setError(err.response?.data?.message || 'Failed to delete project');
        }
      }
    };

    if (!user) return <div className="text-center py-12">Please log in</div>;
    if (loading) return <div className="text-center py-12">Loading...</div>;
    if (error) return <div className="text-red-500 text-center py-12">{error}</div>;

    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="glass p-8 rounded-xl">
            <h2 className="text-3xl font-bold text-primary dark:text-secondary mb-4">
              {profile?.username}'s Profile
            </h2>
            {profile?.avatar && (
              <img
                src={`http://localhost:4000${profile.avatar}`}
                alt="Avatar"
                className="w-24 h-24 rounded-full mb-4"
              />
            )}
            <form onSubmit={handleAvatarUpload} className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Upload Avatar
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setAvatar(e.target.files[0])}
                className="mt-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
              <button
                type="submit"
                className="mt-2 bg-accent text-white p-3 rounded-lg hover:bg-green-600 transition"
              >
                Upload
              </button>
            </form>
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Bio
                </label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="mt-1 w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  rows="4"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  GitHub
                </label>
                <input
                  type="text"
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                  className="mt-1 w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  LinkedIn
                </label>
                <input
                  type="text"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  className="mt-1 w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Twitter
                </label>
                <input
                  type="text"
                  value={twitter}
                  onChange={(e) => setTwitter(e.target.value)}
                  className="mt-1 w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-accent text-white p-3 rounded-lg hover:bg-green-600 transition"
              >
                Update Profile
              </button>
            </form>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mt-6 mb-4">
              My Projects
            </h3>
            {projects.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-400">No projects yet</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <div key={project._id} className="glass p-4 rounded-lg">
                    <h4 className="font-semibold">{project.title}</h4>
                    <p className="text-gray-600 dark:text-gray-400 line-clamp-2">
                      {project.description || 'No description'}
                    </p>
                    <div className="flex space-x-2 mt-2">
                      <Link
                        to={`/project/${project._id}`}
                        className="text-accent hover:underline"
                      >
                        View
                      </Link>
                      <Link
                        to={`/project/edit/${project._id}`}
                        className="text-secondary hover:underline"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(project._id)}
                        className="text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  export default Profile;