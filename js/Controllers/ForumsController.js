angular.module('starter.forumcontrollers', [])

.controller('ForumsCtrl', function($scope,$rootScope,GetAllPost,hideloader, $stateParams,$cordovaSocialSharing, LoaderService, ConnectivityMonitor, ionicToast) {
    $scope.posts;
    var cat_id;
    var pagecount;
    var i=2;
    var Category_id;
    var post_count;
    $scope.noMoreItemsAvailable = false;

    $scope.$on('$ionicView.enter', function(){
       if($stateParams.data){  
          console.log($stateParams.data);
          $scope.mname=$stateParams.data.cat_name;
          Category_id= $stateParams.data.id;  
          pagecount=Math.floor($stateParams.data.count/10);
       }

        if(ConnectivityMonitor.isOnline()){
          if(!$scope.posts){ 
            cat_id=$stateParams.data.id; 
            getData(cat_id); 
          }   
        }
        else{
          ionicToast.show('Went offline. check network connection', 'top', false, 2500);
        }
    });


   function getData(cat_id){
          LoaderService.show();
          hideloader.hide();
          $scope.posts=undefined;
          GetAllPost.GetPost($scope, Applink+'api/get_category_posts/?id='+cat_id+'&cookie='+retrievedUserObject.cookie).then(function(result){
          if(result.status==='ok'){
            $scope.posts=result.posts;
            LoaderService.hide();
            console.log(result);
          }
          else{
            LoaderService.hide();
            console.log('An Error occured');
          }
         });
    };

  $scope.selectCategory=function(object){
      console.log(object);
      $scope.mname=object.cat_name;
      $scope.cat_name=object.cat_name;
        
        cat_id=object.id;
        pagecount=Math.floor(object.count/10);
        i=2;
        Category_id=object.id;
        $scope.noMoreItemsAvailable=false;
        getData(object.id);

    };

  
 
  $scope.loadMore = function() {
    if(pagecount===0){
      console.log('pagecount is 0 ->'+pagecount);
      $scope.noMoreItemsAvailable = true;
      return;
    }
    else{
          console.log("pagecount is > 0 ->"+pagecount);
          GetAllPost.GetPost($scope, Applink+'api/get_category_posts/?id='+Category_id+'&page='+2+'&cookie='+retrievedUserObject.cookie).then(function(result){
              if(result.status==='ok'){
                  angular.forEach(result.posts,function(value,index){
                      $scope.posts.push(value);
                  })
                  pagecount--;
                  i++;
                  $scope.noMoreItemsAvailable=true;
              }
          }) .finally(function(){
                    $scope.$broadcast('scroll.refreshComplete');
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                    $scope.noMoreItemsAvailable=false;
                }); 
        }
  };

  
    
  $scope.SocialSharing=function(data){
    console.log("In Social");
    if(ConnectivityMonitor.isOnline){
          var message=data.title;
          var subject='';
          var file='';
          var link=data.url;
            $cordovaSocialSharing
            .share(message, subject, file, link) // Share via native share sheet
            .then(function(result) {
              console.log(result);
            }, function(err) {
              console.log(err);
            });
    }
    else{
        ionicToast.show('Went offline. check network connection', 'top', true, 2500);
    }
   
  };

  



})



