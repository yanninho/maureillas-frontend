angular.module('maureillasApp')

.constant('CONFIG', {VIEWS:{main:{definition:{path:'main'},pages:{home:{label:'navigation.HOME',path:'/home',templateUrl:'views/home.html',controller:'HomeCtrl',icon:'images/ic_home_48px.svg'}}},feeds:{definition:{path:'feeds'},pages:{actus:{label:'navigation.NEWS',path:'/actus',templateUrl:'views/feeds.html',controller:'FeedsCtrl',icon:'images/ic_bookmark_48px.svg'},agenda:{label:'navigation.AGENDA',path:'/agenda',templateUrl:'views/agenda.html',controller:'FeedsCtrl',icon:'images/ic_bookmark_48px.svg'},practicalNews:{label:'navigation.PRACTICAL_NEWS',path:'/practicalNews',templateUrl:'views/direct.html',controller:'FeedsCtrl',icon:'images/ic_bookmark_48px.svg',link:'http://www.maureillas.fr/s-informer-sortir-promenades-sud-de-la-france/informations-pratiques/'},historicalPatrimony:{label:'navigation.HISTORICAL_PATRIMONY',path:'/historicalPatrimony',templateUrl:'views/direct.html',controller:'FeedsCtrl',icon:'images/ic_bookmark_48px.svg',link:'http://www.maureillas.fr/decouvrir-identite-patrimoine-village-pyrenees/patrimoine-historique/'},naturalHeritage:{label:'navigation.NATURAL_HERITAGE',path:'/naturalHeritage',templateUrl:'views/direct.html',controller:'FeedsCtrl',icon:'images/ic_bookmark_48px.svg',link:'http://www.maureillas.fr/decouvrir-identite-patrimoine-village-pyrenees/patrimoine-naturel/'},accomodation:{label:'navigation.ACCOMMODATION',path:'/accomodation',templateUrl:'views/direct.html',controller:'FeedsCtrl',icon:'images/ic_bookmark_48px.svg',link:'http://www.maureillas.fr/vivre-a-maureillas/hebergement/'},restaurants:{label:'navigation.RESTAURANTS',path:'/restaurants',templateUrl:'views/direct.html',controller:'FeedsCtrl',icon:'images/ic_bookmark_48px.svg',link:'http://www.maureillas.fr/vivre-a-maureillas/restaurants-bars/'},administrativeProcedures:{label:'navigation.ADMINISTRATIVE_PROCEDURES',path:'/administrativeProcedures',templateUrl:'views/direct.html',controller:'FeedsCtrl',icon:'images/ic_bookmark_48px.svg',link:'http://www.maureillas.fr/la-mairie/guichet-des-services/'}}},parameters:{definition:{path:'parameters'},pages:{parameters:{label:'navigation.PARAMETERS',path:'/parameters',templateUrl:'views/parameters.html',controller:'ParametersCtrl',icon:'images/ic_bookmark_48px.svg'}}}},FEEDS:{agenda:{request:{url:'http://www.maureillas.fr/json-agenda/',method:'GET'}},actus:{request:{url:'http://www.maureillas.fr/json-actu/',method:'GET'}},practicalNews:{request:{url:'http://www.maureillas.fr/flux/',method:'GET',params:{id:'318'}}},historicalPatrimony:{request:{url:'http://www.maureillas.fr/flux/',method:'GET',params:{id:'3160'}}},naturalHeritage:{request:{url:'http://www.maureillas.fr/flux/',method:'GET',params:{id:'3162'}}},accomodation:{request:{url:'http://www.maureillas.fr/flux/',method:'GET',params:{id:'86'}}},restaurants:{request:{url:'http://www.maureillas.fr/flux/',method:'GET',params:{id:'88'}}},administrativeProcedures:{request:{url:'http://www.maureillas.fr/flux/',method:'GET',params:{id:'66'}}}},REMOTE:{googleFeedsService:{url:'http://ajax.googleapis.com/ajax/services/feed/load',method:'JSONP',params:{v:'1.0',callback:'JSON_CALLBACK'}},pushService:{GCM:{key:'904172923113'}},maureillasService:{users:{createUser:{url:'/v1/users',method:'PUT'},updateUser:{url:'/v1/users/{ID}',method:'POST'}},feeds:{getAll:{url:'/v1/feeds',method:'GET'}}}},URLS:{DEVELOPMENT:{urlBackend:'http://127.0.0.1:49166',security:'f4P8I3CcCYoT15j6V2V1vn4NCRDIc5Rb'},TEST:{urlBackend:'http://localhost:49156',security:'2LG5D0Ge0Lk31nrE3FN1J1EpqgzVpJzC'},PRODUCTION:{urlBackend:'http://maureillas.herokuapp.com',security:'dvZ3UA6BqgUsLrP82Kj5bDCu6jcsDZ35'}}})

.constant('URLS', {urlBackend:'http://maureillas.herokuapp.com',security:'dvZ3UA6BqgUsLrP82Kj5bDCu6jcsDZ35'})

;