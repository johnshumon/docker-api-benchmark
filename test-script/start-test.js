'use strict';

var apiBenchmark = require ('api-benchmark');
var fs = require ('fs');
var appRootDir = require('app-root-dir').get();
var moment = require('moment');
var log = require (appRootDir + '/log/bunyan.js');

var writeDir = appRootDir + '/reports/';
moment = moment().format("YYYY_MM_DDTHH_MM_SS");
var fileName = writeDir + 'report_' + moment;

var service = {
    server1: "http://localhost:8000"
};

var routes = {
        route1: {
            method: 'get',
            route: '/products/',
            headers: {'Accept' : 'application/json'},
            expectedStatusCode: 200
        },
        route2: {
            method: 'get',
            route: '/products/rest/v1/',
            headers: {'Accept' : 'application/json'},
            expectedStatusCode: 200
        }
    };

var options = {
    "minSamples": 100,
    "runMode": "parallel",
    "maxConcurrentRequests": 5,
    "debug": true,
    "stopOnError": false
};

apiBenchmark.measure(service, routes, options, function(err, results){
    if (err) {
        log.error("Error: ", err);
    }

    apiBenchmark.getHtml(results, function(error, html){
        fs.writeFile(fileName + '.html', html, function (err) {
            if (err)
                return log.error(err);
        });
    });

    fs.writeFile(fileName + '.json', JSON.stringify(results, null, 2), function (err) {
        if (err)
            return log.error(err);
    });
    log.info(results);
});