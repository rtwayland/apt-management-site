// REQUIRE DEPENDENCIES
// ============================================================
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./../config');
// CONTROLLERS
// ============================================================
const mainCtrl = require('./controllers/mainCtrl');
// INITILIZE APP
// ============================================================
const app = express();
// INITILIZE DEPENDENCIES
// ============================================================
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname + './../public'));
// ENDPOINTS
// ============================================================
// MODEL ENDPOINTS
app.get('/api/model', mainCtrl.read);
app.post('/api/model', mainCtrl.create);
app.put('/api/model/:id', mainCtrl.update);
app.delete('/api/model/:id', mainCtrl.delete);
// VARIABLES
// ============================================================
const port = config.port;
const mongoURI = config.mongoURI;
// MONGO CONNECTION
// ============================================================
mongoose.set('debug', true);
mongoose.connect(mongoURI);
mongoose.connection.once('open', function() {
  console.log('Connected to mongo at: ', mongoURI);
  });
// LISTEN
// ============================================================
app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
