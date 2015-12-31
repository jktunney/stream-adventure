/*In this challenge, write an http server that uses a through stream to write back
the request stream as upper-cased response data for POST requests.
*/

var http = require('http')
var fs = require('fs')
var through = require('through2')

var tr = through(function (buf, _, next){
    this.push(buf.toString().toUpperCase());
    next();
})

var server = http.createServer(function (req, res){
    if (req.method === 'POST'){
        req.pipe(tr).pipe(res);
    }else{
        res.end('post bitch')
    }
})

server.listen(process.argv[2]);



/*var through = require('through');
var http = require('http');
var fs = require('fs');

var write = function(buf) {
  this.queue(buf.toString().toUpperCase());
};
var end = function(buf) {
  this.queue(null);
};

var server = http.createServer(function (req, res) {
  if (req.method === 'POST') {
    req.pipe(through(write, end)).pipe(res);
  }
});
server.listen(process.argv[2]);*/