angular.module('starter.Firstscreencontrollers', [])

.controller('FirstScreenCtrl', function($scope, ConnectivityMonitor ,$state,GetAllPost,LoaderService,ionicToast,$rootScope) {

        $scope.validateuser=function(code){
          if(ConnectivityMonitor.isOnline()){
                  if(!code){
                  ionicToast.show('Please Enter Code.', 'top', false, 2500);
                }
                else{
                       LoaderService.show();
                       GetAllPost.Completeuser(code).then(function(result){
                          if(result){
                                $rootScope.AppData=result;
                                LoaderService.hide();
                                
                                window.localStorage.setItem('societylogin',code);
                                window.localStorage.setItem('firebasedata',JSON.stringify(result));

                                $rootScope.AppData =JSON.parse(window.localStorage.getItem('firebasedata'));
                                Applink=result.others[0].link;
                                $state.go('login');
                         }  
                         else{
                           LoaderService.hide();
                           ionicToast.show('Please enter valid invitation code.', 'top', false, 2500);
                         }
                      });
                    }   
          }
          else{
            ionicToast.show('Went offline. check network connection', 'top', false, 2500);
          }
                
        };
})

