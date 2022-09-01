// Database connection
const mongoose = require('mongoose');

// connection string URI;
const mongooseURI = 'mongodb+srv://mshick97:C5a915F886!@notscustomerdb.0jqdgpw.mongodb.net/?retryWrites=true&w=majority';

const connectDB = async () => {
  try {
    await mongoose.connect(mongooseURI, () => console.log('Connected to MongoDB'));
  }
  catch (err) {
    console.error(err);
  }
};

module.exports = connectDB;