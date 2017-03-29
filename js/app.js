
var nonce = null;
var retrievedUserObject = null;
var Applink = null;
angular.module('starter', ['ionic','ionic.service.core', 'ionic-toast','firebase','starter.Appcontrollers','ngCordova', 'starter.services', 'ksSwiper',
                          'myApp.filters','starter.Myprofilecontrollers','starter.Paybillcontrollers',
                          'starter.Contactcontrollers','starter.Directorycontrollers','starter.Classifiedcontrollers',
                          'starter.forumcontrollers','starter.postCommentcontrollers','starter.Createpostcontrollers',
                          'starter.Gallerycontrollers','starter.Eventcontrollers','starter.Newslettercontrollers',
                          'starter.Noticecontrollers','starter.RWAcontrollers','starter.Homecontrollers',
                          'starter.Firstscreencontrollers','starter.Registercontrollers','starter.Logincontrollers',
                          'starter.Announcement','starter.Rulescontrollers','starter.ForumsSelectcontrollers',
                          'starter.ComplainController','starter.ComplainShowController','starter.Splashcontrollers','starter.admin-controller',
                          'simpleAngularTicker','starter.ConnectRWAcontrollers','ngResource','starter.pushcontrollers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    
    /** Ionic One Signal Push Notification */
    // Enable to debug issues.
    // window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});
  
     var notificationOpenedCallback = function (jsonData) {
         console.log('didReceiveRemoteNotificationCallBack: ' + JSON.stringify(jsonData));
     };

     window.plugins.OneSignal.init("684d3a43-ffa4-45e2-a35f-f8c0281f72e6",
                                            {googleProjectNumber: "1007076146979"},
                                            notificationOpenedCallback);
  
    // Show an alert box if a notification comes in when the user is in your app.
     window.plugins.OneSignal.enableInAppAlertNotification(true);

    /** One Signal Push Notification code ends here */


    //$cordovaNativeAudio.preloadSimple('click', 'audio/tab_1.mp3');,$cordovaNativeAudio
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('firstscreen', {
      url: '/firstscreen',
      templateUrl: 'templates/firstscreen.html',
      controller: 'FirstScreenCtrl'
   })

  .state('splash', {
      url: '/splash',
      templateUrl: 'templates/splash.html',
      controller: 'splashCtrl'
   })


  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })

  .state('register', {
      url: '/register',
      templateUrl: 'templates/register.html',
      controller: 'RegisterCtrl'
    })

.state('terms', {
      url: '/terms',
      templateUrl: 'templates/terms.html',
      controller: ''
   })

    .state('app.home', {
      url: '/home',
       params: {data: null},
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html',
          controller: 'HomeCtrl'
        }
      }
    })

    .state('app.admin', {
      url: '/admin',
      views: {
        'menuContent': {
          templateUrl: 'templates/admin-console.html',
          controller: 'AdminCtrl'
        }
      }
    })

 .state('app.rwa', {
      url: '/rwa',
      views: {
        'menuContent': {
          templateUrl: 'templates/rwa.html',
          controller: 'RwaCtrl'
        }
      }
    })


  .state('app.connectrwa', {
      url: '/connectrwa',
      views: {
        'menuContent': {
          templateUrl: 'templates/connectrwa.html',
          controller: 'connectrwaCtrl'
        }
      }
    })

   .state('app.pushnotification', {
      url: '/pushnotification',
      views: {
        'menuContent': {
          templateUrl: 'templates/pushnotification.html',
          controller: 'pushnotificationCtrl'
        }
      }
    })

  .state('app.notices', {
      url: '/notices',
      params: {data: null},
      views: {
        'menuContent': {
          templateUrl: 'templates/notices.html',
          controller: 'NoticesCtrl'
        }
      }
    })
   .state('app.newsletter', {
      url: '/newsletter',
      views: {
        'menuContent': {
          templateUrl: 'templates/newsletter.html',
          controller: 'NewsletterCtrl'
        }
      }
    })
    .state('app.events', {
      url: '/events',
      views: {
        'menuContent': {
          templateUrl: 'templates/Events.html',
          controller: 'EventsCtrl'
        }
      }
    })
     .state('app.gallery', {
      url: '/gallery',
      views: {
        'menuContent': {
          templateUrl: 'templates/gallery.html',
          controller: 'GalleryCtrl'
        }
      }
    })
    .state('app.forums', {
      url: '/forums',
      params: {data: null},
      views: {
        'menuContent': {
          templateUrl: 'templates/forums.html',
          controller: 'ForumsCtrl'
        }
      }
    })
     .state('app.complain', {
      url: '/complain',
      params: {data: null},
      views: {
        'menuContent': {
          templateUrl: 'templates/complainmanagement.html',
          controller: 'complainCtrl'
        }
      }
    })

      .state('app.complainstart', {
      url: '/complainstart',
      params: {data: null},
      views: {
        'menuContent': {
          templateUrl: 'templates/complainstart.html',
          controller: 'complainfirstScreenCtrl'
        }
      }
    })

       .state('app.complainshow', {
      url: '/complainshow',
      params: {data: null},
      views: {
        'menuContent': {
          templateUrl: 'templates/complainshow.html',
          controller: 'complainShowCtrl'
        }
      }
    })



    .state('app.classifieds', {
      url: '/classifieds',
      views: {
        'menuContent': {
          templateUrl: 'templates/classifieds.html',
          controller: 'ClassifiedsCtrl'
        }
      }
    })

    .state('app.directory', {
      url: '/directory',
      views: {
        'menuContent': {
          templateUrl: 'templates/directory.html',
          controller: 'DirectoryCtrl'
        }
      }
    })
    .state('app.contacts', {
      url: '/contacts',
      views: {
        'menuContent': {
          templateUrl: 'templates/contacts.html',
          controller: 'ContactsCtrl'
        }
      }
    })
    .state('app.paybills', {
      url: '/paybills',
      views: {
        'menuContent': {
          templateUrl: 'templates/paybills.html',
          controller: 'PaybillsCtrl'
        }
      }
    })
    .state('app.myprofile', {
      url: '/myprofile',
      views: {
        'menuContent': {
          templateUrl: 'templates/myprofile.html',
          controller: 'MyprofileCtrl'
        }
      }
    })

    .state('app.postcomment', {
      url: '/postcomment',
      params: {data: null},
      views: {
        'menuContent': {
          templateUrl: 'templates/postcomment.html',
          controller: 'postCommentCtrl'
        }
      }
    })

  .state('app.announcement', {
      url: '/announcement',
      params: {data: null},
      views: {
        'menuContent': {
          templateUrl: 'templates/announcement.html',
          controller: 'AnnouncementCtrl'
        }
      }
    })

  .state('app.rules', {
      url: '/rules',
      params: {data: null},
      views: {
        'menuContent': {
          templateUrl: 'templates/rules.html',
          controller: 'RulesCtrl'
        }
      }
    })

.state('app.forumsSelect', {
      url: '/forumsSelect',
      params: {data: null},
      views: {
        'menuContent': {
          templateUrl: 'templates/forumsSelect.html',
          controller: 'ForumsSelectCtrl'
        }
      }
    })


    .state('app.createpost', {
      url: '/createpost',
      views: {
        'menuContent': {
          templateUrl: 'templates/createpost.html',
          controller: 'CreatePostCtrl'
        }
      }
    })


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/splash');
});
