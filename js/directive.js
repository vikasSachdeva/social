var Socio = angular.module('myApp.filters', []);



//remove html tags from text
Socio.filter('htmlToPlaintext', function() {
   return function(text) {
     return  text ? String(text).replace(/<[^>]+>/gm, '') : '';
   };
 }
);

Socio.filter('hrefToJS', function ($sce, $sanitize) {
  return function (text) {
    var regex = /href="([\S]+)"/g;
    var newString = $sanitize(text).replace(regex, "onClick=\"window.open('$1', '_system', 'location=yes')\"");
    return $sce.trustAsHtml(newString);
  }
});



//remove special character  from text
Socio.filter('html', function() {
   return function(text) {
     return  text ? String(text).replace(/[^\w\s]/gi, '') : '';
   };
 }
);


//show character first letter in capital letter
Socio.filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});



Socio.filter('subString', function() {
    return function(str, start, end) {
        if (str != undefined) {
            return str.substr(start, end);
        }
    }
});

Socio.filter('truncate', function () {
  return function (text, length, end) {
    if (isNaN(length)) {
      length = 10;
    }

    if (end === undefined) {
      end = '...';
    }

    if (text.length <= length || text.length - end.length <= length) {
      return text;
    } else {
      return String(text).substring(0, length-end.length) + end;
    }
  };
})




Socio.directive('numbers', function(){
   return {
     require: 'ngModel',
     link: function(scope, element, attrs, modelCtrl) {
       modelCtrl.$parsers.push(function (inputValue) {
           // this next if is necessary for when using ng-required on your input. 
           // In such cases, when a letter is typed first, this parser will be called
           // again, and the 2nd time, the value will be undefined
           if (inputValue === undefined) return '';
           var transformedInput = inputValue.replace(/[^0-9]/g, ''); 
           if (transformedInput!=inputValue) {
              modelCtrl.$setViewValue(transformedInput);
              modelCtrl.$render();
           }         

           return transformedInput;         
       });
     }
   };
});

Socio.directive('readMore', function($filter) {
  return {
    restrict: 'A',
    scope: {
      text: '=readMore',
      labelExpand: '@readMoreLabelExpand',
      labelCollapse: '@readMoreLabelCollapse',
      limit: '@readMoreLimit'
    },
    transclude: true,
    template: '<span ng-transclude ng-bind-html="text | hrefToJS"></span><a style="font-size: medium;" ng-show="expandlink" href="javascript:;" ng-click="toggleReadMore()" ng-bind="label"></a>',
    link: function(scope /*, element, attrs */) {

      var originalText = scope.text;

      scope.expandlink=true;

      scope.label = scope.labelExpand;

      scope.$watch('expanded', function (expandedNew) {
        if(expandedNew) {
          scope.text = originalText;
          scope.label = scope.labelCollapse;
        } else {
          scope.text = $filter('truncate')(originalText, scope.limit, '...');
          
          if(scope.text.length<200){
            scope.expandlink=false;
          }
          scope.label = scope.labelExpand;
        }
      });

      scope.toggleReadMore = function () {
        scope.expanded = !scope.expanded;
      };

    }
  };
})


Socio.directive('showMore', [function() {
    return {
        restrict: 'AE',
        replace: true,
        scope: {
            text: '=',
            limit:'='
        },

        template: '<div><p ng-show="largeText" style="padding: 5px 5px 0px 5px;"> {{ text | subString :0 :end }}.... <a href="javascript:;" ng-click="showMore()" ng-show="isShowMore" style="color:black">Show More</a><a href="javascript:;" ng-click="showLess()" ng-hide="isShowMore" style="color:black">Show Less </a></p><p ng-hide="largeText">{{ text }}</p></div> ',

        link: function(scope, iElement, iAttrs) {

            
            scope.end = scope.limit;
            scope.isShowMore = true;
            scope.largeText = true;

            if (scope.text.length <= scope.limit) {
                scope.largeText = false;
            };

            scope.showMore = function() {

                scope.end = scope.text.length;
                scope.isShowMore = false;
            };

            scope.showLess = function() {

                scope.end = scope.limit;
                scope.isShowMore = true;
            };
        }
    };
}]);



