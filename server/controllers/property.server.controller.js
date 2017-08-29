// REQUIRE DEPENDENCIES
// ============================================================
const Property = require('./../models/propertySchema');
// EXPORT METHODS
// ============================================================
module.exports = {
    // CRUD METHODS
    // ============================================================
    read(req, res) {
        if (req.query.id) {
            Property.findById(req.query.id, function(err, result) {
                if (err) {
                    res.status(500).send(err);
                }
                res.status(200).send(result);
            });
        } else if (req.query.status) {
            Property.find({
                status: req.query.status
            }, function(err, result) {
                if (err) {
                    res.status(500).send(err);
                }
                res.status(200).send(result);
            });
        } else {
            Property.find(req.query, function(err, result) {
                if (err) {
                    res.status(500).send(err);
                }
                res.status(200).send(result);
            });
        }
    },
    create(req, res) {
        Property.create(req.body, function(err, result) {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
    },
    update(req, res) {
        Property.findByIdAndUpdate(req.params.id, req.body, function(err, result) {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
    },
    delete(req, res) {
        Property.findByIdAndRemove(req.params.id, function(err, result) {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
    }
    // OTHER METHODS
    // ============================================================

};
