var split = require('split')
var through = require('through2')


var lineCount = 0;
var tr = through(function (buf,_, next) {
var line = buf.toString();
// the buffer that streams in is split, but needs to 
//become a stream
	this.push(lineCount % 2 === 0
		? line.toLowerCase() + '\n'
		: line.toUpperCase() + '\n'
		);
/*the conditional ? or ternary operator takes 3 operands:
condition ? val1 : val2
if condition is true, the operators has the value of val1
otherwise it has the value of val2*/
	lineCount++
	next();
})

process.stdin
//pipes in the data, it is then split
  .pipe(split())
  //split buffers chunks on newlines before we get them
  //split data is then piped to our upperCaser fcn
  .pipe(tr)
  .pipe(process.stdout)

/*
var split = require('split')
var through = require('through')

var odd = true;
var alternateLineUpperCaser = through(function (buf) {
	//
  var line = buf.toString()
  
  if(odd){
    this.queue(line.toLowerCase() + '\n')
  } else {
    this.queue(line.toUpperCase() + '\n')
  }

    odd = !odd

    //my guess is this flips odd back and forth
    //odd goes in true, then at the end becomes !true
    //after it becomes !!true === true
})

process.stdin
//pipes in the data, it is then split
  .pipe(split())
  //split buffers chunks on newlines before we get them
  //split data is then piped to our upperCaser fcn
  .pipe(alternateLineUpperCaser)
  .pipe(process.stdout)*/