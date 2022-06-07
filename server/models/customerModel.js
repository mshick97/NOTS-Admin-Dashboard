const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const customerSchema = new Schema({
  fullName: String,
  email: { type: String, required: true }
})

const userModel = mongoose.model('')