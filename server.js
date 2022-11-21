require('./config/config');

const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const app = express();
var compression = require('compression');
const port = process.env.PORT;
const router = express.Router();
app.use(express.static(path.join(__dirname + '/public')));
app.use(cors());
app.use(compression()); //use compression 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


var bookingRoutes = require('./config/routes/booking');
app.use('/api/v1/booking', bookingRoutes);



var server = app.listen(port, () => {
    console.log('Time slot server is running on development port ' + port);
});