angular.module('app.controllers', [])

.controller('loginCtrl', function($scope, $wakanda, $state, $ionicPopup) {

    $scope.user = {
        login: "admin",
        password: "admin"
    };

    $scope.login = function() {
        $wakanda.$login($scope.user.login, $scope.user.password).$promise.then(function(e) {
            if (e.result === true) {
                $state.go("profile");
            }
            else {
                $ionicPopup.alert({
                    title: 'Login error!',
                    template: "invalid login or password"
                });
            }
        })
    };

})

.controller('createAccountCtrl', function($scope, $wakanda, $state, $ionicPopup) {
    $scope.user = {};

    $scope.create = function() {
        $wakanda.init().$promise.then(function(ds) {

            if ($scope.user.password != $scope.user.passwordtoconfirm) {
                $ionicPopup.alert({
                    title: 'Register error!',
                    template: "passwords doesn't match"
                });
            }
            else {
                ds.Users.create($scope.user.email, $scope.user.firstname, $scope.user.lastname, $scope.user.password).$promise.then(function(event) {
                    if (event.result.error == 409) {
                        $ionicPopup.alert({
                            title: 'Register error!',
                            template: event.result.errorMessage
                        });
                    }
                    else {
                        $state.go("login");
                    }

                });
            }
        });
    };
})

.controller('profileCtrl', function($scope, $wakanda, userID, $state) {
    $wakanda.init().$promise.then(function(ds) {
        ds.Users.$find(userID).$promise.then(function(event) {
            $scope.user = event.result;
            console.log($scope.user);
        });
    })

    
})

.controller('editProfileCtrl', function($scope, $wakanda, userID, $state) {
    $wakanda.init().$promise.then(function(ds) {
        ds.Users.$find(userID).$promise.then(function(event) {
            $scope.user = event.result;

        });
    })

    $scope.save = function() {
        $wakanda.init().$promise.then(function(ds) {
            ds.Users.edit(userID, $scope.user.firstname, $scope.user.lastname).$promise.then(function(event) {
                if ($scope.user.newpassword !== undefined) {
                    ds.Users.changePassword(userID, $scope.user.oldpassword, $scope.user.newpassword).$promise.then(function(event) {
                        $state.go("profile");
                    });
                }
                else {
                    $state.go("profile");
                }
            });
        })
    }
})