// REQUIRE DEPENDENCIES
// ============================================================
const mongoose = require('mongoose');
// DEFINE SCHEMA
// ============================================================
const ApplicationSchema = mongoose.Schema({

});
// EXPORT SCHEMA
// ============================================================
module.exports = mongoose.model('Application', ApplicationSchema);
