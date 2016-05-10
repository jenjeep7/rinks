var router = require('express').Router();
var pg = require('pg');

var connectionString = require ('../db/connection').connectionString;



router.get('/', function(req, res){
  console.log('rink search working');
  pg.connect(connectionString, function(err, client, done){
    if(err){
      
  console.log(err);
  res.sendStatus(500);
    } else {
      var query = client.query('SELECT city FROM rinks');
      var results = [];

      query.on('error', function(error){
        console.log(error);
        done();
        res.sendStatus(500);
      });

      query.on('row', function(rowData){
        results.push(rowData);

      });

      query.on('end', function(){
        res.send(results);
        done();
      });
    }
  });
});


module.exports = router;
