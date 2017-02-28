// REQUIRE DEPENDENCIES
// ============================================================
const User = require('./../models/userSchema');
// EXPORT METHODS
// ============================================================
module.exports = {
    // CRUD METHODS
    // ============================================================
    read(req, res) {
        if (req.query.id) {
            User.findById(req.query.id, function(err, result) {
                if (err) {
                    return res.status(500).send(err);
                }
                res.status(200).send(result);
            });
        } else if (req.query.status) {
            User.find({
                userStatus: req.query.status
            }, function(err, result) {
                if (err) {
                    return res.status(500).send(err);
                }
                res.status(200).send(result);
            });
        } else {
            User.find(req.query, function(err, result) {
                if (err) {
                    res.status(500).send(err);
                }
                res.status(200).send(result);
            });
        }
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
    },
    // OTHER METHODS
    // ============================================================
    addPayment(req, res) {
        User.findByIdAndUpdate(req.params.id, {
                $push: {
                    "payments": req.body
                }
            }, {
                safe: true,
                upsert: true,
                new: true
            },
            function(err, result) {
                if (err) {
                    res.status(500).send(err);
                }
                res.status(200).send(result);
            });
    }
};
