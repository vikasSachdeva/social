angular.module('starter.pushcontrollers', [])

.controller('pushnotificationCtrl', function($scope, hideloader,GetAllPost,LoaderService,ConnectivityMonitor,ionicToast) {

  		  $scope.push={};

        $scope.sendpushnot=function(){
            console.log($scope.push);
            if(ConnectivityMonitor.isOnline()){

                            LoaderService.show();
                            GetAllPost.SendPush($scope ,$scope.push).then(function(result){
                                   console.log(result);
                                  if(result.meta.status===201){
                                    console.log(result);
                                    LoaderService.hide();
                                    ionicToast.show('Notification Sent Successfully.', 'top', false, 2500);
                                  }
                                  else{
                                    LoaderService.hide();
                                    ionicToast.show('Got Some Error', 'top', false, 2500);
                                  }
                              }) 
            }
            else{
              ionicToast.show('Went offline. check network connection', 'top', false, 2500);
            }
        };
})


