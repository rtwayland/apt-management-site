// REQUIRE DEPENDENCIES
// ============================================================
const Apartment = require('./../models/apartmentSchema');
// EXPORT METHODS
// ============================================================
module.exports = {
    // CRUD METHODS
    // ============================================================
    read(req, res) {
        if (req.query.id) {
            Apartment.findById(req.query.id, function(err, result) {
                if (err) {
                    res.status(500).send(err);
                }
                res.status(200).send(result);
            });
        } else if (req.query.status) {
            Apartment.find({
                status: req.query.status
            }, function(err, result) {
                if (err) {
                    res.status(500).send(err);
                }
                res.status(200).send(result);
            });
        } else {
            Apartment.find(req.query, function(err, result) {
                if (err) {
                    res.status(500).send(err);
                }
                res.status(200).send(result);
            });
        }
    },
    create(req, res) {
        Apartment.create(req.body, function(err, result) {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
    },
    update(req, res) {
        Apartment.findByIdAndUpdate(req.params.id, req.body, function(err, result) {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
    },
    delete(req, res) {
        Apartment.findByIdAndRemove(req.params.id, function(err, result) {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
    }
    // OTHER METHODS
    // ============================================================

};
