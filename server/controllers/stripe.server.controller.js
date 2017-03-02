const stripeConfig = require('./../../stripeConfig'),
    stripe = require("stripe")(stripeConfig.testSecret);
// plaid = require('plaid');

// const plaidClient = new plaid.Client(
//     stripeConfig.plaid_client_id,
//     stripeConfig.plaid_secret,
//     plaid.environments.tartan
// );

module.exports = {
    chargeCard(req, res) {
        var source = req.body.stripeSource;
        var amount = Math.floor(req.body.amount * 100);
        stripe.customers.create({
            source: source,
            description: req.body.email
        }, function(err, customer) {
            if (err) {
                console.log(err);
                return res.status(500).send('Charge failed');
            } else {
                stripe.charges.create({
                    amount: amount,
                    currency: "usd",
                    customer: customer.id
                }, function(err, charge) {
                    if (err) {
                        console.log('Stripe Error', err);
                        return res.status(500).send('Charge was not completed');
                    } else {
                        return res.status(200).send('Charge Successful');
                    }
                });
            }
        })
        // return res.status(200).send('Charge Successful');
    },
    chargeBank(req, res) {
        var tokenID = req.body.stripeToken;
        var amount = req.body.amount * 100;

        // Create a Customer
        stripe.customers.create({
            source: tokenID,
            description: req.body.email
        }, function(err, customer) {
            if (err) {
                console.log(err);
                return res.status(500).send('Charge failed');
            } else {
                // Verify Source
                stripe.customers.verifySource(
                    customer.id,
                    customer.default_source, {
                        amounts: [32, 45]
                    },
                    function(err, bankAccount) {
                        if (err) {
                            console.log(err);
                            return res.status(500).send('Charge failed');
                        } else {
                            // Charge the Bank
                            stripe.charges.create({
                                amount: amount,
                                currency: "usd",
                                customer: customer.id // Previously stored, then retrieved
                            }, function(err, result) {
                                if (err) {
                                    return res.status(500).send('Charge failed');
                                } else {
                                    return res.status(200).send('Charge successfull');
                                }
                            });
                            // End of Charge
                        }
                    });
                // End of Verify
            }
            // End of customer create
        });
    }

}
