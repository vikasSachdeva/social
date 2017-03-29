angular.module('starter.Noticecontrollers', [])

.controller('NoticesCtrl', function($scope,$resource,hideloader,$stateParams,ConnectivityMonitor,ionicToast,LoaderService) {

	     $scope.notices;
       $scope.$on('$ionicView.enter', function(){
       	if(ConnectivityMonitor.isOnline()){	
          if($stateParams.data){
                 $scope.notices=$stateParams.data; 
            }
            else{
                getNotices();
            }
       	}
       	else{
       		ionicToast.show('Went offline. check network connection', 'top', false, 2500);
       	}
      });

         function getNotices(){
                LoaderService.show();
                hideloader.hide();
                var User = $resource(Applink+'api/getnotice/?cookie='+retrievedUserObject.cookie);
                     User.get(function(result) {
                       if(result.status==='ok'){
                            $scope.notices=result.notices;
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