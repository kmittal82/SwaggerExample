'use strict';

var SwaggerExpress = require('swagger-express-mw');

var app = require('express')();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
module.exports = app; // for testing
var port;
var config = {
  appRoot: __dirname // required config
};



SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use('/swagger', require('express').static('./node_modules/swagger-ui/dist'))
  // install middleware
  swaggerExpress.register(app);
  var db = mongoose.connect('mongodb://localhost:27017/swaggerDev', function(err){
  	if(err){
  		console.log("Entered");
  		console.log("Unable to connect to database");
  	}
  	else {
  		console.log("enter");
  		port = process.env.PORT || 10010;
  		console.log(port);
  		app.listen(port);
  		console.log("Server started Succesfully");
  	}
  });
  

  /*if (swaggerExpress.runner.swagger.paths['/hello']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
  }*/
});
