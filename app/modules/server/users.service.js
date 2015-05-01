'use strict';

/**
 * @ngdoc service
 * @name maurellaisApp.feedsList
 * @description
 * # feedsList
 * Factory in the maureillasApp.
 */
angular.module('maureillasApp.server')
  .factory('UserService', function (RestService, REMOTE, PlatformService) {

    var registerUser = function(registerId) {
      alert('registerUser');
      var config = REMOTE.maureillasService.users.createUser;
      config.url = config.url.replace('{ID}', registerId);
      config.url = config.url.replace('{PLATFORM}', PlatformService.getPlatform());
      alert('register : ' + config.url + ' , ' + config.method);
      var promiseRegisterUser = RestService.call(config);
    } 

    var unRegisterUser = function(registerId) {
      var config = REMOTE.maureillasService.users.deleteUser;
      config.url = config.url.replace('{ID}', registerId);
      var promiseUnregisterUser = RestService.call(config);
    } 

    var getUser = function(registerId) {
      var config = REMOTE.maureillasService.users.getUser;
      config.url = config.url.replace('{ID}', registerId);
      var promiseGetUser = RestService.call(config);
    } 

    var updateUser = function(id, datas) {
      var config = REMOTE.maureillasService.users.updateUser;
      config.url = config.url.replace('{ID}', id);
      config.params = datas;
      var promiseUpdateUser = RestService.call(config);
    } 

 	return {
    register : function(registerId) {
      return registerUser(registerId);
    },
    unregister : function(registerId) {
      return unRegisterUser(registerId);
    },
    get : function(registerId) {
      return getUser(registerId);
    },
    update : function(id, datas) {
      return updateUser(id, datas);
    }
 	}   
});
