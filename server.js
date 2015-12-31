var through = require('through')
//creates a readable and writeable stream 

var tr = through(function(buf){
	//invoke through and pass in a callback
	//which receives the buffer
	//buffer is the readable stream
	//when you want to return what you got, 
	//send it into this.queue
	this.queue(buf.toString().toUpperCase());
})
require('http').createServer(function(req, res){
	req.setEncoding('utf8');
	if( req.method === 'POST' ){
		req.pipe(tr).pipe(res);
		//pipes into through stream first 
	}else{
		res.end('you should POST');
	}
}).listen(9999);


/*pipes can modify data*/