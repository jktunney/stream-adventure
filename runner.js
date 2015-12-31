var request = require('request');

var r = request.post('http://localhost:9999');

process.stdin.pipe(r).pipe(process.stdout);

console.log('runner is running');