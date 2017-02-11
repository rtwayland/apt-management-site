// REQUIRE DEPENDENCIES
// ============================================================
const mongoose = require('mongoose');
// User SCHEMA
var applicationUserSchema = mongoose.Schema({
    firstName: {type: String, require: true},
    middleName: String,
    lastName: {type: String, require: true},
    birthdate: {type: Date, require: true},
    email: {type: String, require: true},
    phone: {type: String, require: true},
    ssn: {type: String, require: true},
    driversLicence: {type: String, require: true}
});
// Address SCHEMA
var addressSchema = mongoose.Schema({
    street: {type: String, require: true},
    city: {type: String, require: true},
    state: {type: String, require: true},
    zip: {type: String, require: true}
});
// APPLICATION SCHEMA
// ============================================================
const applicationSchema = mongoose.Schema({
    propertyName: {type: String, require: true},
    user: applicationUserSchema,
    currentResidence: {
        address: addressSchema,
        monthlyRent: {type: Number, require: true},
        beginningDate: {type: Date, require: true},
        reasonForMoving: {type: String, require: true},
        managerName: {type: String, require: true},
        managerPhone: {type: String, require: true}
    },
    currentEmployment: {
        employer: {type: String, require: true},
        occupation: {type: String, require: true},
        startDate: {type: Date, require: true},
        address: addressSchema,
        supervisorName: {type: String, require: true},
        supervisorPhone: {type: String, require: true},
        monthlyPay: {type: Number, require: true}
    },
    bankInfo: {
        checking: {
            name: {type: String, require: true},
            balance: {type: Number, require: true}
        },
        savings: {
            name: {type: String, require: true},
            balance: {type: Number, require: true}
        }
    },
    references: [{
            name: {type: String, require: true},
            phone: {type: String, require: true},
            relationship: {type: String, require: true}
        },
        {
            name: {type: String, require: true},
            phone: {type: String, require: true},
            relationship: {type: String, require: true}
        }
    ],
    generalInfo: {
        hasBeenLate: {type: String, require: true},
        lateExplaination: String,
        hasHadLawsuit: {type: String, require: true},
        lawsuitExplaination: String,
        hasNegativeCredit: {type: String, require: true},
        creditExplaination: String
    },
    additionalQuestions: String,
    signature: {type: String, require: true},
    signDate: {type: Date, require: true},
    applicationStatus: {type: String, require: true}
});
// EXPORT SCHEMA
// ============================================================
module.exports = mongoose.model('Application', applicationSchema);
