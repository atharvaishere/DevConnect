import React, { useState, useEffect, useContext } from 'react';
  import axios from 'axios';
  import { useParams } from 'react-router-dom';
  import { AuthContext } from '../context/AuthContext';
  import { FacebookShareButton, TwitterShareButton, FacebookIcon, TwitterIcon } from 'react-share';

  function Project() {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [project, setProject] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [editCommentId, setEditCommentId] = useState(null);
    const [editCommentContent, setEditCommentContent] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchProject = async () => {
        setError('');
        setLoading(true);
        try {
          console.log('Fetching project with ID:', id);
          const projectRes = await axios.get(`${process.env.REACT_APP_API_URL}/api/projects/${id}`);
          console.log('Project response:', projectRes.data);
          setProject(projectRes.data);

          const commentsRes = await axios.get(`${process.env.REACT_APP_API_URL}/api/comments/project/${id}`);
          console.log('Comments response:', commentsRes.data);
          setComments(commentsRes.data);
        } catch (err) {
          console.error('Fetch error:', err.response?.data || err.message);
          setError(err.response?.data?.message || 'Failed to fetch project or comments');
        } finally {
          setLoading(false);
        }
      };
      fetchProject();
    }, [id]);

    const handleCommentSubmit = async (e) => {
      e.preventDefault();
      if (!user) {
        setError('You must be logged in to comment');
        return;
      }
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/comments/create`,
          { projectId: id, content: newComment },
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
        console.log('Comment creation response:', res.data);
        setComments([...comments, res.data]);
        setNewComment('');
      } catch (err) {
        console.error('Comment creation error:', err.response?.data || err.message);
        setError(err.response?.data?.message || 'Failed to add comment');
      }
    };

    const handleCommentEdit = async (commentId) => {
      try {
        const res = await axios.put(
          `${process.env.REACT_APP_API_URL}/api/comments/${commentId}`,
          { content: editCommentContent },
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
        setComments(comments.map(c => (c._id === commentId ? res.data : c)));
        setEditCommentId(null);
        setEditCommentContent('');
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to update comment');
      }
    };

    const handleCommentDelete = async (commentId) => {
      if (window.confirm('Are you sure you want to delete this comment?')) {
        try {
          await axios.delete(`${process.env.REACT_APP_API_URL}/api/comments/${commentId}`, {
            headers: { Authorization: `Bearer ${user.token}` }
          });
          setComments(comments.filter(c => c._id !== commentId));
        } catch (err) {
          setError(err.response?.data?.message || 'Failed to delete comment');
        }
      }
    };

    if (loading) return <div className="text-center py-12">Loading...</div>;
    if (error) return <div className="text-red-500 text-center py-12">{error}</div>;
    if (!project) return <div className="text-center py-12">Project not found</div>;

    const shareUrl = window.location.href;
    const shareTitle = project.title;

    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="glass p-8 rounded-xl">
            <h2 className="text-3xl font-bold text-primary dark:text-secondary mb-4">
              {project.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">{project.description}</p>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                Links
              </h3>
              <ul className="list-disc pl-5">
                {project.links.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link}
                      className="text-accent hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Share</h3>
              <div className="flex space-x-4">
                <FacebookShareButton url={shareUrl} quote={shareTitle}>
                  <FacebookIcon size={32} round />
                </FacebookShareButton>
                <TwitterShareButton url={shareUrl} title={shareTitle}>
                  <TwitterIcon size={32} round />
                </TwitterShareButton>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
                Comments
              </h3>
              {comments.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-400">No comments yet</p>
              ) : (
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment._id} className="glass p-4 rounded-lg">
                      {editCommentId === comment._id ? (
                        <div>
                          <textarea
                            value={editCommentContent}
                            onChange={(e) => setEditCommentContent(e.target.value)}
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                            rows="3"
                          />
                          <div className="flex space-x-2 mt-2">
                            <button
                              onClick={() => handleCommentEdit(comment._id)}
                              className="bg-accent text-white p-2 rounded-lg hover:bg-green-600"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditCommentId(null)}
                              className="bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <p className="text-gray-800 dark:text-gray-200">{comment.content}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            By {comment.userId.username} on {new Date(comment.createdAt).toLocaleDateString()}
                          </p>
                          {user && user.userId === comment.userId._id && (
                            <div className="flex space-x-2 mt-2">
                              <button
                                onClick={() => {
                                  setEditCommentId(comment._id);
                                  setEditCommentContent(comment.content);
                                }}
                                className="text-secondary hover:underline"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleCommentDelete(comment._id)}
                                className="text-red-500 hover:underline"
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}
              {user && (
                <form onSubmit={handleCommentSubmit} className="mt-6">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-secondary focus:border-secondary"
                    rows="3"
                    placeholder="Add a comment..."
                    required
                  />
                  <button
                    type="submit"
                    className="mt-2 bg-accent text-white p-3 rounded-lg hover:bg-green-600 transition"
                  >
                    Post Comment
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  export default Project;