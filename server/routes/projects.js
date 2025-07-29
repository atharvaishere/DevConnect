const express = require('express');
   const router = express.Router();
   const authMiddleware = require('../middleware/auth');
   const Project = require('../models/Project');

   router.post('/create', authMiddleware, async (req, res) => {
     console.log('Project create route hit:', req.body);
     const { userId, title, description, links } = req.body;
     try {
       if (!req.user || req.user.userId !== userId) {
         return res.status(401).json({ message: 'Unauthorized: Invalid user' });
       }
       const project = new Project({ userId, title, description, links });
       await project.save();
       console.log('Project saved:', project);
       res.json(project);
     } catch (err) {
       console.error('Project creation error:', err);
       res.status(500).json({ message: 'Server error' });
     }
   });

   router.get('/all', async (req, res) => {
     console.log('Fetch all projects route hit');
     try {
       const projects = await Project.find();
       res.json(projects);
     } catch (err) {
       console.error('Project fetch error:', err);
       res.status(500).json({ message: 'Server error' });
     }
   });

   router.get('/:id', async (req, res) => {
     console.log('Fetch project by ID:', req.params.id);
     try {
       const project = await Project.findById(req.params.id);
       if (!project) {
         return res.status(404).json({ message: 'Project not found' });
       }
       res.json(project);
     } catch (err) {
       console.error('Project fetch error:', err);
       res.status(500).json({ message: 'Server error' });
     }
   });

   module.exports = router;