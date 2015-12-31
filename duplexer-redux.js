var duplexer = require('duplexer');

//why is duplexer 2 not working?
var through = require('through2').obj;  
//why tack on .obj to through automatically?


module.exports = function (counter) {
  /*  counter is a readable stream
  we are written objects with a 2-character country field as input

  return a duplex stream to count countries on the writable side
  and pass through counter on the readable side*/
      var counts = {};
      /*why is input defined before return? it's called in return*/
      var input = through(write, end);
      //takes 2 callbacks, write and end
      //defined after duplexer
      //write checks 

      return duplexer (input, counter);
      //first argument is the incoming stream, second is output stream
      //the duplexer module exports a single function
      //duplexer2(writable, readable) that joins together a writable 
      //stream and readable stream into a single, readable/writable duplex stream
      
      function write (row, _, next) {
          counts[row.country] = (counts[row.country] || 0) + 1;
          next();
      }
      function end (done) {
          counter.setCounts(counts);
          done();
      }
  };