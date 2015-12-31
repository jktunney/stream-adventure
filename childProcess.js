var duplexer = require('duplexer')
/*Creates a two-way stream for stdin and stdout for the child*/
var spawn = require('child_process').spawn;


var child = spawn('node', ['runner.js'])
//pass 2 args, command made, next is an array
//child will throw events when anything happens in 
//stdin, stdout, stderror for this child process

var duplex = duplexer(child.stdin, child.stdout )
//first argument it takes is the incoming stream
//second is the outcoging stream 
//needs to be below the child
process.stdin.pipe(duplex).pipe(process.stdout);
console.log('spawner is spawning ')

/*this goes all the way through our http server - uses through model
run this using nodemon we are running a javascript file, spawns child process 
of another js file, takes its stdinput, spawns a child process with it
pipes its standard input into another file, which takes its stdin
pipes it to a server, uses through to upperCase it. 
Pipes it into the response that's running in the child process
pipes it back to starting file, pipes into stdoutput */