'use strict';

/**
 * @ngdoc service
 * @name maureillasApp.feeds
 * @description
 * # feeds
 * Factory in the maureillasApp.
 */
angular.module('maureillasApp')
  .factory('feeds', function (rest, CONFIG) {
    var getAll = function() {
        var config = CONFIG.REMOTE.maureillasService.feeds.getAll;
        config.backend =true;
        var promiseGetFeeds = rest.call(config);
        promiseGetFeeds.then(function(result) {
          return result;
        });
        return promiseGetFeeds;
    } 

  return {
    getAll : function() {
      return getAll();
    }
  }

});
