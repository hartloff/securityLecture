
var app = require('./app');
var http = require('http');

var port = 3000;
app.set('port', port);
var server = http.createServer(app);

server.listen(port);

server.on('listening', onListening);
server.on('error', onError);


function onListening() {
	var addr = server.address();
	console.log('Listening on port ' + addr.port);
}



function onError(error) {var bind = 'Port ' + port;

	switch (error.code) {
		case 'EACCES':
			console.error(bind + ' requires elevated privileges');
			process.exit(1);
			break;
		case 'EADDRINUSE':
			console.error(bind + ' is already in use');
			process.exit(1);
			break;
		default:
			throw error;
	}
}
//