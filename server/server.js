const express = require('express');
  const mongoose = require('mongoose');
  const cors = require('cors');
  const dotenv = require('dotenv');
  const path = require('path');

  dotenv.config();

  const app = express();

  app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000' || 'https://devconnect-sandy.vercel.app'}));
  app.use(express.json());
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

  app.get('/', (req, res) => {
     res.json({ message: 'DevConnect Backend API is running' });
   });
  app.use('/api/auth', require('./routes/auth'));
  app.use('/api/users', require('./routes/users'));
  app.use('/api/projects', require('./routes/projects'));
  app.use('/api/comments', require('./routes/comments'));
  app.use('/api/search', require('./routes/search'));

  const PORT = process.env.PORT || 4000;

  mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));