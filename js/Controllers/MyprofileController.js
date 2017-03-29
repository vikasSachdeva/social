angular.module('starter.Myprofilecontrollers', [])

.controller('MyprofileCtrl', function($scope, ConnectivityMonitor, $resource,ionicToast, LoaderService) {
	     
       console.log(retrievedUserObject);
	     $scope.userProfile;
       $scope.userProfile=retrievedUserObject.userinfo[0];
       $scope.userProfile.firstname=retrievedUserObject.user.firstname;
       $scope.userProfile.lastname=retrievedUserObject.user.lastname;

})
