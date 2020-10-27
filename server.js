// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
	res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/timestamp/:date_string?", function(req, res) {
	let date_string = req.params.date_string;
	console.log(date_string);
	(!date_string) ?
		date = new Date() :
		date = new Date(
			date_string.match(/^-?[0-9]*$/g) ?
				parseInt(date_string) :
				date_string);
	(date == "Invalid Date") ?
		res.json({ error: "Invalid Date" }) :
		res.json({
			unix: date.getTime(),
			utc: date.toUTCString(),
		});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
	console.log('Your app is listening on port ' + listener.address().port);
});
