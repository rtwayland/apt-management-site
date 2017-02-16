// REQUIRE DEPENDENCIES
// ============================================================
const mongoose = require('mongoose');
// Address SCHEMA
var addressSchema = mongoose.Schema({
    street: {type: String, require: true},
    city: {type: String, require: true},
    state: {type: String, require: true},
    zip: {type: String, require: true},
    unitnumber: String
});
// DEFINE SCHEMA
// ============================================================
const appartmentSchema = mongoose.Schema({
  name: {type: String, require: true},
  description: {type: String, require: true},
  address: addressSchema,
  year: {type: String, require: true},
  sqfeet: String,
  acres: String,
  bedrooms: {type: String, require: true},
  baths: {type: String, require: true},
  rent: {type: String, require: true},
  dateavailable: String,
  amenities: Array,
  photos: Array,
  status: {type: String, require: true}
});
// EXPORT SCHEMA
// ============================================================
module.exports = mongoose.model('Appartment', appartmentSchema);
