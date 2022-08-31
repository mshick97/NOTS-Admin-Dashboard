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

const Customer = mongoose.model('customer', customerSchema);

module.exports = {
  Customer
}