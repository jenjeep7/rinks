var router = require('express').Router();
var pg = require('pg');

var connectionString = require ('../db/connection').connectionString;



router.get('/:city', function(req, res){
  console.log('rink_infosearch working');
  var city = req.params.city;
  console.log(city);
  pg.connect(connectionString, function(err, client, done){
    if(err){
//       var searchResult = req.body.data;
// console.log(searchResult);
  console.log(err);
  res.sendStatus(500);
    } else {
      var query = client.query('SELECT * FROM rinks WHERE city = \''+ city+'\'');
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
