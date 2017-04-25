//server.js

// Packages Included
var express = require('express')
var request = require('request')
var querystring = require('querystring')
var cookieParser = require('cookie-parser')
var SpotifyWebApi = require('spotify-web-api-node');
var path = require('path');
var jQuery = require('jquery');
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

var data = 'mongodb://localhost:27017/';

// Parameters
var port = 8888
var stateKey = 'spotify_auth_state'
var app = express()
var Promise = require('es6-promise').Promise;

// credentials are optional
var spotifyApi = new SpotifyWebApi({
  clientId : '06630b340a1843bc85e48e2ea681f0be',
  clientSecret : '90569089fedf41a8bf89e9dc46260fd6',
  redirectUri : 'http://localhost:8888/'
});

// Routes
app.get('/', function(req, res){
	res.send('FGBG TEST')
})

app.get('/add', function(req, res){
	// Get a User
	var url = 'https://api.spotify.com/v1/users/'
	var q = req.query.q;
	//var type = req.params.type;

	url += q;

	request(url, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	  	var out = JSON.parse(body)

	  	MongoClient.connect(data, function(err, db) {
  			assert.equal(null, err);
  			console.log("Connected successfully to server");

  			insertUser(db, out, function() {
  				db.close();
  			})
		}); // Print the google web page.
	  }
	})
});

var insertUser = function(db, user, callback) {
	var collection = db.collection('users');

	collection.insert([
		user
		], function(err, result){
			assert.equal(err, null);
			assert.equal(1, result.result.n)
			assert.equal(1, result.ops.length)
			console.log("Inserted a user into the collection")
			callback(result);
		});
}

app.get('/search', function(req, res){
	// Get a User
	var url = 'https://api.spotify.com/v1/users/'
	var q = req.query.q;
	//var type = req.params.type;

	url += q;

	MongoClient.connect(data, function(err, db) {
  			assert.equal(null, err);
  			console.log("Connected successfully to server");


			findUser(db, q, function() {
  				db.close();
  			})
		});

	request(url, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	  	var out = JSON.parse(body)

	  	 // Print the google web page.
	  }
	})

var findUser = function(db, user, callback) {
	var collection = db.collection('users');

	collection.find({'id': user}).toArray(function(err, user) {
		assert.equal(err, null);
		console.log("Found the User")
		var out = JSON.stringify(user)
		res.send(out)
		});
	}
});



// Start the server
app.listen(port);
console.log('App listening at http://localhost:' + port);
