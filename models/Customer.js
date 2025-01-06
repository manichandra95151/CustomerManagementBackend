// const mongoose = require('mongoose');

// const customerSchema = new mongoose.Schema({
//     s_no: { type: Number, required: true },
//     name_of_customer: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     mobile_number: { type: String, required: true },
//     dob: { type: Date, required: true },
//     created_at: { type: Date, default: Date.now },
//     modified_at: { type: Date, default: Date.now }
// });

// const Customer = mongoose.model('Customer', customerSchema);
// module.exports = Customer;

const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  s_no: { type: Number, unique: true, required: true },
  name_of_customer: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  mobile_number: { type: String, unique: true, required: true },
  dob: { type: Date, required: true },
  created_at: { type: Date, default: Date.now },
  modified_at: { type: Date, default: Date.now },
});

// Compound Index for better query performance
customerSchema.index({ email: 1, mobile_number: 1 });

module.exports = mongoose.model('Customer', customerSchema);
