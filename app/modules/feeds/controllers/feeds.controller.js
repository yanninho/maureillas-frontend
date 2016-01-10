'use strict';

/**
 * @ngdoc function
 * @name pbrApp.controller:FeedsCtrl
 * @description
 * # FeedsCtrl
 * Controller of the maureillasApp
 */
angular.module('maureillasApp.feeds')
  .controller('FeedsCtrl', function ($scope, $location, FeedListService, CONFIG, MessageService) {

    $scope.feedList = FeedListService.get;
    var searchUrlObject = $location.path().substring(1,$location.path().length);

    if (!angular.isUndefined(searchUrlObject)) {
      var feedValue = searchUrlObject;
      $scope.title = CONFIG.VIEWS.feeds.pages[feedValue].label;
      $scope.link = CONFIG.VIEWS.feeds.pages[feedValue].link;
      $scope.loading = true;
      var promiseFeedList = FeedListService.fetchFeeds(feedValue, 10);
      var resultGetFeeds = function(res) {
      	$scope.loading = false;
      }
      var resultGetFeedsError = function() {
        $scope.loading = false;
        MessageService.setError('Erreur de communication réseau. Vérifiez votre connexion.');
      }
      promiseFeedList.then(resultGetFeeds, resultGetFeedsError);
    }

});