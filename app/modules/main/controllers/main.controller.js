'use strict';

/**
 * @ngdoc function
 * @name pbrApp.controller:SubscriptionCtrl
 * @description
 * # SubscriptionCtrl
 * Controller of the maureillasApp
 */
angular.module('maureillasApp.main')
  .controller('MainCtrl', function ($scope, MessageService, $location, $mdSidenav, $mdUtil, CONFIG) {
  	$scope.alert = MessageService.getData();

	function onOffline() {
	    $location.path(CONFIG.VIEWS.main.pages.networkError.path);
	}

	function onOnline() {
        var message = MessageService.newMessage();
		$translate('navigation.NETWORK_OK').then(function (networkOK) {
		    var message = MessageService.newMessage();
		    message.textes = [networkOK];
    		MessageService.setMessage(message);
		}); 		
	    $location.path(CONFIG.VIEWS.main.pages.home.path);
	}

	document.addEventListener("offline", onOffline, false);
	document.addEventListener("online", onOnline, false);


    $scope.toggleLeft = buildToggler('left');
    $scope.toggleRight = buildToggler('right');

    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildToggler(navID) {
      var debounceFn =  $mdUtil.debounce(function(){
            $mdSidenav(navID)
              .toggle()
              .then(function () {
                
              });
          },300);

      return debounceFn;
    }

    $scope.menus = [];
    for(var keyView in CONFIG.VIEWS) {
      var view = CONFIG.VIEWS[keyView];
      for(var keyPage in view.pages) {
        var page = view.pages[keyPage];
        if (!page.hideMenu) {
          $scope.menus.push({
            selected : false,
            icon : page.icon,
            link : page.path,
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
    }

    var changeSelectedMenu = function(indexMenuSelected) {
      $scope.indexMenuSelected = indexMenuSelected;
      $scope.menus.forEach(function(menu) {
        menu.selected = false;
      });
      $scope.menus[indexMenuSelected].selected = true;
    }

    $scope.goTo = function (indexMenuSelected) {
        closeMenu();
        changeSelectedMenu(indexMenuSelected);
        go($scope.menus[indexMenuSelected]);
    }

    var go = function(menu) {      
      $location.url($location.path());
      if (angular.isDefined(menu.param)) {
        $location.path( menu.link ).search(menu.param);
      }
      else {
        $location.path( menu.link );
      }      
    }


});