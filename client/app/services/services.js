angular.module('shortly.services', [])

.factory('Links', function ($http, $location) {
  // Your code here
  // create
  var createLink = function (url) { //passes in json obj req.body.url
      console.log("url: ", url);
    return $http({
      method: 'POST',
      url: '/api/links', //from /create page
      data: url
    })
    .then(function (resp) {
      $location.path('/links');
    });
  };

  // getLinks
  var getLinks = function () { //later MAY need to take user if want to be user specific
    return $http({
      method: 'GET',
      url: '/api/links'
    })
    .then(
      //return json obj (in controller: update the controller scope's reference to links)
      function (resp) {
        return resp.data;
      });

  };

  // // goToLink (server updates visits)
  // var goToLink = function (code) {
  //   console.log("code in services.js goToLink: ", code);
  //   return $http({
  //     method: 'GET',
  //     url: '/api/links/' + code
  //   });
  //   // .then(function (resp) {
  //   //   $location.path('/'+resp.body.url);
  //   // });
  // };

  return {
    createLink: createLink,
    getLinks: getLinks
    // goToLink: goToLink
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
