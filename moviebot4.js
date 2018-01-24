// index.js
const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config.js');
const discoverMovie = require('./discoverMovie.js');

const app = express();
app.use(bodyParser.json());

// Recast will send a post request to /errors to notify important errors
// described in a json body
app.post('/errors', (req, res) => {
   console.error(req.body);
   res.sendStatus(200); 
});
