angular.module('shortly.links', [])

.controller('LinksController', function ($scope, Links) {
  $scope.data = {};
  $scope.data.links = [];

  $scope.goToLink = function (link) {
    Links.goToLink(link.code);
  };

  $scope.getLinks = function () {
    Links.getLinks()
      .then(function (respData) {
        $scope.data.links = respData;
    });
  };

  $scope.init = function () {
    $scope.getLinks();
  };

  $scope.init();

});
