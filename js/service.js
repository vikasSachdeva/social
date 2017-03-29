var Socio = angular.module('starter.services', [])

Socio.factory('ActionSheet', function ($ionicActionSheet, $cordovaCamera, $q) {
	 
 return {
     showActionsheet: function ($scope) {
     	var q = $q.defer();
  		var hideSheet = $ionicActionSheet.show({
     	buttons: [
	        { text: '<i class="icon ion-iphone"></i> TakePicture' },
	        { text: '<i class="icon ion-upload"></i> FromGallery' },
          	],
          destructiveText: 'Cancel',
          cancel: function() {
          console.log('CANCELLED');
          },
        buttonClicked: function(index) {
            console.log('BUTTON CLICKED', index);
            if (index===0){
               var options = {
                        quality : 100,
                        destinationType : Camera.DestinationType.DATA_URL,
                        sourceType:Camera.PictureSourceType.CAMERA,
                        allowEdit : false,
                        encodingType: Camera.EncodingType.JPEG,
                        popoverOptions: CameraPopoverOptions,
                        targetWidth: 500,
                        targetHeight: 500,
                        saveToPhotoAlbum: true
                    };
          			}
        	else{
              var options = {
                        quality : 100,
                        destinationType : Camera.DestinationType.DATA_URL,
                        sourceType:navigator.camera.PictureSourceType.PHOTOLIBRARY,
                        allowEdit : false,
                        encodingType: Camera.EncodingType.JPEG,
                        popoverOptions: CameraPopoverOptions,
                        targetWidth: 500,
                        targetHeight: 500,
                        saveToPhotoAlbum: true
                    };
        			}

        		$cordovaCamera.getPicture(options).then(function(imageData) {
                    $scope.ImageURI = "data:image/jpeg;base64," + imageData;
                    q.resolve($scope.ImageURI);
                     }, function(error) {
                        q.reject(error);
                });
        		 return true;
            },
          destructiveButtonClicked: function() {
          console.log("Button From Gallery");
            return true;
              }

        });
         return q.promise;
     }
   }
});


Socio.factory('GetAllPost', function($http, $q,$rootScope,$state){

  return {
       GetPost:function($scope,link){
        console.log('inside service GetPost');
          var q = $q.defer();
               $http({
                method:'GET',
                url:link,
                dataType:'jsonp'
              })
              .success(function(data){
                q.resolve(data);
              })
              .error(function(error){
                q.reject(error);
              })
              return q.promise;
    },
    PostComment:function($scope,link){
      console.log('inside service PostComment');
          var q = $q.defer();
               $http({
                method:'POST',
                url:link,
                dataType:'jsonp',
              })
              .success(function(data){
                q.resolve(data);
              })
              .error(function(error){
                q.reject(error);
              })
              return q.promise;
    },
    SendPush:function($scope, pushdata){
          var q = $q.defer();
               $http({
                method:'POST',
                url:'https://api.ionic.io/push/notifications',
                headers: {
                         'Content-Type':  'application/json',
                         'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIyNmE3YzFjZi0xZWRiLTQ5MTUtOTU5Ny05NzIzNzRhZTI3NWUifQ.s3BXwZE5CC5t3tYar0le1bW01Uma8WXxuV9b_uBOxL4'
                       },
                data: {
                        //"tokens":  ['ddjkRCvnP4w:APA91bEAKjddRwq_o1v9gOIuZ41xYbTiAElYP9-usCEMoZIjIcTDwYi6SFex8uqk3PUamVRGzT-7CLZQFiy37KcTwsXGpxd3fofpBzyB3FrheXGewmiCa02wBpDYu97djO4Dotwzsul1'],
                        "tokens": ['ddjkRCvnP4w:APA91bEAKjddRwq_o1v9gOIuZ41xYbTiAElYP9-usCEMoZIjIcTDwYi6SFex8uqk3PUamVRGzT-7CLZQFiy37KcTwsXGpxd3fofpBzyB3FrheXGewmiCa02wBpDYu97djO4Dotwzsul1',"fNGzNYJi8jw:APA91bHGkEp3O534najlkR7aifevSf0ni5XiZxRR34gQlbzJwYH33MAUjT442-1trJF-Bm2lW6fnkMHBFgOKATJ3C4pofV9eWDY9KCbTQFuEWs2IkUSHY-_zcztkM31FK8RDMwidrW2i"],
                        "profile": 'tester',
                        "notification": {
                          "title": "The Socio",
                          "message": "Hello world!",
                          "android": {
                            "sound": "android-sound.wav",
                            "title": pushdata.subject,
                            //"image": "https://pbs.twimg.com/profile_images/617058765167329280/9BkeDJlV.png",
                            "message": pushdata.message
                          },
                          "ios": {
                            "sound": "ios-sound.wav",
                            "title": pushdata.subject,
                            "message": pushdata.message
                          }
                        }
                      },
              })
              .success(function(data){  
                q.resolve(data);
              })
              .error(function(error){
                q.reject(error);
              })
              return q.promise;
    },
    Register:function($scope,link,image){
      console.log('inside service Register'+link);
          var q = $q.defer();
               $http({
                method:'POST',
                url:link,
                data:{'Userimage':image},
                dataType:'jsonp',
                headers: {
                         'Content-Type':  'application/x-www-form-urlencoded'
                       },
              })
              .success(function(data){  
                q.resolve(data);
              })
              .error(function(error){
                q.reject(error);
              })
              return q.promise;
    },
     Completeuser:function(name){
       var q = $q.defer();
        $http({
            method:'GET',
            url:fb+'/'+name+'.json',
            dataType:'jsonp'
            })
            .success(function(data){
              q.resolve(data);
            })
            .error(function(error){
               q.reject(error);
            });
            return q.promise;
    },
    setuseronfirebase:function(){
        var user=[
            [{link:'http://uptown.thesocio.in/',showticket:false,socityaddress:'"ireo uptown,sector-66,gurgaon,hariyana"',socitylogo:'http://uptown.thesocio.in/wp-content/uploads/images/uptownlogo.png'}],
            [{name:'A'},{name:'B'},{name:'C'},{name:'D'},{name:'E'}],
            [{name:00},{name:01},{name:02},{name:03},{name:04},{name:05},{name:06},{name:07},{name:08},{name:09},{name:10},{name:11},{name:12},{name:13},{name:14},{name:15},{name:16},{name:17},{name:18},{name:19},{name:20},{name:21},{name:22},{name:23},{name:24},{name:25},{name:26}], 
            [{name:1},{name:2},{name:3},{name:4},{name:5},{name:6}],
            [{name:'Owner'},{name:'Tenant'}],
            [{name:'Advocate'},{name:'Architect'},{name:'Astrologer'},{name:'Business Person'},{name:'Chartered Accountant'},{name:'Defence'},{name:'Doctor - Ayurvedic'},{name:'Doctor - Cardiology'},{name:'Doctor - Dermatology'},{name:'Doctor - Dentist'},{name:'Doctor - Dietician'},{name:'Doctor - ENT'},{name:'Doctor - ENT'},{name:'Doctor - Gynecology'},{name:'Doctor - Homeopathic'},{name:'Doctor - Orthopaedic'},{name:'Doctor - Pediatrics'},{name:'Doctor - Physician'},{name:'Doctor - Other'},{name:'Engineer'},{name:'Entrepreneur'},{name:'Government Official'},{name:'Homemaker'},{name:'IT Professional'},{name:'Journalist'},{name:'Pharmacist'},{name:'Retired'},{name:'Teacher'},{name:'Others'}]
        ];
        var username=['others','societyTower','societyfloor','societyflat','societyresidenttype','societyprofession']
        console.log(user.length);
        for(var i=0; i<username.length;i++){
            var ref=fb.child("utrwa").child(username[i]);
               $http({
                      method:'PUT',
                      url:ref+'.json',
                      data:user[i],
                      dataType:'jsonp'
                    })
                    .success(function(data){
                       console.log(data);
                    })
                    .error(function(err){
                      console.log(err);
                    })
        }
      
    },
  }
})



Socio.factory('GetNounce', function($http,$resource){

  return {
       Get:function(){
         $http({
                method:'GET',
                url:'http://uptown.thesocio.in/api/get_nonce/?controller=user&method=generate_auth_cookie',
                dataType:'jsonp'
              })
              .success(function(data){
                 nonce=data.nonce;
                 console.log("Nounce is::"+nonce);
              })
              .error(function(error){
                console.log(error);
              })
    },
  }
})

Socio.factory('alertFactory', function($ionicPopup){

  return {
       popup:function($scope,msg)
       {
          var alertPopup = $ionicPopup.alert({
            title: 'The Socio',
            template: msg
           });
            alertPopup.then(function(res) {
            console.log(res);
        });
    },
  }
})


Socio.factory('LoaderService', function($rootScope, $ionicLoading) {
  return {
        show : function() { 
            $ionicLoading.show({

              // The text to display in the loading indicator
              content: 'Loading',

              // The animation to use
              animation: 'fade-in',

              // Will a dark overlay or backdrop cover the entire view
              showBackdrop: true,

              // The maximum width of the loading indicator
              // Text will be wrapped if longer than maxWidth
              maxWidth: 200,

              // The delay in showing the indicator
              showDelay: 500
            });
        },
        hide : function(){
            $ionicLoading.hide();
        }
    }
})

Socio.factory('hideloader', function($timeout,LoaderService) {
  return {
        hide : function(){
           $timeout(function () {
                 LoaderService.hide();
            }, 7000);
        }
    }
})

Socio.factory('ConnectivityMonitor', function($rootScope, $cordovaNetwork, ionicToast){

  return {
    isOnline: function(){
      if(ionic.Platform.isWebView()){
        return $cordovaNetwork.isOnline();
      } else {
        return navigator.onLine;
      }
    },
    ifOffline: function(){
      if(ionic.Platform.isWebView()){
        return !$cordovaNetwork.isOnline();
      } else {
        return !navigator.onLine;
      }
    },
    startWatching: function(){
        if(ionic.Platform.isWebView()){

          $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
              ionicToast.show('Went online.', 'top', true, 2500);
          });

          $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
            ionicToast.show(message, position, stick, time);
            ionicToast.show('Went offline. check network connection', 'top', true, 2500);
          });
        }
        else {
              window.addEventListener("online", function(e) {
              ionicToast.show('Went online.', 'top', true, 2500);
          }, false);

            window.addEventListener("offline", function(e) {
            ionicToast.show('Went offline. check network connection', 'top', true, 2500);
          }, false);
        }
    }
  };
})