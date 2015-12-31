/*Your program will get some html written to stdin. 
Convert all the inner html to
upper-case for elements with a class name of "loud",
and pipe all the html to stdout.
*/

var trumpet = require('trumpet')
var through = require('through')
var tr = trumpet();

var upperCaser = through(function(buf){
  this.queue((buf+'').toUpperCase())
})

var loud = tr.select('.loud').createStream()
//creates a a transform stream from a css selector

/*Now 'loud' outputs all the inner html content at ''.loud''
and the data you write to 'stream' will appear as the new inner
html content*/
loud.pipe(upperCaser).pipe(loud)
//the loud variable is replaced with upperCased html
process.stdin.pipe(tr).pipe(process.stdout)
//how does this work, piping tr?


/*Reference Solution:

var trumpet = require('trumpet');
var through = require('through2');
var tr = trumpet();

var loud = tr.select('.loud').createStream();
loud.pipe(through(function (buf, _, next){
	this.push(buf.toString().toUpperCase());
	next();
})).pipe(loud)

process.stdin.pipe(tr).pipe(process.stdout);*/

