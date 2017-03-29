angular.module('starter.Createpostcontrollers', [])

.controller('CreatePostCtrl', function($scope,$state,$rootScope,GetAllPost,LoaderService, ConnectivityMonitor, ionicToast) {
    $scope.createPost = {};
    var postdata={};

    $scope.Addpost=function(){
      console.log($scope.createPost);
    if(ConnectivityMonitor.isOnline()){
           LoaderService.show();

           //fetching nonce
            GetAllPost.GetPost($scope, Applink+'api/get_nonce/?controller=user&method=generate_auth_cookie').then(function(result){
                     if(result.status=== "ok"){
                          console.log(result);

                            //create post start here
                              GetAllPost.PostComment($scope, Applink+'api/create_post/?nonce='+result.nonce+'&title='+$scope.createPost.title+'&content='+$scope.createPost.text+'&categories='+$scope.createPost.category+'&status=publish&cookie='+retrievedUserObject.cookie).then(function(result){
                                  if(result.status==='ok'){
                                    console.log(result.post.categories);
                                    LoaderService.hide();

                                    ionicToast.show('Post Created Successfully.', 'top', false, 2500);
                                      angular.forEach($rootScope.Category,function(value,index){
                                        if(value.cat_name===$scope.createPost.category){
                                           $state.go('app.forums', {data: value});
                                        }
                                      })

                                  }
                                  else{
                                    LoaderService.hide();
                                    ionicToast.show('Got Some Error', 'top', false, 2500);
                                  }
                              }) 
                            //create post end here
                       }
                      else{
                          LoaderService.hide();
                          alertFactory.popup($scope, 'Conection lost , Try again.');
                        }
          });//nonce end here            
    }
    else{
        ionicToast.show('Went offline. check network connection', 'top', false, 2500);
      };
    }
})

         