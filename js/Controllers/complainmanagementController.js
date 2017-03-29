angular.module('starter.ComplainController', [])

.controller('complainfirstScreenCtrl', function($scope,$state) {

})

.controller('complainCtrl', function($scope,$state,$resource,ConnectivityMonitor,ionicToast,LoaderService,GetAllPost) {

         $scope.complain={};
         $scope.complain.username=retrievedUserObject.user.displayname;
         $scope.complain.useremail=retrievedUserObject.user.email;
	   

       $scope.$on('$ionicView.beforeEnter', function(){
          console.log('complainCtrl');
        if(ConnectivityMonitor.isOnline()){
            if(!$scope.department){
                getDeptPriority();
            }
        }
        else{
          ionicToast.show('Went offline. check network connection', 'top', false, 2500);
        }
      });


        function getDeptPriority(){
              var User = $resource(Applink+'api/getdepartmentPriorty/?cookie='+retrievedUserObject.cookie);
              User.get(function(result) {
                  if(result.status==='ok'){
                      $scope.department=result.department;
                      $scope.priority=result.priority;
                      console.log(result);
                  }  
                  else{
                        ionicToast.show('Connection Error.', 'top', false, 2500);
                       }
              });
        };
    

    $scope.changeprority=function(prio){
      angular.forEach($scope.priority, function(val, key){
                 if(val.priority===prio){
                    $scope.complain.did=val.p_id;
                    console.log($scope.complain.did);
                 }
               })
    };

    $scope.changedept=function(dept){
      angular.forEach($scope.department, function(val, key){
                if(val.departmentname===dept){
                  $scope.complain.pid=val.id;
                  console.log($scope.complain.pid);
                 }
               })
    };

    $scope.filecomplain=function(){
      if(ConnectivityMonitor.isOnline()){
           console.log( $scope.complain);
           var tid=Math.floor(Math.random()*100000);
           LoaderService.show();
            GetAllPost.PostComment($scope, Applink+'api/createticket/?cookie='+retrievedUserObject.cookie+'&uid='+retrievedUserObject.user.id+'&ticketid='+tid+'&departmentid='+$scope.complain.did+'&priorityid='+$scope.complain.pid+'&email='+$scope.complain.useremail+'&name='+$scope.complain.username+'&subject='+$scope.complain.subject+'&message='+$scope.complain.text).then(function(result){
                if(result.status==='ok'){
                     LoaderService.hide();
                     console.log(result);
                     $scope.complain={};
                     $state.go('app.complainshow');
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

