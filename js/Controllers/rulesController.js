angular.module('starter.Rulescontrollers', [])

.controller('RulesCtrl', function($scope,$resource,hideloader,ConnectivityMonitor,ionicToast,LoaderService) {

         $scope.rules;
         $scope.$on('$ionicView.enter', function(){
          if(ConnectivityMonitor.isOnline()){
             getRules();
          }
          else{
            ionicToast.show('Went offline. check network connection', 'top', false, 2500);
          }
        });

          function getRules(){
                LoaderService.show();
                hideloader.hide();
                var User = $resource(Applink+'api/getrules/?cookie='+retrievedUserObject.cookie);
                     User.get(function(result) {
                       if(result.status==='ok'){
                            $scope.rules=result.rules;
                            LoaderService.hide();
                            console.log(result);
                        }  
                       else{
                          LoaderService.hide();
                          ionicToast.show('Connection Error.', 'top', false, 2500);
                       }
              });
        };

})  