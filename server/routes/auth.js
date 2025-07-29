const express = require('express');
   const router = express.Router();
   const bcrypt = require('bcrypt');
   const jwt = require('jsonwebtoken');
   const User = require('../models/User');

   router.post('/signup', async (req, res) => {
     console.log('Signup route hit:', req.body);
     try {
       const { username, email, password } = req.body;
       const existingUser = await User.findOne({ email });
       if (existingUser) {
         return res.status(400).json({ message: 'User already exists' });
       }
       const hashedPassword = await bcrypt.hash(password, 10);
       const user = new User({ username, email, password: hashedPassword });
       await user.save();
       const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
       res.json({ token, userId: user._id });
     } catch (err) {
       console.error('Signup error:', err);
       res.status(500).json({ message: 'Server error' });
     }
   });

   router.post('/login', async (req, res) => {
     console.log('Login route hit:', req.body);
     try {
       const { email, password } = req.body;
       const user = await User.findOne({ email });
       if (!user) {
         return res.status(400).json({ message: 'Invalid credentials' });
       }
       const isMatch = await bcrypt.compare(password, user.password);
       if (!isMatch) {
         return res.status(400).json({ message: 'Invalid credentials' });
       }
       const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
       res.json({ token, userId: user._id });
     } catch (err) {
       console.error('Login error:', err);
       res.status(500).json({ message: 'Server error' });
     }
   });

   module.exports = router;