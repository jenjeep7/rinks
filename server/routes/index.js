var router = require('express').Router();
var path = require('path');
var passport = require('passport');
var pg = require('pg');
// var encryptLib = require('../../modules/encryption');
var register=require('./register');
// var failure= require('./failure');
var rink_info = require('./rink_info');
var rinks = require('./rinks');
var login = require('./login');
var getReviews = require('./getReviews');
var postReview = require('./postReview');
var connectionString = 'postgres://localhost:5432/ice_arenas';
// var initializeDB = require('./db/connection').initializeDB;


router.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, '../public/views/index.html'));
});

// router.get('/register', function(request, response){
//   response.sendFile(path.join(__dirname, '../public/views/register.html'));
// });
// router.get('/newReviews', function(request, response){
//   response.sendFile(path.join(__dirname, '../public/views/newReviews.html'));
// });
// router.get('/rinkInfo', function(request, response){
//   response.sendFile(path.join(__dirname, '../public/views/rinkInfo.html'));
//
// });
// router.get('/reviews', function(request, response){
//   response.sendFile(path.join(__dirname, '../public/views/reviews.html'));
//
// });
// router.get('/success', function(request, response){
//   response.sendFile(path.join(__dirname, '../public/views/rinkInfo.html'));
//
// });
//
// router.get('/failure', function(request, response) {
//   response.sendFile(path.join(__dirname, '../public/views/failure.html'));
// });
// router.get('/logout', function(request, response) {
//   response.sendFile(path.join(__dirname, '../public/views/index.html'));
// });

router.use('/register', register);
router.use('/rinks', rinks);
router.use('/login', login);
router.use('/rink_info', rink_info);
router.use('/getReviews', getReviews);
router.use('/postReview', postReview);
// router.use('/failure');
router.get('/*', function(request, response){
  response.sendFile(path.join(__dirname, '../public/views/index.html'));
});
module.exports = router;
