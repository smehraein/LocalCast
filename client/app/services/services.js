angular.module('shortly.services', [])

.factory('Leagues', function ($http, $location, $route) {
  // Your code here
  // create
  var createLeague = function (name, sport) { //passes in json obj req.body.url
    return $http({
      method: 'POST',
      url: '/leagues', //from /create page
      data: {
        leaguename: name,
        sport: sport
      }
    }).
    then(function() {
      $route.reload();
    });
  };

  // getLinks
  var getLeagues = function () { //later MAY need to take user if want to be user specific
    return $http({
      method: 'GET',
      url: '/leagues'
    })
    .then(
      //return json obj (in controller: update the controller scope's reference to links)
      function (resp) {
        return resp.data;
      });

  };

  return {
    createLeague: createLeague,
    getLeagues: getLeagues
  };
})
.factory('Auth', function ($http, $location, $window) {
  // Don't touch this Auth service!!!
  // it is responsible for authenticating our user
  // by exchanging the user's username and password
  // for a JWT from the server
  // that JWT is then stored in localStorage as 'com.shortly'
  // after you signin/signup open devtools, click resources,
  // then localStorage and you'll see your token from the server
  var signin = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signin',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('com.shortly');
  };

  var signout = function () {
    $window.localStorage.removeItem('com.shortly');
    $location.path('/signin');
  };


  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };
});
