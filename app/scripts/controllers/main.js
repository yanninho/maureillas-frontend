'use strict';

/**
 * @ngdoc function
 * @name maureillasApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the maureillasApp
 */
angular.module('maureillasApp')
  .controller('MainCtrl', function ($scope, messages, $mdSidenav, CONFIG, menu) {
  
  $scope.alert = messages.getData();

  $scope.toggleMenu = function() {
        $mdSidenav('right')
          .toggle()
          .then(function () {
            
          });
    };

    $scope.menus = [];
    for(var keyView in CONFIG.VIEWS) {
      var view = CONFIG.VIEWS[keyView];
      for(var keyPage in view.pages) {
        var page = view.pages[keyPage];
        if (!page.hideMenu) {
          $scope.menus.push({
            selected : false,
            icon : page.icon,
            path : page.path,
            name : page.label,
            param : page.param
          });
        }
      }
    }

    $scope.indexMenuSelected = 0;

    var closeMenu = function() {
      $mdSidenav('right').close()
        .then(function () {          
        });      
    };

    var changeSelectedMenu = function(indexMenuSelected) {
      $scope.indexMenuSelected = indexMenuSelected;
      $scope.menus.forEach(function(menu) {
        menu.selected = false;
      });
      $scope.menus[indexMenuSelected].selected = true;
    };

    $scope.goTo = function (indexMenuSelected) {
        closeMenu();
        changeSelectedMenu(indexMenuSelected);
        go($scope.menus[indexMenuSelected]);
    };

    $scope.quitApp = function () {
        document.addEventListener("deviceready", function() {
          navigator.app.exitApp();
        });
    };

    var go = function(menuItem) {    
      console.log("menuItem")  
      menu.go(menuItem);    
    };

  });
