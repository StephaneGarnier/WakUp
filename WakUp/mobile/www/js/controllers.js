angular.module('app.controllers', [])
  
.controller('loginCtrl', function($scope, $wakanda, $state) {
	
	$scope.user = {
		login:"",
		password:""
	};
	
	$scope.login = function(){
		$wakanda.$login($scope.user.login, $scope.user.password).$promise.then(function(e){
			if (e.result === true){
				$state.go("profile");
			}
			else {
				
			}
		})
	};

})
   
.controller('createAccountCtrl', function($scope) {

})
   
.controller('profileCtrl', function($scope) {

})
   
.controller('editProfileCtrl', function($scope) {

})
 