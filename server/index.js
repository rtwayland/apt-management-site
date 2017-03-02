// REQUIRE DEPENDENCIES
// ============================================================
const express = require('express'),
    session = require('express-session'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    Auth0Strategy = require('passport-auth0'),
    authConfig = require('./../authConfig'),
    config = require('./../config');
// CONTROLLERS
// ============================================================
const applicationCtrl = require('./controllers/application.server.controller'),
    userCtrl = require('./controllers/user.server.controller'),
    apartmentCtrl = require('./controllers/apartment.server.controller'),
    maintenanceRequestCtrl = require('./controllers/maintenance-request.server.controller'),
    stripeCtrl = require('./controllers/stripe.server.controller'),
    amazonS3 = require('./controllers/amazonS3.server.controller'),
    emailCtrl = require('./controllers/email.server.controller');
// INITILIZE APP
// ============================================================
const app = express();
// INITILIZE DEPENDENCIES
// ============================================================
// app.use(cors());
app.use(bodyParser.json({
    limit: '50mb'
}));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}));
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: config.secret
}))
// AUTH0 CONFIGURATION
// ============================================================
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + './../dist'));

passport.use(new Auth0Strategy({
        domain: authConfig.domain,
        clientID: authConfig.clientID,
        clientSecret: authConfig.clientSecret,
        callbackURL: authConfig.callbackURL
    },
    function(accessToken, refreshToken, extraParams, profile, done) {
        // console.log('Profile', profile);
        //Find user in database
        const User = require('./models/userSchema');
        User.findOne({
            email: profile.displayName
        }).exec(function(err, user) {
            if (err) return done(err);

            if (user && profile._json.email_verified) {
                // console.log('USER', user);
                if (!user.loginid) {
                    // console.log('NEED TO UPDATE ID', profile.identities[0].user_id);
                    // Update the user in the database
                    // Once updated, return with the user
                    User.findByIdAndUpdate(user._id, {
                        loginid: profile.identities[0].user_id
                    }).exec(
                        (err, result) => {
                            if (err) {
                                return done(err);
                            }
                            return done(null, user);
                        });
                } else {
                    if (user.loginid === profile.identities[0].user_id) {
                        // Good to go
                        // console.log('Good to go');
                        return done(null, user);
                    } else {
                        // Bad login
                        // console.log('Bad ids dont match');
                        return done(null, false);
                    }
                }
            } else {
                // No user found in the database.
                // This sends user to error page.
                // console.log('No user');
                return done(null, false);
            }
        })
    }
));

//THIS IS INVOKED ONE TIME TO SET THINGS UP
passport.serializeUser(function(userA, done) {
    //Things you might do here :
    //Serialize just the id, get other information to add to session,
    done(null, userA); //PUTS 'USER' ON THE SESSION
});

//USER COMES FROM SESSION - THIS IS INVOKED FOR EVERY ENDPOINT
passport.deserializeUser(function(userB, done) {
    //Things you might do here :
    // Query the database with the user id, get other information to put on req.user
    done(null, userB); //PUTS 'USER' ON REQ.USER
});

// ENDPOINTS
// ============================================================
// AUTH ENDPOINTS
app.get('/auth', passport.authenticate('auth0'));
app.get('/auth/callback',
    passport.authenticate('auth0', {
        successRedirect: '/#!/resident',
        failureRedirect: '/#!/register-error'
    }),
    function(req, res) {
        res.status(200).send(req.user);
    });

app.get('/auth/user', function(req, res) {
    if (!req.user) return res.sendStatus(404);
    //THIS IS WHATEVER VALUE WE GOT FROM userB variable above.
    res.status(200).send(req.user);
});

app.get('/auth/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

// APPLICATION ENDPOINTS
app.get('/api/application', applicationCtrl.read);
app.post('/api/application', applicationCtrl.create);
app.put('/api/application/:id', applicationCtrl.update);
app.delete('/api/application/:id', applicationCtrl.delete);

// USER ENDPOINTS
app.get('/api/user', userCtrl.read);
app.post('/api/user', userCtrl.create);
app.put('/api/user/:id', userCtrl.update);
app.put('/api/user/payment/:id', userCtrl.addPayment);
app.delete('/api/user/:id', userCtrl.delete);

// APARTMENT ENDPOINTS
app.get('/api/apartment', apartmentCtrl.read);
app.post('/api/apartment', apartmentCtrl.create);
app.put('/api/apartment/:id', apartmentCtrl.update);
app.delete('/api/apartment/:id', apartmentCtrl.delete);

// MAINTENANCE REQUEST ENDPOINTS
app.get('/api/maintenance', maintenanceRequestCtrl.read);
app.post('/api/maintenance', maintenanceRequestCtrl.create);
app.put('/api/maintenance/:id', maintenanceRequestCtrl.update);
app.delete('/api/maintenance/:id', maintenanceRequestCtrl.delete);

// EMAIL ENDPOINTS
app.post('/api/email-approval', emailCtrl.sendApprovedEmail);
app.post('/api/email-denial', emailCtrl.sendDeclinedEmail);

// AMAZON ENDPOINTS
app.post('/api/upload-photos', amazonS3.upload);

// STIPE PAYMENT ENDPOINTS
app.post('/rent-charge-card', stripeCtrl.chargeCard);
app.post('/rent-charge-bank', stripeCtrl.chargeBank);

// VARIABLES
// ============================================================
const port = config.port;
const mongoURI = config.mongoURI;
// MONGO CONNECTION
// ============================================================
// mongoose.set('debug', true);
mongoose.connect(mongoURI);
mongoose.connection.once('open', function() {
    console.log('Connected to mongo at: ', mongoURI);
});
// LISTEN
// ============================================================
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
