// REQUIRE DEPENDENCIES
// ============================================================
const MaintenanceRequest = require('./../models/maintenanceRequestSchema');
// EXPORT METHODS
// ============================================================
module.exports = {
    // CRUD METHODS
    // ============================================================
    read(req, res) {
        MaintenanceRequest.find(req.query, function(err, result) {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
    },
    create(req, res) {
        MaintenanceRequest.create(req.body, function(err, result) {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
    },
    delete(req, res) {
        MaintenanceRequest.findByIdAndRemove(req.params.id, function(err, result) {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
    }
    // OTHER METHODS
    // ============================================================

};
