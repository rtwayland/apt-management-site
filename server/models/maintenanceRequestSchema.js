// REQUIRE DEPENDENCIES
// ============================================================
const mongoose = require('mongoose');
// DEFINE SCHEMA
// ============================================================
const maintenanceRequestSchema = mongoose.Schema({
  issue: {type: String, require: true},
  contact: {
      userid: {type: String, require: true},
      name: {type: String, require: true},
      email: {type: String, require: true},
      phone: {type: String, require: true}
  },
  propertyName: {type: String, require: true},
  propertyid: {type: String, require: true},
  date: {type: Date, require: true},
  status: {type: String, require: true}
});
// EXPORT SCHEMA
// ============================================================
module.exports = mongoose.model('MaintenanceRequest', maintenanceRequestSchema);
