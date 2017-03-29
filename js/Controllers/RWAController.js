angular.module('starter.RWAcontrollers', [])

.controller('RwaCtrl', function($scope,$resource,hideloader,ConnectivityMonitor,LoaderService,ionicToast ) {

	     $scope.RWA=[];
       $scope.$on('$ionicView.enter', function(){
       	if(ConnectivityMonitor.isOnline()){
       		 getRWA();
       	}
       	else{
       		ionicToast.show('Went offline. check network connection', 'top', false, 2500);
       	}
      });

          function getRWA(){
            LoaderService.show();
            hideloader.hide();
            var User = $resource(Applink+'api/getrwa/?cookie='+retrievedUserObject.cookie);
            User.get(function(result) {
              if(result.status==='ok'){
                  LoaderService.hide();
                  angular.forEach(result.rwa, function(val, key){
                    var beforeSplit = val.data.split('designation');
                    var designationStr = beforeSplit[1].split('";s:14:"email-addresss"')[0].split(':"')[1];
                    var imageStr = beforeSplit[0].split('front-image')[1].split(':"')[1].split('";')[0];
                    console.log(designationStr+":::::"+imageStr);
                    $scope.RWA.push({post_date:val.post_date,post_title:val.post_title,designation:designationStr,imageUrl:imageStr,post_content:val.post_content})
                  });
                }  
                else{
                    LoaderService.hide();
                    ionicToast.show('Connection Error.', 'top', false, 2500);
                   }
             });
          };


})	