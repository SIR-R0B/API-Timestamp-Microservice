// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var moment = require('moment');
var momentTimezone = require('moment-timezone');


// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.get('/api/timestamp/', function(req, res, next) {  
  
  
req.time = new Date();
  let date = req.time;
        res.json({
            "unix": date.getTime(),
            "utc": date.toUTCString()
                }
                );   
    
next();
}, function(req, res) {
  
  //do something

})


app.get('/api/timestamp/:date_string', function(req, res, next) {  
  
  
  //handle when param is a number. Note: Unix time is seconds NOT milliseconds since Jan 1 1970
  if (!isNaN(req.params.date_string)){
     let date = new Date(req.params.date_string * 1000);
        res.json({
            "unix": date.getTime(),
            "utc": date.toUTCString()
                }
                );
     }
  //handle when param is NOT a number
  if (isNaN(req.params.date_string)){
     let date = new Date(req.params.date_string);
        res.json({
            "unix": date.getTime(),
            "utc": date.toUTCString()
                }
                );
     }
    
next();
}, function(req, res) {
  
  //do something

})



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});