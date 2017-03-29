angular.module('starter.Homecontrollers', [])

.controller('HomeCtrl', function($scope,$resource,ConnectivityMonitor,ionicToast,LoaderService,$rootScope, hideloader) {

	   $rootScope.Category;
     $scope.recent;
     $scope.trandings;
     $scope.announcement;
     $scope.notices;

    
       $scope.$on('$ionicView.enter', function(){
       	if(ConnectivityMonitor.isOnline()){
            if(!$rootScope.Category){ 
                getCategory(); }
             
                 if(!$scope.announcement){
                getAnnouncement();
              }
       	}
       	else{
       		ionicToast.show('Went offline. check network connection', 'top', false, 2500);
       	}
      });


  //$cordovaNativeAudio.play('click');$cordovaNativeAudio,

      function getCategory(){
              LoaderService.show();
              hideloader.hide();
              var User = $resource(Applink+'api/getallcatdetails/?cookie='+retrievedUserObject.cookie);
              User.get(function(result) {
                  if(result.status==='ok'){
                     LoaderService.hide();
                     $rootScope.Category=result.catdetails;
                      console.log(result);
                  }  
                  else{
                        LoaderService.hide();
                        ionicToast.show('Connection Error.', 'top', false, 2500);
                       }
              });
        };


       function getNotices(){
              var User = $resource(Applink+'api/getnotice/?cookie='+retrievedUserObject.cookie);
              User.get(function(result) {
                  if(result.status==='ok'){
                      $scope.notices=result.notices;
                      console.log(result);
                  }  
                  else{
                        ionicToast.show('Connection Error.', 'top', false, 2500);
                       }
              });
        };

        function getAnnouncement(){
                var User = $resource(Applink+'api/getannouncements/?cookie='+retrievedUserObject.cookie);
                     User.get(function(data) {
                       if(data.status==='ok'){
                            $scope.announcement=data.announcements;
                            console.log(data);
                        }  
                       else{
                          ionicToast.show('Connection Error.', 'top', false, 2500);
                       }
                 });
            };


          function getRecent(){
                var User = $resource(Applink+'api/?json=get_recent_posts&cookie='+retrievedUserObject.cookie);
                     User.get(function(data) {
                       if(data.status==='ok'){
                            $scope.recent=data.posts;
                            console.log(data);
                        }  
                       else{
                          ionicToast.show('Connection Error.', 'top', false, 2500);
                       }
                 });
            };

          function getTranding(){
                var User = $resource(Applink+'api/getmostcommented/?cookie='+retrievedUserObject.cookie);
                     User.get(function(data) {
                       if(data.status==='ok'){
                            //$scope.trandings=data.mostcommented;
                            $scope.trandings=data.mostcommented.posts;
                            console.log(data);
                        }  
                       else{
                          ionicToast.show('Connection Error.', 'top', false, 2500);
                       }
                 });
            };

    $scope.TRname='Promotions';
    $scope.RNname='RWA';
    $scope.promotion=true;
    $scope.trandindBox=false;
    $scope.recentBox=false;
    $scope.rwaBox=true;
    $scope.noticeBox=false;

    $scope.trendORRecent=function(name){
      console.log(name);
      $scope.TRname=name;
      if(name==='Trending'){
          $scope.trandindBox=true;
          $scope.recentBox=false;
          $scope.promotion=false;
              if(!$scope.trandings){
                getTranding(); 
              }
      }
       else if(name==='Promotions'){
         $scope.promotion=true;
         $scope.recentBox=false;
         $scope.trandindBox=false;
      }
      else if(name==='Recent'){
         $scope.trandindBox=false;
         $scope.recentBox=true;
         $scope.promotion=false;
             if(!$scope.recent){
                getRecent(); }

      }
    };

     $scope.RwaORNotice=function(name){
      console.log(name);
      $scope.RNname=name;
      if(name==='RWA'){
         $scope.rwaBox=true;
         $scope.noticeBox=false;
      }
      else if(name==='Notices'){
          $scope.rwaBox=false;
          $scope.noticeBox=true;
            if(!$scope.notices){
                getNotices(); 
              }
      }
    };

})