angular.module('app.controllers', [])

.controller('loginCtrl', function($scope, $wakanda, $state, $ionicPopup) {

    $scope.user = {
        login: "",
        password: ""
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

.controller('profileCtrl', function($scope, $wakanda, currentUser, $state) {
    $wakanda.init().$promise.then(function(ds) {
        ds.Users.$find(currentUser.ID).$promise.then(function(event) {
            $scope.user = event.result;
            $scope.user.email = currentUser.userName;
        });
    })

    
})

.controller('editProfileCtrl', function($scope, $wakanda, currentUser, $state) {
    $wakanda.init().$promise.then(function(ds) {
        ds.Users.$find(currentUser.ID).$promise.then(function(event) {
            $scope.user = event.result;
            $scope.user.email = currentUser.userName;

        });
    })

    $scope.save = function() {
        $wakanda.init().$promise.then(function(ds) {
            ds.Users.edit(currentUser.ID, $scope.user.firstname, $scope.user.lastname).$promise.then(function(event) {
                if ($scope.user.newpassword !== undefined) {
                    ds.Users.changePassword(currentUser.ID, $scope.user.oldpassword, $scope.user.newpassword).$promise.then(function(event) {
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