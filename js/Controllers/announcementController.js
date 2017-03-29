angular.module('starter.Announcement', [])

.controller('AnnouncementCtrl', function($scope,hideloader,$resource,$stateParams,ConnectivityMonitor,LoaderService,ionicToast ) {

	     $scope.announcement;
       $scope.$on('$ionicView.enter', function(){
      	if(ConnectivityMonitor.isOnline()){
           		if($stateParams.data){
                  $scope.announcement=$stateParams.data; 
              }
              else{
                  getAnnouncement();
              }
         	}
         	else{
         		ionicToast.show('Went offline. check network connection', 'top', false, 2500);
         	}
      });

           function getAnnouncement(){
                LoaderService.show();
                hideloader.hide();
                var User = $resource(Applink+'api/getannouncements/?cookie='+retrievedUserObject.cookie);
                     User.get(function(data) {
                       if(data.status==='ok'){
                            $scope.announcement=data.announcements;
                            LoaderService.hide();
                            console.log(data);
                        }  
                       else{
                          LoaderService.hide();
                          ionicToast.show('Connection Error.', 'top', false, 2500);
                       }
                 });
            };
})	
