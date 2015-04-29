angular.module('maureillasApp.common')

.constant('VIEWS', {feeds:{definition:{path:'feeds'},pages:{agenda:{label:'navigation.AGENDA',path:'/feeds',templateHtml:'feeds.html',controller:'FeedsCtrl'},annonces:{label:'navigation.ANNONCES',path:'/feeds',templateHtml:'feeds.html',controller:'FeedsCtrl'}}}})

.constant('FEEDS', {agenda:{url:'http://maureillas.surikwat.com/evenements/feed/'},annonces:{url:'http://maureillas.surikwat.com/category/annonces/feed/'}})

.constant('REMOTE', {googleFeedsService:{url:'http://ajax.googleapis.com/ajax/services/feed/load',method:'JSONP',params:{v:'1.0',callback:'JSON_CALLBACK'}},pushService:{GCM:{key:'AIzaSyAvNezKfuDi-fa80rVLdlYskgQrNjCxEtw'}},maureillasService:{users:{createUser:{url:'/users/{ID}/{PLATFORM}',method:'PUT'},deleteUser:{url:'/users/{ID}',method:'DELETE'},getUser:{url:'/users/{ID}',method:'GET'},updateUser:{url:'/users/{ID}',method:'POST'}}}})

.constant('URLS', {urlBackend:'http://localhost:49162'})

;