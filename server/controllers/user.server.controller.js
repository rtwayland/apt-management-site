// REQUIRE DEPENDENCIES
// ============================================================
const User = require('./../models/userSchema');
// EXPORT METHODS
// ============================================================
module.exports = {
    // CRUD METHODS
    // ============================================================
    read(req, res) {
        User.find(req.query, function(err, result) {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
    },
    create(req, res) {
        User.create(req.body, function(err, result) {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
    },
    update(req, res) {
        User.findByIdAndUpdate(req.params.id, req.body, function(err, result) {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
    },
    delete(req, res) {
        User.findByIdAndRemove(req.params.id, function(err, result) {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
    }
    // OTHER METHODS
    // ============================================================

};
