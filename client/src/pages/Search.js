import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    try {
      console.log('Sending search request:', { query });
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/search`, {
        params: { q: query },
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      console.log('Search response:', res.data);
      setResults(res.data);
    } catch (err) {
      console.error('Search error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Search failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="glass max-w-md w-full p-8 rounded-xl">
        <h2 className="text-3xl font-bold text-primary dark:text-secondary mb-6 text-center">
          Search Projects
        </h2>
        {error && (
          <p className="text-red-500 bg-red-100 dark:bg-red-900 p-3 rounded mb-4 text-center">
            {error}
          </p>
        )}
        <form onSubmit={handleSearch} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Search Query
            </label>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="mt-1 w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              placeholder="Enter search term"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-accent text-white p-3 rounded-lg hover:bg-green-600 transition"
          >
            Search
          </button>
        </form>
        <div className="mt-6">
          {results.map((project) => (
            <div key={project._id} className="p-4 border rounded-lg mb-2">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Search;