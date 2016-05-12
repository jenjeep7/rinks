


var app = angular.module('iceApp', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
  $routeProvider
    .when('/home', {
      templateUrl: 'views/home.html',

    })
    .when('/register', {
      templateUrl: 'views/register.html',
    })
    .when('/newReviews', {
      templateUrl: 'views/newReviews.html',
      controller: 'ReviewController',
      controllerAs: 'rc'
    })
    .when('/reviews', {
      templateUrl: 'views/reviews.html',
      controller: 'ReviewController',
      controllerAs: 'rc'
    })
    .when('/rinkInfo', {
      templateUrl: 'views/rinkInfo.html',
      controller: 'SearchController',
      controllerAs: 'sc'
    });

  $locationProvider.html5Mode(true);

}]);

//controller for reviews
app.controller('ReviewController', ['$http', function($http){

var rc = this;
rc.allReviews = {};
  rc.getReviews= function(){
console.log("reviews was called");
    $http.get("/getReviews").then(function(response){
      console.log("received reviews");
      rc.allReviews= response.data;
      console.log(rc.allReviews);
    });

  };
  rc.getReviews();



}]);

//Search controller
app.controller('SearchController', ['$http', function($http){


  var vm = this;
  vm.rink_info={};

  vm.rinks = {};
  vm.selectedValue = null;
  //this gets rink info from the database
  vm.getData= function(){

    $http.get("/rinks").then(function(response){
      console.log("received search");
      vm.rinks= response.data;

    });
    return vm.rinks;
  };
  vm.getData();

// select * from rinks where city === selected value
vm.getRinkInfo= function(){
  // vm.rink_info = {};
  vm.rinkDisplay= {};
  var selectedValue= vm.selectedValue;
  $http.get("/rink_info/" + vm.selectedValue.city).then(function(response){
    console.log("received info");

    vm.rinkDisplay= response.data;



console.log(selectedValue);
console.log(vm.rinkDisplay);
  });
};


}]);
