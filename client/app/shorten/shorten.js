angular.module('shortly.shorten', [])

.controller('ShortenController', function ($scope, $location, Links) {
  $scope.link; //spec wants an object here, but oh well

  $scope.addLink = function () {
      console.log("scope: ", $scope.link);
    // var vm = $scope;
    Links.createLink({url: $scope.link}); //req.body.url
    $scope.link = ''; //JSON prefers single quotes
  };
});
