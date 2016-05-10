var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();
var port = process.env.PORT || 3000;
var pg = require('pg');
var localStrategy = require('passport-local').Strategy;
var passport = require('passport');
var initializeDB = require('./db/connection').initializeDB();
var initializeUser  = require('./db/connection').initializeUser();
var initializeReviewsDB  = require('./db/connection').initializeReviewsDB();
////////////import modules//////////
// var encryptLib = require('../modules/encryption');
var connectionString = 'postgres://localhost:5432/ice_arenas';

var index = require('./routes/index');
FacebookStrategy = require('passport-facebook').Strategy;


//////////// config /////////////
app.use(express.static('server/public'));
app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended:true}));

app.use(session({
  secret:'keyboard cat',
  resave: true,
  saveUninitialized: false,
  cookie: {maxAge: 600000, secure: false}
}));

app.use(passport.initialize());
app.use(passport.session());

//Passport

passport.use('local', new localStrategy({
  passReqToCallback: true,
  usernameField: 'username'
 },
  function(request, username, password, done){
    console.log('CHECKING PASSWORD');
    pg.connect(connectionString, function(err, client){
      var query = client.query("SELECT * FROM users WHERE username = $1", [username]);

      if(err){
        console.log(err);
      }

      var user = {};

      query.on('row', function(row){
        console.log(row);
        user = row;

        console.log(password, user.password, 'passwords');
        if((password === user.password)){
          console.log('A user has been found.');
          done(err, user);
        } else {
          console.log('no matches found');
          done(null, false);
        }

      });

      client.on('end', function(){
        client.end();
      });

    });
  }
));

passport.serializeUser(function(user, done){
  console.log('Hit serializeUser');
  done(null, user.id); //Trail of breadcrumbs back to user
});

passport.deserializeUser(function(id, passportDone){
  console.log('Hit deserializeUser');

  pg.connect(connectionString, function(err, client, done){

    if(err){
      console.log(err);
    }

    var user = {};

    var query = client.query('SELECT * FROM users WHERE id = $1', [id]);

    query.on('row', function(row){
      user = row;
      passportDone(null, user); //your error is likely here
    });

    query.on('end', function(){
      client.end();
    });
  });
});

////////////Facebook Login///////////////////


// passport.use(new FacebookStrategy({
//     clientID: 1894798760746882,
//     clientSecret: 18cc4ce81215f5902697559b844c7096,
//     callbackURL: "http://www.example.com/auth/facebook/callback"
//   },
//   function(accessToken, refreshToken, profile, done) {
//     User.findOrCreate(..., function(err, user) {
//       if (err) { return done(err); }
//       done(null, user);
//     });
//   };
// ));

///////////routes/////////////
app.use('/', index);










//listen
app.listen(port, function() {
  console.log('listening on port', port);
});
