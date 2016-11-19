/*
	Require and initialise PhantomCSS module
	Paths are relative to CasperJs directory
*/

var fs = require( 'fs' );
var path = fs.absolute( fs.workingDirectory + '/phantomcss.js' );
var phantomcss = require( path );
var server = require('webserver').create();

casper.test.begin( 'unocha.org tests', function ( test ) {
	var urls = { 
		"messengersofhumanity.org": "http://messengersofhumanity.org/",
		"2015_year_in_review": "http://www.unocha.org/2015_year_in_review/",
		"2016appeal": "http://www.unocha.org/2016appeal/",
		"cap": "http://www.unocha.org/cap",
		"data-and-trends-2015": "http://www.unocha.org/data-and-trends-2015/",
		"eastern-africa": "http://www.unocha.org/eastern-africa/",
		"humanity360": "http://www.unocha.org/humanity360/",
		"ochain-2014-15": "http://www.unocha.org/ochain/2014-15/",
		"romena": "http://www.unocha.org/romena/",
		"zimbabwe": "http://www.unocha.org/rosa/about-us/about-ocha-rosa/zimbabwe",
		"southsudan.messengersofhumanity.org": "http://southsudan.messengersofhumanity.org",
		"unocha.org": "http://www.unocha.org",
		"2014_year_in_review": "http://www.unocha.org/2014_year_in_review/",
		"2014annualreport": "http://www.unocha.org/2014annualreport/",
		"afghanistan": "http://www.unocha.org/afghanistan",
		"annualreport-2013": "http://www.unocha.org/annualreport/2013/",
		"democratic-peoples-republic-korea": "http://www.unocha.org/asia-and-pacific/country-profiles/democratic-peoples-republic-korea",
		"car": "http://www.unocha.org/car",
		"CARphotojourney": "http://www.unocha.org/CARphotojourney/",
		"drc": "http://www.unocha.org/drc",
		"eritrea": "http://www.unocha.org/eastern-africa/about-us/about-ocha-eastern-africa/eritrea",
		"ethiopia": "http://www.unocha.org/ethiopia",
		"he-study-2015": "http://www.unocha.org/he-study-2015/",
		"iraq": "http://www.unocha.org/iraq",
		"japan": "http://www.unocha.org/japan/",
		"mali": "http://www.unocha.org/mali",
		"myanmar": "http://www.unocha.org/myanmar",
		"niger": "http://www.unocha.org/niger",
		"nigeria": "http://www.unocha.org/nigeria",
		"ochain-2012-13": "http://www.unocha.org/ochain/2012-13/",
		"odsg": "http://www.unocha.org/odsg/welcome/login",
		"pakistan": "http://www.unocha.org/pakistan",
		"philippines": "http://www.unocha.org/philippines",
		"roap": "http://www.unocha.org/roap/",
		"rocca": "http://www.unocha.org/rocca/",
		"rolac": "http://www.unocha.org/rolac",
		"libya": "http://www.unocha.org/romena/about-us/about-ocha-regional/libya",
		"rop": "http://www.unocha.org/rop",
		"rosa": "http://www.unocha.org/rosa/",
		"rowca": "http://www.unocha.org/rowca",
		"burkina-faso": "http://www.unocha.org/rowca/présence-régionale/burkina-faso",
		"sahel": "http://www.unocha.org/sahel",
		"saving-lives": "http://www.unocha.org/saving-lives/",
		"sltt": "http://www.unocha.org/sltt/",
		"somalia": "http://www.unocha.org/somalia",
		"south-sudan": "http://www.unocha.org/south-sudan",
		"southern-eastern-africa": "http://www.unocha.org/southern-eastern-africa",
		"stateofaid": "http://www.unocha.org/stateofaid/",
		"sudan": "http://www.unocha.org/sudan",
		"syria": "http://www.unocha.org/syria",
		"tchad": "http://www.unocha.org/tchad",
		"yemen": "http://www.unocha.org/yemen" 
	};
	
	phantomcss.init( {
		rebase: casper.cli.get( "rebase" ),
		// SlimerJS needs explicit knowledge of this Casper, and lots of absolute paths
		casper: casper,
		libraryRoot: fs.absolute( fs.workingDirectory + '' ),
		screenshotRoot: fs.absolute( fs.workingDirectory + '/screenshots' ),
		failedComparisonsRoot: fs.absolute( fs.workingDirectory + '/unocha.org/failures' ),
		addLabelToFailedImage: false,
	} );

	casper.on( 'remote.message', function ( msg ) {
		this.echo( msg );
	} );

	casper.on( 'error', function ( err ) {
		this.die( "PhantomJS has errored: " + err );
	} );

	casper.on( 'resource.error', function ( err ) {
		casper.log( 'Resource load error: ' + err, 'warning' );
	} );
	
	/*
		The test scenario
	*/
	casper.start( urls[0] );

	Object.keys(urls).forEach( function(key,index) {

		casper.thenOpen( urls[key] );

		casper.viewport( 1024, 768 );

		casper.then( function () {
			phantomcss.screenshot( 'body', key );
		} );
	} );

	/* Compare screenshots and run the tests */
	casper.then( function now_check_the_screenshots() {
		// compare screenshots
		phantomcss.compareAll();
	
	} );

	casper.run( function () {
		// phantomcss.getExitStatus() // pass or fail?
		casper.test.done();
	} );
	
} );
