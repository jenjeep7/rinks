var pg = require('pg');

var connectionString;

if (process.env.DATABASE_URL){
  pg.defaults.ssl = true;
  console.log('environment var');
  connectionString = process.env.DATABASE_URL;
} else {
  console.log('local var');
  connectionString = 'postgres://localhost:5432/ice_arenas';
}
function initializeDB(){
  pg.connect(connectionString, function(err, client, done){
    if (err) {
      console.log('Error connecting to DB!', err);
      process.exit(1);
    } else {
      var query = client.query('CREATE TABLE IF NOT EXISTS rinks(' +
      'id SERIAL PRIMARY KEY,' +
      'name varchar(225) NOT NULL,' +
      'address varchar(225) NOT NULL,'+
      'city varchar(100) NOT NULL,' +
      'state varchar(3) NOT NULL,' +
      'zip_code varchar(5))');

      query.on('end', function(){
        console.log('Successfully ensured schema exists');
        done();
      });

      query.on('error', function() {
        console.log('Error creating schema!');
        process.exit(1);
      });
    }
  });
}
function initializeUser() {
  pg.connect(connectionString, function(err, client, done){
    if(err) {
      console.log(err);
      process.exit(1);
    } else {
      var query = client.query('CREATE TABLE IF NOT EXISTS reviews(' +
      'id SERIAL PRIMARY KEY,' +
      'review varchar(225) NOT NULL,' +
      'username varchar(225) NOT NULL,'+
      'cold_rating varchar(1),'+
      'rink_id integer REFERENCES rinks (id));');
      query.on('end', function(){
        console.log('Successfully created schema');
        done();
      });

      query.on('error', function(error){
        console.log('Error creating schema', error);
        process.exit(1);
      });
    }
  });
}
function initializeReviewsDB(){
  pg.connect(connectionString, function(err, client, done){
    if (err) {
      console.log('Error connecting to DB!', err);
      process.exit(1);
    } else {
      var query = client.query('CREATE TABLE IF NOT EXISTS reviews(' +
      'id SERIAL PRIMARY KEY,' +
      'review varchar(80) NOT NULL,' +
      'username varchar(80),'+
      'city varchar(80),' +
      'cold_rating varchar(1))');

      query.on('end', function(){
        console.log('Successfully ensured reviews schema exists');
        done();
      });

      query.on('error', function() {
        console.log('Error creating review schema!');
        process.exit(1);
      });
    }
  });
}

module.exports.connectionString = connectionString;
module.exports.initializeDB = initializeDB;
module.exports.initializeUser = initializeUser;
module.exports.initializeReviewsDB = initializeReviewsDB;
