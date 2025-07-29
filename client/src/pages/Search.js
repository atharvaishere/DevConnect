import React, { useState } from 'react';
     import axios from 'axios';
     import { Link } from 'react-router-dom';

     function Search() {
       const [searchTerm, setSearchTerm] = useState('');
       const [results, setResults] = useState({ users: [], projects: [] });
       const [error, setError] = useState('');
       const [loading, setLoading] = useState(false);

       const handleSearch = async (e) => {
         e.preventDefault();
         setError('');
         setLoading(true);
         try {
           const res = await axios.get(`http://localhost:4000/api/search?q=${searchTerm}`);
           setResults(res.data);
         } catch (err) {
           setError(err.response?.data?.message || 'Search failed');
         } finally {
           setLoading(false);
         }
       };

       return (
         <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
           <div className="container mx-auto">
             <h2 className="text-3xl font-bold text-primary dark:text-secondary mb-6 text-center">
               Search DevConnect
             </h2>
             <form onSubmit={handleSearch} className="mb-8">
               <div className="flex max-w-lg mx-auto">
                 <input
                   type="text"
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                   className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-l-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-secondary focus:border-secondary"
                   placeholder="Search users or projects..."
                   required
                 />
                 <button
                   type="submit"
                   className="bg-accent text-white p-3 rounded-r-lg hover:bg-green-600 transition"
                   disabled={loading}
                 >
                   {loading ? 'Searching...' : 'Search'}
                 </button>
               </div>
             </form>
             {error && (
               <p className="text-red-500 text-center mb-4">{error}</p>
             )}
             <div className="space-y-8">
               <div>
                 <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
                   Users
                 </h3>
                 {results.users.length === 0 ? (
                   <p className="text-gray-600 dark:text-gray-400">No users found</p>
                 ) : (
                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                     {results.users.map((user) => (
                       <div key={user._id} className="glass p-4 rounded-lg">
                         <p className="font-semibold">{user.username}</p>
                         <p className="text-gray-600 dark:text-gray-400">{user.bio || 'No bio'}</p>
                       </div>
                     ))}
                   </div>
                 )}
               </div>
               <div>
                 <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
                   Projects
                 </h3>
                 {results.projects.length === 0 ? (
                   <p className="text-gray-600 dark:text-gray-400">No projects found</p>
                 ) : (
                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                     {results.projects.map((project) => (
                       <div key={project._id} className="glass p-4 rounded-lg">
                         <h4 className="font-semibold">{project.title}</h4>
                         <p className="text-gray-600 dark:text-gray-400 line-clamp-2">
                           {project.description || 'No description'}
                         </p>
                         <Link
                           to={`/project/${project._id}`}
                           className="text-accent hover:underline"
                         >
                           View Details
                         </Link>
                       </div>
                     ))}
                   </div>
                 )}
               </div>
             </div>
           </div>
         </div>
       );
     }

     export default Search;