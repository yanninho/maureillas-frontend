angular.module('maureillasApp.common')

.constant('VIEWS', {feeds:{definition:{path:'feeds'},pages:{agenda:{label:'navigation.AGENDA',path:'/feeds',templateHtml:'feeds.html',controller:'FeedsCtrl'},annonces:{label:'navigation.ANNONCES',path:'/feeds',templateHtml:'feeds.html',controller:'FeedsCtrl'}}}})

.constant('FEEDS', {agenda:{url:'http://maureillas.surikwat.com/evenements/feed/'},annonces:{url:'http://maureillas.surikwat.com/category/annonces/feed/'}})

.constant('REMOTE', {googleFeedsService:{url:'http://ajax.googleapis.com/ajax/services/feed/load',method:'JSONP',params:{v:'1.0',callback:'JSON_CALLBACK'}},pushService:{GCM:{key:'904172923113'}},maureillasService:{users:{createUser:{url:'/v1/users/{ID}/{PLATFORM}',method:'PUT'},deleteUser:{url:'/v1/users/{ID}',method:'DELETE'},getUser:{url:'/v1/users/{ID}',method:'GET'},updateUser:{url:'/v1/users/{ID}',method:'POST'}}}})

.constant('URLS', {urlBackend:'http://key:dvZ3UA6BqgUsLrP82Kj5bDCu6jcsDZ35@maureillas.herokuapp.com'})

;