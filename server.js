var express = require('express'), 
	http = require('http'), 
	_ = require('underscore')._,
	engines = require('consolidate'),
	path = require('path'),
	fs = require('fs');

var app = express();

app.engine('dust', engines.dust);

app.configure(function(){
	app.set('port', process.env.PORT || 8000);
	app.set('views', __dirname + '/');
	app.set('view engine', 'dust');
	app.use(express.favicon());
	app.use(express.logger('short'));
	app.use(express.bodyParser({uploadDir:'./uploads'}));
	app.use(express.methodOverride());
	app.use(express.cookieParser('your secret here'));
	app.use(express.session());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, '/public')));
});

app.configure('development', function(){
	app.use(express.errorHandler());
});

fs.readdir('./controller', function(err, files){
    files.forEach(function(fn) {
        if(!/\.js$/.test(fn)) return;
        require('./controller/' + fn)(app);
    });
});

app.listen(app.get('port'), function(){
	console.log("Express server listening on port " + app.get('port'));
});
