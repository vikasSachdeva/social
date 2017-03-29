angular.module('starter.Splashcontrollers', [])

.controller('splashCtrl', function($scope,$timeout,ConnectivityMonitor,GetNounce,$rootScope,$ionicPlatform, $ionicHistory,$state,GetAllPost) {

  $ionicHistory.nextViewOptions({
             disableAnimate: true,
             disableBack: true
         });
  
  $ionicPlatform.ready(function() {
       $timeout(function () {   
        if(!window.localStorage.getItem('societylogin')  || !window.localStorage.getItem('firebasedata')){
           $state.go('firstscreen');
        }
        else if(!window.localStorage.getItem('userObject')){
            $rootScope.AppData =JSON.parse(window.localStorage.getItem('firebasedata'));
            Applink=$rootScope.AppData.others[0].link;
            $state.go('login');
        }
        else{
            $rootScope.AppData =JSON.parse(window.localStorage.getItem('firebasedata'));
            retrievedUserObject = JSON.parse(window.localStorage.getItem('userObject'));
            Applink=$rootScope.AppData.others[0].link;

            console.log($rootScope.AppData);
            console.log(retrievedUserObject);
            $state.go('app.home');
           } 
         }, 5000);
     });     
})

