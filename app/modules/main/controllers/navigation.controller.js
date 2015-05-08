'use strict';

/**
 * @ngdoc function
 * @name pbrApp.controller:SubscriptionCtrl
 * @description
 * # SubscriptionCtrl
 * Controller of the maureillasApp
 */
angular.module('maureillasApp.main')
  .controller('NavigationCtrl', function ($scope, MessageService, $location, $mdSidenav, $mdUtil) {
  	$scope.alert = MessageService.getData();
  	$scope.menus = [
  		{
  			name : 'navigation.NEWS',
  			link : '#/feeds?feed=agenda',
  			icon : 'images/ic_bookmark_48px.svg'
  		},
  		{
  			name : 'navigation.EVENTS',
  			link : '#/feeds?feed=annonces',
  			icon : 'images/ic_bookmark_48px.svg'
  		},
  		{
  			name : 'navigation.NOTIFICATIONS',
  			link : '#/subscription',
  			icon : 'images/ic_notifications_48px.svg'
  		}
  	]

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

    $scope.closeMenu = function () {
      $mdSidenav('right').close()
        .then(function () {
          
        });
    };    

});