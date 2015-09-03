angular.module('maureillasApp.common')

.constant('CONFIG', {VIEWS:{main:{definition:{path:'main'},pages:{home:{label:'navigation.HOME',path:'/home',templateHtml:'home.html',controller:'HomeCtrl',icon:'images/ic_home_48px.svg'},networkError:{label:'navigation.NETWORK_ERROR',path:'/networkError',templateHtml:'networkError.html',controller:'NetworkErrorCtrl',hideMenu:true}}},feeds:{definition:{path:'feeds'},pages:{actus:{label:'navigation.NEWS',path:'/actus',templateHtml:'feeds.html',controller:'FeedsCtrl',icon:'images/ic_bookmark_48px.svg'},agenda:{label:'navigation.AGENDA',path:'/agenda',templateHtml:'agenda.html',controller:'FeedsCtrl',icon:'images/ic_bookmark_48px.svg'},practicalNews:{label:'navigation.PRACTICAL_NEWS',path:'/practicalNews',templateHtml:'direct.html',controller:'FeedsCtrl',icon:'images/ic_bookmark_48px.svg'},historicalPatrimony:{label:'navigation.HISTORICAL_PATRIMONY',path:'/historicalPatrimony',templateHtml:'direct.html',controller:'FeedsCtrl',icon:'images/ic_bookmark_48px.svg'},naturalHeritage:{label:'navigation.NATURAL_HERITAGE',path:'/naturalHeritage',templateHtml:'direct.html',controller:'FeedsCtrl',icon:'images/ic_bookmark_48px.svg'},accomodation:{label:'navigation.ACCOMMODATION',path:'/accomodation',templateHtml:'direct.html',controller:'FeedsCtrl',icon:'images/ic_bookmark_48px.svg'},restaurants:{label:'navigation.RESTAURANTS',path:'/restaurants',templateHtml:'direct.html',controller:'FeedsCtrl',icon:'images/ic_bookmark_48px.svg'},market:{label:'navigation.MARKET',path:'/market',templateHtml:'direct.html',controller:'FeedsCtrl',icon:'images/ic_bookmark_48px.svg'},administrativeProcedures:{label:'navigation.ADMINISTRATIVE_PROCEDURES',path:'/administrativeProcedures',templateHtml:'direct.html',controller:'FeedsCtrl',icon:'images/ic_bookmark_48px.svg'}}},subscription:{definition:{path:'subscription'},pages:{subscription:{label:'navigation.SUBSCRIPTION',path:'/subscription',templateHtml:'subscription.html',controller:'SubscriptionCtrl',icon:'images/ic_bookmark_48px.svg'}}}},FEEDS:{agenda:{url:'http://www.maureillas.fr/evenements/feed/'},actus:{url:'http://www.maureillas.fr/category/mobile/feed/'},practicalNews:{request:{url:'http://www.maureillas.fr/flux/',method:'GET',params:{id:'318'}}},historicalPatrimony:{request:{url:'http://www.maureillas.fr/flux/',method:'GET',params:{id:'110'}}},naturalHeritage:{request:{url:'http://www.maureillas.fr/flux/',method:'GET',params:{id:'116'}}},accomodation:{request:{url:'http://www.maureillas.fr/flux/',method:'GET',params:{id:'86'}}},restaurants:{request:{url:'http://www.maureillas.fr/flux/',method:'GET',params:{id:'88'}}},market:{request:{url:'http://www.maureillas.fr/flux/',method:'GET',params:{id:'90'}}},administrativeProcedures:{request:{url:'http://www.maureillas.fr/flux/',method:'GET',params:{id:'66'}}}},REMOTE:{googleFeedsService:{url:'http://ajax.googleapis.com/ajax/services/feed/load',method:'JSONP',params:{v:'1.0',callback:'JSON_CALLBACK'}},pushService:{GCM:{key:'904172923113'}},maureillasService:{users:{createUser:{url:'/v1/users',method:'PUT'},updateUser:{url:'/v1/users/{ID}',method:'POST'}},feeds:{getAll:{url:'/v1/feeds',method:'GET'}}}},URLS:{DEVELOPMENT:{urlBackend:'http://127.0.0.1:49166',security:'f4P8I3CcCYoT15j6V2V1vn4NCRDIc5Rb'},TEST:{urlBackend:'http://localhost:49156',security:'2LG5D0Ge0Lk31nrE3FN1J1EpqgzVpJzC'},PRODUCTION:{urlBackend:'http://maureillas.herokuapp.com',security:'dvZ3UA6BqgUsLrP82Kj5bDCu6jcsDZ35'}}})

.constant('URLS', {urlBackend:'http://maureillas.herokuapp.com',security:'dvZ3UA6BqgUsLrP82Kj5bDCu6jcsDZ35'})

;