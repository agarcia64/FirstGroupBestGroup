//server.js

// Packages Included
var express = require('express')
var request = require('request')
var querystring = require('querystring')
var cookieParser = require('cookie-parser')
var SpotifyWebApi = require('spotify-web-api-node');

// Parameters
var port = 8888
var stateKey = 'spotify_auth_state'
var app = express()
var Promise = require('es6-promise').Promise;

// credentials are optional
var spotifyApi = new SpotifyWebApi({
  clientId : '73eabb400d3a407fac773255d5653c73',
  clientSecret : '69238deb66f94f06947b5842a0136738',
  redirectUri : 'http://localhost:8888/'
});

// Routes
app.get('/', function(req, res){
	// Get a User
	request('https://api.spotify.com/v1/users/equistice', function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    res.send(body) // Print the google web page.
	  }
	})
});


// Start the server
app.listen(port);
console.log('App listening at http://localhost:' + port);