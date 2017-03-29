angular.module('starter.Contactcontrollers', [])

.controller('ContactsCtrl', function($scope,$resource,hideloader,ConnectivityMonitor,ionicToast,LoaderService) {
	     $scope.Contacts;
       $scope.$on('$ionicView.enter', function(){
       	if(ConnectivityMonitor.isOnline()){
             getContacts();
       	}
       	else{
       		ionicToast.show('Went offline. check network connection', 'top', false, 2500);
       	}
      });


        function getContacts(){
                LoaderService.show();
                hideloader.hide();
                var User = $resource(Applink+'api/getexternalcontact/?cookie='+retrievedUserObject.cookie);
                     User.get(function(result) {
                       if(result.status==='ok'){
                            $scope.Contacts=result.externalcontat;
                            LoaderService.hide();
                            console.log(result);
                        }  
                       else{
                          LoaderService.hide();
                          ionicToast.show('Connection Error.', 'top', false, 2500);
                       }
              });
        };

    $scope.call=function(number){
      console.log(number);
      window.plugins.CallNumber.callNumber(onSuccess, onError, number, bypassAppChooser);
    };

    function onSuccess(result){
        console.log("Success:"+result);
      }

      function onError(result) {
        ionicToast.show("Error:"+result, 'top', false, 2500);
      }

})