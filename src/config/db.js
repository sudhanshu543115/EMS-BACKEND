const mongoose = require('mongoose');
const MONGO_URI = 'mongodb+srv://sudhanshu:228145@ems.1ayjgvc.mongodb.net/?appName=EMS';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;