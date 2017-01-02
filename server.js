'use strict';

var finalhandler = require('finalhandler');
var http = require('http');
var serveIndex = require('serve-index');
var serveStatic = require('serve-static');
var appRootDir = require('app-root-dir').get();
var log = require(appRootDir + '/log/bunyan.js');

var PORT = process.env.port || 8096;

// Serve directory indexes for reports folder (with icons)
var index = serveIndex('reports/', {'icons': true});

// Serve up files under the folder
var serve = serveStatic('reports/');

// Create server
var server = http.createServer(function onRequest(req, res){
    var done = finalhandler(req, res);
    serve(req, res, function onNext(err) {
        if (err)
            return done(err);
        index(req, res, done);
    })
});


server.listen(PORT, log.info('Server listening on: ', PORT));