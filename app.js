var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
 app.use(express.static(__dirname + "/views"));
 app.get("/", function (request, response){
     response.sendFile(__dirname+"/views/index.html");
 });
app.get('/scrape', function(req, res){
var currentIndex = 1;
  var nbateam = req.query.nba;
  
    url = 'http://www.espn.com/nba/team/schedule/_/name/'+nbateam;

  request(url, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);

      var gamedate, gametime, against;
      var json = { gamedate : "", gametime : "", against : ""};
	
      $('.oddrow').filter(function(){
        var data = $(this);
     
			gamedate = data.contents().first().text(); 
			gametime = data.contents().first().next().next().text(); 
			against = data.contents().first().next().text(); 
	  if(currentIndex == 1){
		json.gamedate = gamedate ;
		json.gametime = gametime ;
	    json.against = against ;
	  }
		   currentIndex = currentIndex + 1;
      })
	
    
    }
//replace(/\n/g,"<br >");

	   fs.writeFile('views/output.json', JSON.stringify(json, null, 4), function(err){
      console.log('File successfully written' + url);
})
	
	 res.sendFile(__dirname+"/views/index.html");
	 

  })
})

app.listen('8080')

exports = module.exports = app;