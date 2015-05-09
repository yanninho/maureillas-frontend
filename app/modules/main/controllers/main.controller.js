'use strict';

/**
 * @ngdoc function
 * @name pbrApp.controller:SubscriptionCtrl
 * @description
 * # SubscriptionCtrl
 * Controller of the maureillasApp
 */
angular.module('maureillasApp.main')
  .controller('MainCtrl', function ($scope, MessageService, $location, $mdSidenav, $mdUtil) {
  	$scope.alert = MessageService.getData();

	function onOffline() {
	    $location.path(VIEWS.main.pages.networkError.path);
	}

	function onOnline() {
        var message = MessageService.newMessage();
		$translate('navigation.NETWORK_OK').then(function (networkOK) {
		    var message = MessageService.newMessage();
		    message.textes = [networkOK];
    		MessageService.setMessage(message);
		}); 		
	    $location.path(VIEWS.main.pages.home.path);
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

    $scope.menus = [
      {
        name : 'navigation.HOME',
        link : '/home',
        icon : 'images/ic_home_48px.svg',
        selected : false
      },
      {
        name : 'navigation.NEWS',
        link : '/feeds?feed=agenda',
        icon : 'images/ic_bookmark_48px.svg',
        selected : false
      },
      {
        name : 'navigation.EVENTS',
        link : '/feeds?feed=annonces',
        icon : 'images/ic_bookmark_48px.svg',
        selected : false
      },
      {
        name : 'navigation.NOTIFICATIONS',
        link : '/subscription',
        icon : 'images/ic_notifications_48px.svg',        
        selected : false
      }
    ]

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
    }

});