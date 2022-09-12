const mongoose = require('mongoose');
require('dotenv').config();

// connection string URI;
const mongooseURI = 'mongodb+srv://mshick97:C5a915F886!@notscustomerdb.0jqdgpw.mongodb.net/?retryWrites=true&w=majority' || process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(mongooseURI, () => console.log('\x1b[33m%s\x1b[0m', 'Connected to MongoDB'));
  }
  catch (err) {
    console.error(err);
  }
};

module.exports = connectDB;