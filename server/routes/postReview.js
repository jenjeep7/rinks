var router = require('express').Router();
var path = require('path');
// var passport = require('passport');
var pg = require('pg');
// var encryptLib = require('../../modules/encryption');

var connectionString = 'postgres://localhost:5432/ice_arenas';


router.post('/', function(request, response){
  console.log(request.body);

  pg.connect(connectionString, function(err, client){

    var new_review = {
      review: request.body.review,
      username: request.body.username,
      cold_rating: request.body.cold_rating
    };

    console.log('Creating reviews', new_review);

    var query = client.query('INSERT INTO reviews (review, username, cold_rating) VALUES ($1, $2, $3)', [new_review.review, new_review.username, new_review.cold_rating]);

    query.on('error', function(err){
      console.log(err);
    });

    query.on('end', function(){
      response.sendStatus(200);
      client.end();
    });

  });


});

module.exports = router;
