// REQUIRE DEPENDENCIES
// ============================================================
const mongoose = require('mongoose');
// DEFINE SCHEMA
// ============================================================
const paymentSchema = mongoose.Schema({
  amount: String,
  date: Date,
  email: String,
  userid: String
});
// EXPORT SCHEMA
// ============================================================
module.exports = mongoose.model('Payment', paymentSchema);
