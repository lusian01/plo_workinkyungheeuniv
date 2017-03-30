// \B8\F0\B5\E2\C0\BB \C3\DF\C3\E2\C7մϴ\D9.
var fs = require('fs');
var url = require('url');
var connect = require('connect');
var cluster = require('cluster');
var os = require('os');
var color = require('cli-color');
var mysql = require('mysql');

// \B5\A5\C0\CC\C5ͺ\A3\C0̽\BA\BF\CD \BF\AC\B0\E1\C7մϴ\D9.
var client = require('mysql').createClient({
    user: 'root',
    password: 'fntldks01',
    database: 'Location'
});

// \C0\A5 \BC\AD\B9\F6\B8\A6 \BB\FD\BC\BA\C7մϴ\D9.
var server = connect.createServer();
server.use(connect.query());
server.use(connect.router(function (app) {
    // GET - /Observer
    app.get('/Observer', function (request, response) {
        // Observer.htm \C6\C4\C0\CF\C0\BB \C1\A6\B0\F8\C7մϴ\D9.
        fs.readFile('Observer.htm', function (error, data) {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.end(data);
        });
    });

    // GET - /ShowData
    app.get('/ShowData', function (request, response) {
        console.log(request.query);
        // \B5\A5\C0\CC\C5ͺ\A3\C0̽\BA\C0\C7 \B5\A5\C0\CC\C5͸\A6 \C1\A6\B0\F8\C7մϴ\D9.
        client.query('SELECT * FROM locations WHERE name=?', [request.query.name], function (error, data) {
			response.writeHead(200, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify(data));
        });
    });
	

	}));

// \C0\A5 \BC\AD\B9\F6\B8\A6 \BD\C7\C7\E0\C7մϴ\D9.
server.listen(8080, function () {
    console.log(color.yellow('   server-'), 'start the Server Running at http://127.0.0.1:8080');
});

// \BC\D2\C4\CF \BC\AD\B9\F6\B8\A6 \BB\FD\BC\BA \B9\D7 \BD\C7\C7\E0\C7մϴ\D9.
var io = require('socket.io').listen(server);
io.sockets.on('connection', function (socket) {
    // join \C0̺\A5Ʈ
    socket.on('join', function (data) {
        socket.join(data);
 // receive \C0̺\A5Ʈ\B8\A6 \B9߻\FD\BD\C3ŵ\B4ϴ\D9.            
        io.sockets.in(data.name).emit('receive', {
            latitude: data.latitude,
            longitude: data.longitude,
			date: new Date().toUTCString()
        });
    });



    // location \C0̺\A5Ʈ
    socket.on('location', function (data) {
        // \B5\A5\C0\CC\C5͸\A6 \BB\F0\C0\D4\C7մϴ\D9.
        client.query('INSERT INTO locations(name, latitude, longitude, date) VALUES (?, ?, ?, NOW())', [data.name, data.latitude, data.longitude]);

       
    });
});
