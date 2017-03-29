angular.module('starter.Appcontrollers', [])

.controller('AppCtrl', function($scope, $state,$rootScope, $ionicHistory, GetAllPost,$rootScope,$ionicNavBarDelegate) {

    $scope.data=$rootScope.AppData.others[0];
    //$scope.showPush=retrievedUserObject.user.capabilities.administrator;

    $scope.logout = function(){
        console.log($ionicHistory.viewHistory() );
        $state.go('firstscreen');
        $scope.$on('$ionicView.afterLeave', function(){
            $rootScope.Category=null;
            $rootScope.AppData=null;
            nonce=null;
            retrievedUserObject=null;
            Applink=null;
            $ionicHistory.clearCache();
            $ionicHistory.clearHistory();
            window.localStorage.clear();
            $ionicNavBarDelegate.showBackButton(false);
            console.log($ionicHistory.viewHistory() );
        });
     
    };

    $scope.navigate=function(){
            
            window.open('geo:?q='+$rootScope.AppData.others[0].socityaddress, '_system', 'location=no');
    };

    $scope.openBrowser = function(url) {
      window.open(url, "_blank", "location=yes");
    };
})
