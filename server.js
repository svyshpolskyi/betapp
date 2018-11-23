//Install express server
const express = require('express');
const path = require('path');
const https = require("http");

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/betapp'));


app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname+'/dist/betapp/index.html'));
});

setInterval(function() {
    https.get("https://bettingapp.herokuapp.com");
   console.log("--ping--");
}, 300000); // every 5 minutes (300000)

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
