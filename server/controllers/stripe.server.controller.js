const stripeConfig = require('./../../stripeConfig');
const stripe = require("stripe")(stripeConfig.testSecret);

module.exports = {
    chargeApplicationFee(req, res) {
      console.log('Req Body: ', req.body);
        var token = req.body.stripeToken;
        console.log('The TOKEN', token);

        var charge = stripe.charges.create({
            amount: 2000,
            currency: "usd",
            description: "Application fee",
            source: token,
        }, function(err, charge) {
            if (err) {
                console.log('Stripe Error', err);
                return res.status(500).send('Charge was not completed');
            }
            console.log('Stripe Charge', charge);
            return res.status(200).send('Charge Successful');
        });

    }

}
