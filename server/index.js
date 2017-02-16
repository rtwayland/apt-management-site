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
    apartmentCtrl = require('./controllers/apartment.server.controller');
    stripeCtrl = require('./controllers/stripe.server.controller'),
    amazonS3 = require('./controllers/amazonS3.server.controller'),
    emailCtrl = require('./controllers/email.server.controller');
// INITILIZE APP
// ============================================================
const app = express();
// INITILIZE DEPENDENCIES
// ============================================================
// app.use(cors());
app.use(bodyParser.json());
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: config.secret
}))
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
        var userSearchResult;
        User.find({
                email: profile.displayName
            }).exec()
            .then(function(user) {
                userSearchResult = user;
            });
        console.log('userSearchResult:', userSearchResult);
        // db.getUserByAuthId([profile.id], function(err, user) {
        //     user = user[0];
        //     if (!user) { //if there isn't one, we'll create one!
        //         console.log('CREATING USER');
        //         db.createUserByAuth([profile.displayName, profile.id], function(err, user) {
        //             console.log('USER CREATED', userA);
        //             return done(err, user[0]); // GOES TO SERIALIZE USER
        //         })
        //     } else { //when we find the user, return it
        //         console.log('FOUND USER', user);
        return done(null, profile);
        //     }
        // })
    }
));

//THIS IS INVOKED ONE TIME TO SET THINGS UP
passport.serializeUser(function(userA, done) {
    console.log('serializing', userA);
    var userB = userA;
    //Things you might do here :
    //Serialize just the id, get other information to add to session,
    done(null, userB); //PUTS 'USER' ON THE SESSION
});

//USER COMES FROM SESSION - THIS IS INVOKED FOR EVERY ENDPOINT
passport.deserializeUser(function(userB, done) {
    var userC = userC;
    //Things you might do here :
    // Query the database with the user id, get other information to put on req.user
    done(null, userC); //PUTS 'USER' ON REQ.USER
});
// ENDPOINTS
// ============================================================
// AUTH ENDPOINTS
app.get('/auth', passport.authenticate('auth0'));
app.get('/auth/callback',
    passport.authenticate('auth0', {
        successRedirect: '/'
    }),
    function(req, res) {
        console.log('Here in callback');
        res.status(200).send(req.user);
    })

app.get('/auth/me', function(req, res) {
    if (!req.user) return res.sendStatus(404);
    //THIS IS WHATEVER VALUE WE GOT FROM userC variable above.
    res.status(200).send(req.user);
})

app.get('/auth/logout', function(req, res) {
    req.logout();
    res.redirect('/');
})
// APPLICATION ENDPOINTS
app.get('/api/application', applicationCtrl.read);
app.post('/api/application', applicationCtrl.create);
app.put('/api/application/:id', applicationCtrl.update);
app.delete('/api/application/:id', applicationCtrl.delete);

// USER ENDPOINTS
app.get('/api/user', userCtrl.read);
app.post('/api/user', userCtrl.create);
app.put('/api/user/:id', userCtrl.update);
app.delete('/api/user/:id', userCtrl.delete);

// APARTMENT ENDPOINTS
app.get('/api/apartment', apartmentCtrl.read);
app.post('/api/apartment', apartmentCtrl.create);
app.put('/api/apartment/:id', apartmentCtrl.update);
app.delete('/api/apartment/:id', apartmentCtrl.delete);

// EMAIL ENDPOINTS
app.post('/api/email-approval', emailCtrl.sendApprovedEmail);
app.post('/api/email-denial', emailCtrl.sendDeclinedEmail);

// AMAZON ENDPOINTS
app.post('/api/upload-photos', amazonS3.upload);

// STIPE PAYMENT ENDPOINTS
app.post('/application-fee-charge', stripeCtrl.chargeApplicationFee);

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
