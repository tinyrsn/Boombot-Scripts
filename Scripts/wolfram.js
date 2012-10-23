/**/// Description: Let me wolfram alpha that for you.....
/**///
/**/// Dependencies: xml2js
/**///
/**/// Author: https://github.com/tinyrsn
/**///
/**/// Notes: Sign up for wolfram alpha api at http://products.wolframalpha.com/api/ and enter
/**///        the key into the variable below.
exports.trigger = 'wolfram:';
exports.listed = true;
exports.script = function(boombot, data) {
  var appId = "xxxxxxxxx";
  
  //chop out the query and parse it
  try {
    var searchQueryArray = data.text.split('wolfram: ');
    var searchQuery = searchQueryArray[1];
    
	//replace the most common special characters and turn spaces into +
    searchQuery = searchQuery.replace(/\'/g,"%27").replace(/;/g,"%3B").replace(/#/g,"%23").replace(/@/g,"%40").replace(/&/g,"%26").replace(/</g,"%3C").replace(/>/g,"%3E").replace(/=/g,"%3D").replace(/\+/g,"%2B");
    //replace spaces with +
    searchQuery = searchQuery.split(' ').join('+');
	
	//Connect to the API
	var http = require('http');
	var options = {
		host: 'api.wolframalpha.com',
		port: 80,
		path: "/v2/query?input=" + searchQuery +"&appid=" + appId + "&format=plaintext"
	};
	
	var apiText = "";
	//make the API call and parse the JSON result. Ensure that full result is taken.
	http.get(options, function(res) {
	  res.on('data', function(chunk) {
		apiText = apiText + chunk;
	  });
	  
	  //when all data is recieved,
	  res.on('end', function(){
	  
		var fs = require('fs');
		var xml2js = require('xml2js');		
		var parser = new xml2js.Parser();
	
		//parse the xml into an object
		parser.parseString(apiText, function (err, result) {
			var jsonString = JSON.stringify(result); //parse object into a json string
			var parsedObject = eval('('+jsonString+')'); //parse json string into json object
			boombot.bot.speak(parsedObject.queryresult.pod["1"].subpod["0"].plaintext["0"]);
		});
	  
	 
	  });
	});
	  
  } catch (ex) {
    //sometimes people just put wolfram: with no search terms.....
    boombot.bot.speak("Wolfram what?");
  }
}