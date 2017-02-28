// REQUIRE DEPENDENCIES
// ============================================================
const mongoose = require('mongoose');
// DEFINE SCHEMA
// ============================================================
const userSchema = mongoose.Schema({
  firstName: String,
  middleName: String,
  lastName: String,
  birthdate: Date,
  email: String,
  phone: String,
  relations: Array,
  emergency: {
      firstName: String,
      lastName: String,
      email: String,
      phone: String
  },
  propertyName: String,
  propertyid: String,
  applicationid: String,
  rentPaid: Boolean,
  payments: [],
  userStatus: String,
  isAdmin: Boolean,
  loginid: String
});
// EXPORT SCHEMA
// ============================================================
module.exports = mongoose.model('User', userSchema);
