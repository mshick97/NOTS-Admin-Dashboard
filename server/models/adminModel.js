const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const adminSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
},
  { bufferTimeoutMS: 20000 });

const Admin = mongoose.model('admin', adminSchema);

module.exports = {
  Admin
}