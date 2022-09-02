const mongoose = require('mongoose');
require('dotenv').config();

// connection string URI;
const mongooseURI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(mongooseURI, () => console.log('\x1b[33m%s\x1b[0m', 'Connected to MongoDB'));
  }
  catch (err) {
    console.error(err);
  }
};

module.exports = connectDB;