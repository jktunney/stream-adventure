var through = require ('through2').obj;
var duplexer = require ('duplexer');

module.exports = function (counter) {
	var counts = {};
	var input = through(write, end);

	return duplexer(input, counter);

	function write (row, _, next){
		counts[row.country] = (counts[row.country] || 0) + 1;
		//how does this test work?
		//where are the country names stored?

		next();
	}

	function end (done){
		counter.setCounts(counts);
		done();
	}
};