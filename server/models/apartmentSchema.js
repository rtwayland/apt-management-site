// REQUIRE DEPENDENCIES
// ============================================================
const mongoose = require('mongoose');
// Address SCHEMA
var addressSchema = mongoose.Schema({
    street: {type: String, require: true},
    city: {type: String, require: true},
    state: {type: String, require: true},
    zip: {type: String, require: true},
    unit: String
});
// DEFINE SCHEMA
// ============================================================
const apartmentSchema = mongoose.Schema({
  name: {type: String, require: true},
  description: {type: String, require: true},
  address: addressSchema,
  year: String,
  sqfeet: String,
  acres: String,
  beds: {type: String, require: true},
  baths: {type: String, require: true},
  rent: {type: String, require: true},
  deposit: {type: String, require: true},
  amenities: [],
  addedAmenities: [],
  photos: [],
  status: {type: String, require: true}
});
// EXPORT SCHEMA
// ============================================================
module.exports = mongoose.model('Apartment', apartmentSchema);
