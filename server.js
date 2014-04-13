/* this is an express server which is usefull for local dev, run as such for auto refresh 

supervisor -e 'html,js,css' node server.js


*/

var express = require('express')
  , http = require('http')
  , path = require('path')
  , reload = require('reload')

var app = express()


app.configure(function() {
  app.set('port', process.env.PORT || 8000)
  app.use(express.logger('dev'))
  app.use(express.bodyParser()) //parses json, multi-part (file), url-encoded
  app.use(app.router) //need to be explicit, (automatically adds it if you forget)
  app.use("/", express.static(__dirname + '/public'));
})



var server = http.createServer(app)

//reload code here
reload(server, app)

server.listen(app.get('port'), function(){
  console.log("Web server listening on port " + app.get('port'));
});