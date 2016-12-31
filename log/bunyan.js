'use strict';

var appRootDir = require('app-root-dir').get();
var bunyan = require('bunyan');
var PrettyStream = require('bunyan-prettystream');
var prettyStdOut = new PrettyStream();
var pkgVersion = require(appRootDir + '/package.json');

prettyStdOut.pipe(process.stdout);

var log = bunyan.createLogger({
    name: 'benchmarker',
    streams: [
        {
            level: 'info',
            path: appRootDir + '/log/INFO_benchmarker-' + pkgVersion.version + '.log'
        },
        {
            level: 'error',
            type: 'raw',
            path: appRootDir + '/log/ERROR_benchmarker' + pkgVersion.version + '.log'
        },
        {
            level: 'info',
            stream: process.stdout
        },
        {
            level: 'error',
            stream: process.stdout
        }
    ]
});

module.exports = log;
