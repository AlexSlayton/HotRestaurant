// dependencies
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

// create the express server and assign the port
var app = express();
var PORT = 3000;

// sets up the express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json"}));

var tables = [
	
];

var waitingList = [

];

// when this route is visited, send the browser to HotRestaurant/index.html
app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, "index.html"));
});

app.get('/reserve', function(req, res) {
	res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get('/tables', function(req, res) {
	res.sendFile(path.join(__dirname, "tables.html"));
});

// when /api/tables is visited, display the tables array
app.get('/api/tables', function(req, res) {
	res.send(tables);
});

// when /api/waitingList is visited, display the waiting list array
app.get('/api/waitingList', function(req, res) {
	res.send(waitingList);
});

// when clearTables is visited, it clears tables and waitingList
app.post('/clearTables', function(req, res) {
	tables = [];
	waitingList = [];
});


app.post('/makeReservation', function(req, res) {
	if (tables.length < 5) {
		var newTable = req.body;
		tables.push(newTable);
		res.send(tables);
	}
	else {
		var newWaitingList = req.body;
		waitingList.push(newWaitingList);
		res.send(waitingList);
	}
});


// starts server to begin listening
app.listen(PORT, function() {
	console.log("App listening on PORT " + PORT);
});