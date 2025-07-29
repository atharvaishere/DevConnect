const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    console.error('MONGO_URI:', process.env.MONGO_URI ? 'Set' : 'Not set');
    process.exit(1);
  }
};

module.exports = connectDB;