// REQUIRE DEPENDENCIES
// ============================================================
const mongoose = require('mongoose');
// DEFINE SCHEMA
// ============================================================
const applicationSchema = mongoose.Schema({

});
// EXPORT SCHEMA
// ============================================================
module.exports = mongoose.model('Application', applicationSchema);
