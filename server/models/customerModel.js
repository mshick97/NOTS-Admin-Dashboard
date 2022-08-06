const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Customer schema for NOTS MongoDB
const customerSchema = new Schema({
  fullName: String,
  email: { type: String, required: true, unique: true },
  fullName: String,
  street1: String,
  street2: String,
  city: String,
  state: String,
  zip: String,
},
  { bufferTimeoutMS: 20000 });

// Admin schema for NOTS MongoDB
const adminSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
},
  { bufferTimeoutMS: 20000 });

const Customer = mongoose.model('customer', customerSchema);
const Admin = mongoose.model('admin', adminSchema);

module.exports = {
  Customer,
  Admin
}