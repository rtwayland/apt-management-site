const nodemailer = require('nodemailer');
const config = require('./../../config');
var transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user: config.email,
        pass: config.emailPass
    }
});
module.exports = {
    sendApprovedEmail(req, res) {
        let mailOptions = {
            from: `Fox Briar Properties ${config.email}`, // sender address
            to: req.body.emailTo, // list of receivers
            subject: 'Fox Briar Properties Application Approval', // Subject line
            text: 'You have been approved!' // plain text body
            // html: '<b>Hello world ?</b>' // html body
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return res.status(500).send('Email Not Sent');
            }
            return res.status(200).send('Email Sent');
        });
    },
    sendDeclinedEmail(req, res) {
        let mailOptions = {
            from: `Fox Briar Properties ${config.email}`, // sender address
            to: req.body.emailTo, // list of receivers
            subject: 'Fox Briar Properties Application Denial', // Subject line
            text: 'Sorry, but your application has been declined.' // plain text body
            // html: '<b>Hello world ?</b>' // html body
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
                return res.status(500).send('Email Not Sent');
            }
            return res.status(200).send('Email Sent');
        });
    },
}
