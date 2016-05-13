


var app = angular.module('iceApp', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
  $routeProvider

    .when('/', {
      templateUrl: 'views/home.html',

    })
    .when('/home', {
      templateUrl: 'views/home.html',

    })
    .when('/success', {
      templateUrl: 'views/success.html',

    })
    .when('/registerPage', {
      templateUrl: 'views/registerPage.html',
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
app.controller('ReviewController', ['$http', 'selectedCity', function($http, selectedCity){

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

rc.selectedCityData = selectedCity.data;

}]);

//Search controller
app.controller('SearchController', ['$http', 'selectedCity', function($http, selectedCity){


  var vm = this;
  vm.rink_info={};

  vm.rinks = {};
  vm.selectedValue = selectedCity.data;
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
  var selectedValue= vm.selectedValue.selectedCity;
  $http.get("/rink_info/" + selectedValue.city).then(function(response){
    console.log("received info");

    vm.rinkDisplay= response.data;



console.log(selectedValue);
console.log(vm.rinkDisplay);
  });
};

}]);

app.factory('selectedCity', function(){

  var data ={selectedCity: null};

  return {
    data: data
  };

});
