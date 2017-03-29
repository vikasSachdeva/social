angular.module('starter.postCommentcontrollers', [])

.controller('postCommentCtrl', function($scope, $stateParams, hideloader,$resource,GetAllPost,LoaderService,ConnectivityMonitor,ionicToast) {

  		$scope.comment={};
      $scope.SinglePost;
      $scope.$on('$ionicView.enter', function(){
           if($stateParams.data.ID){
              console.log($stateParams.data);
              getpost($stateParams.data.ID);
            }
            else if($stateParams.data.id){
                console.log($stateParams.data);
                getpost($stateParams.data.id);
            }
      });



      function getpost(id){
          if(ConnectivityMonitor.isOnline()){
                    LoaderService.show();
                    hideloader.hide();
                    var User = $resource(Applink+'api/get_post/?cookie='+retrievedUserObject.cookie+'&post_id='+id);
                    User.get(function(result) {
                        if(result.status==='ok'){
                            $scope.SinglePost=result.post;
                            console.log(result);
                            LoaderService.hide();
                        }  
                        else{
                              LoaderService.hide();
                              ionicToast.show('Connection Error.', 'top', false, 2500);
                             }
                    });
            }
            else{
              ionicToast.show('Went offline. check network connection', 'top', false, 2500);
            }      
        };


        $scope.postComment=function(){
            if(ConnectivityMonitor.isOnline()){
                  if(!$scope.comment.value){
                    ionicToast.show('Please Enter Comment.', 'top', false, 2500);
                  }else{
                    //start here
                    LoaderService.show();
                    var loginpostsApi =Applink+'api/?json=submit_comment&post_id='+
                          $stateParams.data.id+'&name='+retrievedUserObject.user.username+
                          '&email='+retrievedUserObject.user.email+'&content='+$scope.comment.value+'&cookie='+retrievedUserObject.cookie;

                        $scope.SinglePost.comments.push({name:retrievedUserObject.user.username,date:new Date().getTime(),content:$scope.comment.value});
                        LoaderService.hide();
                        GetAllPost.PostComment($scope, loginpostsApi).then(function(result){
                          if(result.status==='ok'){
                                console.log(JSON.stringify(result));
                              }
                              else{
                                console.log('An Error occured');
                            }
                       });
                       $scope.comment={};
                  //end here
                  }
                  
            }
            else{
              ionicToast.show('Went offline. check network connection', 'top', false, 2500);
            }
        };
})


