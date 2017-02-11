// REQUIRE DEPENDENCIES
// ============================================================
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./../config');
// CONTROLLERS
// ============================================================
const applicationCtrl = require('./controllers/application.server.controller');
// INITILIZE APP
// ============================================================
const app = express();
// INITILIZE DEPENDENCIES
// ============================================================
// app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname + './../dist'));
// ENDPOINTS
// ============================================================
// MODEL ENDPOINTS
app.get('/api/application', applicationCtrl.read);
app.post('/api/application', applicationCtrl.create);
app.put('/api/application/:id', applicationCtrl.update);
app.delete('/api/application/:id', applicationCtrl.delete);
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
app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
