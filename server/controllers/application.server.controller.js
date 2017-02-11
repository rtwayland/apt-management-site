// REQUIRE DEPENDENCIES
// ============================================================
// const Application = require('./../models/applicationSchema');
// EXPORT METHODS
// ============================================================
module.exports = {
    // CRUD METHODS
    // ============================================================
    read(req, res) {
        // Application.find(req.query, function(err, result) {
        //     if (err) {
        //         res.status(500).send(err);
        //     }
        //     res.status(200).send(result);
        // });
    },
    create(req, res) {
      console.log('Application', req.body);
      res.status(200).send('Submitted');
        // Application.create(req.body, function(err, result) {
        //     if (err) {
        //         res.status(500).send(err);
        //     }
        //     res.status(200).send(result);
        // });
    },
    update(req, res) {
        // Application.findByIdAndUpdate(req.params.id, req.body, function(err, result) {
        //     if (err) {
        //         res.status(500).send(err);
        //     }
        //     res.status(200).send(result);
        // });
    },
    delete(req, res) {
        // Application.findByIdAndRemove(req.params.id, function(err, result) {
        //     if (err) {
        //         res.status(500).send(err);
        //     }
        //     res.status(200).send(result);
        // });
    }
    // OTHER METHODS
    // ============================================================

};
