angular.module('starter.ComplainShowController', [])

.controller('complainShowCtrl', function($scope,ConnectivityMonitor,hideloader,ionicToast,LoaderService,GetAllPost) {
       
       $scope.$on('$ionicView.enter', function(){      
        if(ConnectivityMonitor.isOnline()){
              usercomplain();
        }
        else{
          ionicToast.show('Went offline. check network connection', 'top', false, 2500);
        }
      });


     function usercomplain(){
         LoaderService.show();
         hideloader.hide();
          GetAllPost.GetPost($scope, Applink+'api/gettickets/?cookie='+retrievedUserObject.cookie+'&uid='+retrievedUserObject.user.id).then(function(result){
          if(result.status==='ok'){
              LoaderService.hide();
              console.log(result);
              $scope.usercomplain=result.tickets;
              if(!result.tickets.length){
                $scope.nocomplain=true;
              }
          } 
         else{
          LoaderService.hide();
           console.log('Got Error');
         }
       });
    };


})

