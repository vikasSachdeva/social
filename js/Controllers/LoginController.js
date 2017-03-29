angular.module('starter.Logincontrollers', [])

.controller('LoginCtrl', function($scope, $state, GetAllPost,alertFactory,LoaderService,$firebaseArray,ConnectivityMonitor, ionicToast, $rootScope) {
    $scope.loginData = {};

    $scope.doLogin = function() {
      console.log('Doing login', $scope.loginData);
      if(ConnectivityMonitor.isOnline()){
             
                 //start here
                 LoaderService.show();
                 GetAllPost.GetPost($scope, Applink+'api/get_nonce/?controller=user&method=generate_auth_cookie').then(function(result){
                     if(result.status=== "ok"){
                          console.log(result);

                                  //login
                                   GetAllPost.GetPost($scope, Applink+'api/user/generate_auth_cookie/?nonce='+result.nonce+'&username='+$scope.loginData.username+'&password='+$scope.loginData.password+'&insecure=cool').then(function(result){
                                       if(result.status=== "ok"){
                                            console.log(result);
                                            window.localStorage.setItem('userObject', JSON.stringify(result));
                                            retrievedUserObject = JSON.parse(window.localStorage.getItem('userObject'));
                                            console.log(retrievedUserObject);

                                            LoaderService.hide();
                                            $scope.loginData = {};
                                            $state.go("app.home");
                                                      
                                        }
                                        else{
                                            LoaderService.hide();
                                            alertFactory.popup($scope, result.error);
                                            }
                                    });//login end here

                      }
                      else{
                          LoaderService.hide();
                          alertFactory.popup($scope, 'Conection lost , Try again.');
                        }
                          
                  });//nonce end here
        }
        else{
          ionicToast.show('Went offline. check network connection', 'top', false, 2500);
        }
   };



   
//ionic push notification sending function
   // function setpushToken(){
   //        var Reference = fb.child($rootScope.AppData.others[0].keyword).child('users');
   //        $scope.Pushdata = $firebaseArray(Reference);
   //        $scope.Pushdata.$loaded().then(function(x) {
   //                        console.log($scope.Pushdata);
   //                        if($scope.Pushdata.length === 0){
   //                            $scope.Pushdata.$add({deviceid : devicetoken});
   //                        }
   //                        else{
   //                            if(devicetoken){
   //                              angular.forEach($scope.Pushdata,function(value,index){
   //                                if(value.deviceid != devicetoken){
   //                                  console.log('not same device token');
   //                                  console.log(devicetoken+'::::'+value.deviceid);
   //                                  $scope.Pushdata.$add({deviceid : devicetoken});
   //                                }
   //                                else{
   //                                    console.log('same device token');
   //                                    console.log(devicetoken+'::::'+value.deviceid);
   //                                    }
   //                              })
   //                             }
   //                          }
   //                         })
   //                 .catch(function(error) {
   //                         console.log("Error:", error);
   //                 });
   // };


})

