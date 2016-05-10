var router = require('express').Router();
var path = require('path');
var passport = require('passport');


// Default Route
// router.get('/', function(request, response, next){
//   console.log('User', request.user);
//   console.log('Is authenticated', request.isAuthenticated());
//   response.sendFile(path.join(__dirname, '../public/views/index.html'));
// });
router.get('/success', function(request, response) {
  console.log(request.user);
  console.log('User is logged in:' , request.isAuthenticated());
  response.sendFile(path.join(__dirname, '../public/views/rinkInfo.html'));
});

router.get('/logout', function(request, response){
  request.logout();
  response.redirect('/');
});
// router.get('/user/:id', function(request, response) {
//   response.sendFile(path.join(__dirname, '../public/views/failure.html'));
// });
//
// router.get('/:name', function(request, response) {
//   response.sendFile(path.join(__dirname, '../public/views/failure.html'));
// });
//
// router.get('/*', function(request, response, next){
//   if(request.isAuthenticated()){
//     next();
//   } else {
//     response.send('404 not found');
//   }
// });


router.post('/',
  passport.authenticate('local', {
    successRedirect: '/success',
    failureRedirect: '/register'
    // could add a failure route?
  })
);






module.exports = router;
