const express = require('express');
     const router = express.Router();
     const User = require('../models/User');
     const Project = require('../models/Project');

     router.get('/', async (req, res) => {
       const { q } = req.query;
       try {
         const users = await User.find({
           $or: [
             { username: { $regex: q, $options: 'i' } },
             { bio: { $regex: q, $options: 'i' } }
           ]
         }).select('username bio');
         const projects = await Project.find({
           $or: [
             { title: { $regex: q, $options: 'i' } },
             { description: { $regex: q, $options: 'i' } }
           ]
         });
         res.json({ users, projects });
       } catch (err) {
         console.error('Search error:', err);
         res.status(500).json({ message: 'Server error' });
       }
     });

     module.exports = router;