angular.module('app.routes', ['wakanda'])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('login', {
    url: '/page1',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('createAccount', {
    url: '/page3',
    templateUrl: 'templates/createAccount.html',
    controller: 'createAccountCtrl'
  })

  .state('profile', {
    url: '/page4',
    templateUrl: 'templates/profile.html',
    controller: 'profileCtrl',
    resolve : {
    	userID: ['$q', '$wakanda', function($q, $wakanda) {
                    var deferred = $q.defer();
                        $wakanda.$currentUser().$promise.then(function(event) {
                            if (event.result === null) {
                                deferred.reject(false);
                            }
                            else {
                                deferred.resolve(event.result.ID);
                            }
                        }); 
                   return deferred.promise;
        }]
    }
  })

  .state('editProfile', {
    url: '/page5',
    templateUrl: 'templates/editProfile.html',
    controller: 'editProfileCtrl',
    resolve : {
    	userID: ['$q', '$wakanda', function($q, $wakanda) {
                    var deferred = $q.defer();
                        $wakanda.$currentUser().$promise.then(function(event) {
                            if (event.result === null) {
                                deferred.reject(false);
                            }
                            else {
                                deferred.resolve(event.result.ID);
                            }
                        }); 
                   return deferred.promise;
        }]
    }
  })

$urlRouterProvider.otherwise('/page1')

  

});