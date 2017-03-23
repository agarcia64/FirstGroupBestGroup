//server.js

// Packages Included
var express = require('express')
var request = require('request')
var querystring = require('querystring')
var cookieParser = require('cookie-parser')
var SpotifyWebApi = require('spotify-web-api-node');
var path = require('path');
var jQuery = require('jquery');

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

/*
function performRequest(endpoint,method,data,success){
	var dataString = JSON.stringify(data);
	var headers = {};

	if (method == 'GET')
	{
		endpoint += '?' + querystring.stringify(data);
	}

	var options = {
		path: endpoint,
		method: method,
		headers: headers
	}

	var req = request(options, function(res)
	{
		var responseString = '';

		res.on('data', function(data)
		{
			responseString += data;
		});

		res.on('end', function()
		{
			console.log(responseString);
			var responseObject = JSON.parse(responseString);
			success(responseObject);
		});
	});


	req.write(dataString);
	req.end();
}
*/



// Routes
app.get('/', function(req, res){
	res.send('FGBG TEST')
})

app.get('/search', function(req, res){
	// Get a User
	var url = 'https://api.spotify.com/v1/users/'
	var q = req.query.q;
	//var type = req.params.type;

	url += q;

	// url += 'q=';
	// url += q;
	// url += 'type=';
	// url += type;

	request(url, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	  	var out = JSON.stringify(body, null, 10);
	  	res.send(out) // Print the google web page.
	  }
	})



});


// Start the server
app.listen(port);
console.log('App listening at http://localhost:' + port);