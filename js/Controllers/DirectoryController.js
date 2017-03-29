angular.module('starter.Directorycontrollers', [])

.controller('DirectoryCtrl', function($scope,$resource, hideloader,LoaderService, ConnectivityMonitor, ionicToast) {
	    
      $scope.users;
      $scope.dname=retrievedUserObject.userinfo[0].Tower;
      $scope.towername=retrievedUserObject.userinfo[0].Tower;
      
       $scope.$on('$ionicView.enter', function(){
       	if(ConnectivityMonitor.isOnline()){
            getUser(); 
       	}
       	else{
       		ionicToast.show('Went offline. check network connection', 'top', false, 2500);
       	}
      });

     function getUser(){
                LoaderService.show();
                hideloader.hide();
                var User = $resource(Applink+'api/getusers/?cookie='+retrievedUserObject.cookie);
                     User.get(function(result) {
                       if(result.status==='ok'){
                             $scope.users=result.users;
                             LoaderService.hide();
                            console.log(result);
                        }  
                       else{
                          LoaderService.hide();
                          ionicToast.show('Connection Error.', 'top', false, 2500);
                       }
              });
        };




      $scope.neighbour=function(){
           $scope.towername=retrievedUserObject.userinfo[0].Tower;
           $scope.nfloor=retrievedUserObject.userinfo[0].flor;
      };

      $scope.checkdirectory=function(name){
          $scope.dname=name;
      };

        $scope.getTower=function(name){
          console.log(name);
          if(name==='All'){
              $scope.towername=undefined;
              $scope.nfloor=undefined;
                      }
          else{$scope.towername=name;
              $scope.nfloor=undefined;
          }
          
        };
})

