angular.module('maureillasApp.common')

.constant('VIEWS', {feeds:{definition:{path:'feeds'},pages:{agenda:{label:'navigation.AGENDA',path:'/feeds',templateHtml:'feeds.html',controller:'FeedsCtrl'},annonces:{label:'navigation.ANNONCES',path:'/feeds',templateHtml:'feeds.html',controller:'FeedsCtrl'}}},subscription:{definition:{path:'subscription'},pages:{subscription:{label:'navigation.SUBSCRIPTION',path:'/subscription',templateHtml:'subscription.html',controller:'SubscriptionCtrl'}}},main:{definition:{path:'main'},pages:{home:{label:'navigation.HOME',path:'/home',templateHtml:'home.html',controller:'HomeCtrl'},networkError:{label:'navigation.NETWORK_ERROR',path:'/networkError',templateHtml:'networkError.html',controller:'NetworkErrorCtrl'}}}})

.constant('FEEDS', {agenda:{url:'http://maureillas.surikwat.com/evenements/feed/',title:'agenda'},annonces:{url:'http://maureillas.surikwat.com/category/annonces/feed/',title:'annonces'}})

.constant('REMOTE', {googleFeedsService:{url:'http://ajax.googleapis.com/ajax/services/feed/load',method:'JSONP',params:{v:'1.0',callback:'JSON_CALLBACK'}},pushService:{GCM:{key:'904172923113'}},maureillasService:{users:{createUser:{url:'/v1/users',method:'PUT'},updateUser:{url:'/v1/users/{ID}',method:'POST'}},feeds:{getAll:{url:'/v1/feeds',method:'GET'}}}})

.constant('URLS', {urlBackend:'http://maureillas.herokuapp.com',security:'dvZ3UA6BqgUsLrP82Kj5bDCu6jcsDZ35'})

;