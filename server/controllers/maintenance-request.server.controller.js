// REQUIRE DEPENDENCIES
// ============================================================
const MaintenanceRequest = require('./../models/maintenanceRequestSchema');
// EXPORT METHODS
// ============================================================
module.exports = {
    // CRUD METHODS
    // ============================================================
    read(req, res) {
        if (req.query.id) {
            MaintenanceRequest.findById(req.query.id, function(err, result) {
                if (err) {
                    res.status(500).send(err);
                }
                res.status(200).send(result);
            });
        } else if (req.query.status) {
            MaintenanceRequest.find({
                status: req.query.status
            }, function(err, result) {
                if (err) {
                    res.status(500).send(err);
                }
                res.status(200).send(result);
            });
        } else {
            MaintenanceRequest.find(req.query, function(err, result) {
                if (err) {
                    res.status(500).send(err);
                }
                res.status(200).send(result);
            });
        }
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
