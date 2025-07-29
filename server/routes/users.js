const express = require('express');
    const router = express.Router();
    const authMiddleware = require('../middleware/auth');
    const User = require('../models/User');
    const multer = require('multer');
    const path = require('path');

    const storage = multer.diskStorage({
      destination: (req, file, cb) => cb(null, 'uploads/'),
      filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
    });
    const upload = multer({ storage });

    router.get('/profile', authMiddleware, async (req, res) => {
      console.log('Profile route hit for user:', req.user.userId);
      try {
        const user = await User.findById(req.user.userId).select('-password');
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
      } catch (err) {
        console.error('Profile fetch error:', err);
        res.status(500).json({ message: 'Server error' });
      }
    });

    router.put('/profile', authMiddleware, async (req, res) => {
      console.log('Profile update route hit:', req.body);
      try {
        const { bio, github, linkedin, twitter } = req.body;
        const user = await User.findById(req.user.userId);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        user.bio = bio || user.bio;
        user.socialLinks = {
          github: github || user.socialLinks?.github,
          linkedin: linkedin || user.socialLinks?.linkedin,
          twitter: twitter || user.socialLinks?.twitter
        };
        await user.save();
        res.json(user);
      } catch (err) {
        console.error('Profile update error:', err);
        res.status(500).json({ message: 'Server error' });
      }
    });

    router.post('/avatar', authMiddleware, upload.single('avatar'), async (req, res) => {
      console.log('Avatar upload route hit for user:', req.user.userId);
      try {
        if (!req.file) {
          return res.status(400).json({ message: 'No file uploaded' });
        }
        const user = await User.findById(req.user.userId);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        user.avatar = `/uploads/${req.file.filename}`;
        await user.save();
        res.json(user);
      } catch (err) {
        console.error('Avatar upload error:', err);
        res.status(500).json({ message: 'Server error' });
      }
    });

    module.exports = router;