angular.module('starter.Registercontrollers', [])

.controller('RegisterCtrl', function($scope, $state,$cordovaInAppBrowser,$rootScope,$ionicModal, ActionSheet,LoaderService,GetAllPost,ionicToast,ConnectivityMonitor) {

    $scope.registerData = {};
    $scope.doRegister = function() {
        if(ConnectivityMonitor.isOnline()){
        
                if(!$scope.registerData.image){
                  ionicToast.show('Please upload profile picture.', 'top', false, 2500);
                  return;
                }
                else{
                        console.log($scope.registerData);
                        LoaderService.show();
                        //fetching nonce value 
                        GetAllPost.GetPost($scope, Applink+'api/get_nonce/?controller=user&method=register').then(function(result){
                          if(result.status==='ok'){
                            console.log(JSON.stringify(result));
                            
                              //Registering user
                              var url=Applink+'api/user/register/?username='+$scope.registerData.username+'&email='+$scope.registerData.email+'&nonce='+ result.nonce+'&display_name='+$scope.registerData.username+'&first_name='+$scope.registerData.firstname+'&last_name='+$scope.registerData.lastname+'&user_pass='+$scope.registerData.password+'&tower='+$scope.registerData.tower+'&mobilenumber='+$scope.registerData.mobilenumber+'&profassion='+$scope.registerData.profession+'&floors='+$scope.registerData.floor+'&residenttype='+$scope.registerData.residenttype+'&intercome='+$scope.registerData.intercomnumber+'&termandcondistion='+$scope.registerData.terms+'&flatnumber='+$scope.registerData.flat+'&notify=no'; 

                              GetAllPost.Register($scope, url ,$scope.registerData.image).then(function(result){
                                  if(result.status==='ok'){
                                    LoaderService.hide();
                                    console.log(JSON.stringify(result));

                                    $scope.registerData = {};
                                    $state.go("login");
             
                                    ionicToast.show('User Registred Successfully.', 'top', false, 2500);
                                  } 
                                  else{
                                    LoaderService.hide();
                                    ionicToast.show('Got Error.', 'top', false, 2500);
                                  }
                              }); //end here     
                          } 
                          else{
                              LoaderService.hide();
                              ionicToast.show('Got Error.', 'top', false, 2500);
                          }
                        }); //end here
                }           
        }
      else{
          ionicToast.show('Went offline. check network connection', 'top', false, 2500);
      }
  };


    $scope.showActionsheet = function(){
          ActionSheet.showActionsheet($scope).then(function(result){
          $scope.registerData.image=result;
         });
    };


      $ionicModal.fromTemplateUrl('templates/terms.html', {
          scope: $scope
        }).then(function(modal) {
          $scope.modal = modal;
        });
        

    $scope.openBrowser = function(url) {
      cordova.InAppBrowser.open('http://uptown.thesocio.in/terms&conditions.html', "_system", "location=yes");
       // window.open('http://uptown.thesocio.in/terms&conditions.html', "_blank", "location=yes");
    };
})

