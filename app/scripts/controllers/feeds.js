'use strict';

/**
 * @ngdoc function
 * @name maureillasApp.controller:FeedsCtrl
 * @description
 * # FeedsCtrl
 * Controller of the maureillasApp
 */
angular.module('maureillasApp')
  .controller('FeedsCtrl', function ($scope, $location, FeedList, CONFIG, messages) {
console.log('feedsCtrl')
    $scope.feedList = FeedList.get;
    var searchUrlObject = $location.path().substring(1,$location.path().length);
console.log(searchUrlObject)
    if (!angular.isUndefined(searchUrlObject)) {
      var feedValue = searchUrlObject;
      $scope.title = CONFIG.VIEWS.feeds.pages[feedValue].label;
      $scope.loading = true;
      var promiseFeedList = FeedList.fetchFeeds(feedValue, 10);
      var resultGetFeeds = function(res) {
        $scope.loading = false;
      }
      var resultGetFeedsError = function(res) {
        $scope.loading = false;
        messages.setError('Erreur de communication réseau. Vérifiez votre connexion.');
      }
      promiseFeedList.then(resultGetFeeds, resultGetFeedsError);
    }
  });
