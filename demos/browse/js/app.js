angular.module('ionicApp', ['ionic'])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.browse', {
    url: '/browse',
    views: {
      'menuContent': {
        templateUrl: 'templates/browse.html',
        controller: 'BrowseCtrl'
      }
    },
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/browse');
})

.controller('AppCtrl', function($scope) {

})

.controller('BrowseCtrl', function($scope) {
  $scope.posts = [
    { likes: 0, image: 'img/arya.jpg', description: "Giving someone the stink face. #judging" },
    { likes: 0, image: 'img/jon-snow.jpg', description: "Not very happy with my friends. #drama" },
    { likes: 0, image: 'img/tyrion.jpg', description: "Father's Day always gets me down. #sadface" },
    { likes: 0, image: 'img/daenerys.jpg', description: "Having friends over for a BBQ. #summer" },
  ];
})

.directive('postCard', function($ionicActionSheet, $ionicPopup, $timeout) {
    return {
        restrict: 'E',
        templateUrl: 'templates/post-card.html',
        scope: {
          postData: "=",
        },
        controller: function($scope, $element) {

          $scope.commentsVisible = false;
          $scope.commentFieldVisible = false;
          $scope.postData.comments = $scope.postData.comments || [];

          $scope.toggleLike = function() {
            $scope.postData.liked = !$scope.postData.liked;
            // update service
          };

          $scope.toggleComments = function() {
            $scope.commentsVisible = !$scope.commentsVisible;
          };

          $scope.toggleCommentForm = function() {
            $scope.commentFieldVisible = !$scope.commentFieldVisible;
          };

          $scope.addComment = function() {
            if ($scope.newComment && $scope.newComment !== "") {
              var comment = angular.copy($scope.newComment);
              $scope.postData.comments.push($scope.newComment);
              $scope.newComment = "";
              $scope.toggleCommentForm();
            }
          };

          $scope.showOptions = function() {
            // Show the action sheet
             var hideSheet = $ionicActionSheet.show({
               buttons: [
                 { text: 'Save Photo' },
               ],
               destructiveText: 'Report',
               cancelText: 'Cancel',
               destructiveButtonClicked: function() {
                 reportPhoto();
               },
               cancel: function() {
                 hideSheet();
               },
               buttonClicked: function(index) {
                 switch (index) {
                   case 0:
                     savePhoto();
                     break;
                   case 1:
                     // do something else
                     break;
                   default:
                     break;
                 }
               }
             });

             function savePhoto() {
               var myPopup = $ionicPopup.show({
                   title: 'Photo Saved',
                   subTitle: 'Woohoo!',
                   scope: $scope
                 });
                 $timeout(function() {
                    myPopup.close();
                 }, 1000);
                 hideSheet();
             }

             function reportPhoto() {
               var myPopup = $ionicPopup.show({
                   title: 'Photo Reported',
                   subTitle: 'Super innappropriate!',
                   scope: $scope
                 });
                 $timeout(function() {
                    myPopup.close();
                 }, 1000);
                 hideSheet();
             }
          };
        }
    };
});
