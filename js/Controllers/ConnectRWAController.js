angular.module('starter.ConnectRWAcontrollers', [])

.controller('connectrwaCtrl', function($scope,$resource, GetAllPost, LoaderService, ConnectivityMonitor, ionicToast) {

      $scope.rwa={};
      $scope.rwa.name=retrievedUserObject.user.firstname+" "+retrievedUserObject.user.lastname;
      $scope.rwa.email=retrievedUserObject.userinfo[0].user_email;
      $scope.rwa.phone=retrievedUserObject.userinfo[0].phoneno;
      $scope.rwa.address=retrievedUserObject.userinfo[0].Tower+retrievedUserObject.userinfo[0].flor+0+retrievedUserObject.userinfo[0].Flatno;
       
      $scope.connectRwa=function(){
        if(ConnectivityMonitor.isOnline()){
            console.log($scope.rwa);
                LoaderService.show();
                GetAllPost.PostComment($scope, Applink+'api/vcontactus/?cookie='+retrievedUserObject.cookie+'&email='+$scope.rwa.email+'&subject='+$scope.rwa.subject+'&name='+$scope.rwa.name+'&addres='+$scope.rwa.address+'&message='+$scope.rwa.message+'&phonenumber='+$scope.rwa.phone).then(function(result){
                if(result.status==='ok'){
                   LoaderService.hide();
                   console.log(result);
                   ionicToast.show('Query Subimitted Successfully.', 'top', false, 2500);
                   $scope.rwa={};
                } 
               else{
                 LoaderService.hide();
                 console.log('Got Error');
               }
             });
        }
        else{
          ionicToast.show('Went offline. check network connection', 'top', false, 2500);
        }
    };

})

