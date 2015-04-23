angular.module('maureillasApp.common')

.constant('VIEWS', {feeds:{definition:{path:'feeds'},pages:{agenda:{label:'navigation.AGENDA',path:'/feeds',templateHtml:'feeds.html',controller:'FeedsCtrl'},annonces:{label:'navigation.ANNONCES',path:'/feeds',templateHtml:'feeds.html',controller:'FeedsCtrl'}}}})

.constant('FEEDS', {agenda:{url:'http://maureillas.surikwat.com/evenements/feed/'},annonces:{url:'http://maureillas.surikwat.com/category/annonces/feed/'}})

.constant('REMOTE', {googleFeedsService:{url:'http://ajax.googleapis.com/ajax/services/feed/load',method:'JSONP',params:{v:'1.0',callback:'JSON_CALLBACK'}}})

;