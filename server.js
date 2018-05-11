// Get dependencies
const express           = require('express'),
  path                  = require('path'),
  http                  = require('http'),
  bodyParser            = require('body-parser'),
  User                  = require('./server/models/user'),
  expressValidator      = require('express-validator'),
  mongoose              = require('mongoose');

// Get our API routes
const api = require('./server/routes/api');

// Get user routes
const user = require('./server/routes/user');

const app = express();
// mongoose set up
//localhost uri
// const mongodbUri = 'mongodb://localhost/ngRoster'

//mlab uri
const mongodbUri = 'mongodb://tim:fred@ds133281.mlab.com:33281/station_training_program'
mongoose.Promise = global.Promise;
mongoose.connect(mongodbUri);

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(expressValidator());

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api', api);

// Set user routes
app.use('/user', user);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
