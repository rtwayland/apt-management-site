// REQUIRE DEPENDENCIES
// ============================================================
const mongoose = require('mongoose');
// DEFINE SCHEMA
// ============================================================
const modelSchema = mongoose.Schema({

});
// EXPORT SCHEMA
// ============================================================
module.exports = mongoose.model('Model', modelSchema);
