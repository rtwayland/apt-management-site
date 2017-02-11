// REQUIRE DEPENDENCIES
// ============================================================
const Application = require('./../models/applicationSchema');
// EXPORT METHODS
// ============================================================
module.exports = {
    // CRUD METHODS
    // ============================================================
    read(req, res) {
        Application.find(req.query, function(err, result) {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
    },
    create(req, res) {
        // Create schema variable from req.body
        let newApplication = new Application({
            propertyName: req.body.propertyName,
            user: req.body.user,
            currentResidence: req.body.currentResidence,
            currentEmployment: req.body.currentEmployment,
            bankInfo: req.body.bankInfo,
            references: req.body.references,
            generalInfo: req.body.generalInfo,
            additionalQuestions: req.body.additionalQuestions,
            signature: req.body.signature,
            signDate: req.body.signDate,
            applicationStatus: req.body.applicationStatus
        });
        // Save it to the database
        newApplication.save((err) => {
            if (err) {
                return res.status(500).send(err);
            }

            console.log('Application', newApplication);
            return res.status(200).json(newApplication);
        });
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
