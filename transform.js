/*
var through = require('through2')
var tr = through(write)

process.stdin.pipe(tr).pipe(process.stdout)

function write (buf) { this.queue(buf.toString().toUpperCase()) }*/

var through = require('through2');
var tr = through(function (buf, _, next) {
	this.push(buf.toString().toUpperCase());
	next();
});

process.stdin.pipe(tr).pipe(process.stdout);
