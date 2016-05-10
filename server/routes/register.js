var router = require('express').Router();
var path = require('path');
var passport = require('passport');
var pg = require('pg');
var encryptLib = require('../../modules/encryption');

var connectionString = 'postgres://localhost:5432/ice_arenas';


router.post('/', function(request, response){
  console.log(request.body);

  pg.connect(connectionString, function(err, client){

    var user = {
      username: request.body.username,
      password: request.body.password
    };

    console.log('Creating user', user);

    var query = client.query('INSERT INTO users (username, password) VALUES ($1, $2)', [user.username, user.password]);

    query.on('error', function(err){
      console.log(err);
    });

    query.on('end', function(){
      response.sendStatus(200);
      client.end();
    });

  });


});


router.get('/user/:id', function(request, response) {
  response.sendFile(path.join(__dirname, '../public/views/failure.html'));
});

router.get('/:name', function(request, response) {
  response.sendFile(path.join(__dirname, '../public/views/failure.html'));
});

router.get('/*', function(request, response, next){
  if(request.isAuthenticated()){
    next();
  } else {
    response.send('404 not found');
  }
});

module.exports = router;
