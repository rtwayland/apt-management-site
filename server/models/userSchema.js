// REQUIRE DEPENDENCIES
// ============================================================
const mongoose = require('mongoose');
// DEFINE SCHEMA
// ============================================================
const userSchema = mongoose.Schema({
  firstName: {type: String, require: true},
  middleName: String,
  lastName: {type: String, require: true},
  birthdate: {type: Date, require: true},
  email: {type: String, require: true},
  phone: {type: String, require: true},
  relations: Array,
  emergency: {
      firstName: {type: String, require: true},
      lastName: {type: String, require: true},
      email: {type: String, require: true},
      phone: {type: String, require: true}
  },
  propertyName: String,
  propertyid: String,
  applicationid: String,
  userStatus: String,
  loginid: String
});
// EXPORT SCHEMA
// ============================================================
module.exports = mongoose.model('User', userSchema);
