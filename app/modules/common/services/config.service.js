angular.module('maureillasApp.common')

.constant('VIEWS', {feeds:{definition:{path:'feeds'},pages:{agenda:{label:'navigation.AGENDA',path:'/feeds',templateHtml:'feeds.html',controller:'FeedsCtrl'},annonces:{label:'navigation.ANNONCES',path:'/feeds',templateHtml:'feeds.html',controller:'FeedsCtrl'}}},subscription:{definition:{path:'subscription'},pages:{subscription:{label:'navigation.SUBSCRIPTION',path:'/subscription',templateHtml:'subscription.html',controller:'SubscriptionCtrl'}}},main:{definition:{path:'main'},pages:{home:{label:'navigation.HOME',path:'/home',templateHtml:'home.html',controller:'HomeCtrl'},networkError:{label:'navigation.NETWORK_ERROR',path:'/networkError',templateHtml:'networkError.html',controller:'NetworkErrorCtrl'}}}})

.constant('FEEDS', {agenda:{url:'http://maureillas.surikwat.com/evenements/feed/'},annonces:{url:'http://maureillas.surikwat.com/category/annonces/feed/'}})

.constant('REMOTE', {googleFeedsService:{url:'http://ajax.googleapis.com/ajax/services/feed/load',method:'JSONP',params:{v:'1.0',callback:'JSON_CALLBACK'}},pushService:{GCM:{key:'904172923113'}},maureillasService:{users:{createUser:{url:'/v1/users/{ID}/{PLATFORM}',method:'PUT'},deleteUser:{url:'/v1/users/{ID}',method:'DELETE'},getUser:{url:'/v1/users/{ID}',method:'GET'},updateUser:{url:'/v1/users/{ID}',method:'POST'}},feeds:{getAll:{url:'/v1/feeds',method:'GET'}}}})

.constant('URLS', {urlBackend:'http://127.0.0.1:49166'})

;