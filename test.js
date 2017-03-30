var http = require('http');
var express = require('express');
var fs = require('fs');
var connect = require('connect');
var mysql = require('mysql');
var ejs = require('ejs');

//데이터 베이스와 연결합니다.
var client = require('mysql').createClient({
	user: 'root',
	password:'fntldks01',
	database: 'Location'
});
//서버를 생성합니다.
var app = express();
	//POST - /INSERT
	app.post('/Insert/:name&:latitude&:longitude', function(request, response) {
		//변수를 선언합니다.
		
		var name = request.param('name');
var latitude = request.param('latitude');
var longitude = request.param('longitude');

		console.log('insert');
		//데이터베이스 쿼리를 실행합니다.
		client.query('insert into locations(name, latitude, longitude, date) VALUES (?, ?, ?, NOW())', [name, latitude, longitude]);
		console.log("ok");
		response.send("ok");
		response.end();
		
		
	});
	//POST - /INSERT
	app.get('/Insert/:name&:latitude&:longitude', function(request, response) {
		//변수를 선언합니다.
		
		var name = request.param('name');
var latitude = request.param('latitude');
var longitude = request.param('longitude');

		console.log('insert');
		//데이터베이스 쿼리를 실행합니다.
		client.query('insert into locations(name, latitude, longitude, date) VALUES (?, ?, ?, NOW())', [name, latitude, longitude]);
		console.log("ok");
		response.send("ok");
		response.end();
		
		
	});

/*
//POST - /INSERT
	app.get('/Insert/:name&:latitude&:longitude', function(request, response) {
		//변수를 선언합니다.
		
		var name = request.param('name');
	var latitude = request.param('latitude');
	var longitude = request.param('longitude');
		console.log('insert');
		//데이터베이스 쿼리를 실행합니다.
		client.query('insert into locations(name, latitude, longitude, date) VALUES (?, ?, ?, NOW())', [name, latitude, longitude]);
		console.log("ok");
		response.send("ok");
		response.end();
	});
	
	*/
//서버를 실행합니다.
http.createServer(app).listen(8900, function() {
	console.log('Server running at http://127.0.0.1:8900');
});