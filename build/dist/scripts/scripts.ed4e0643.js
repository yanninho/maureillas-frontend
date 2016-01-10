"use strict";angular.module("maureillasApp",["pascalprecht.translate","ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngMaterial","ngCordova","maureillasAppTemplates","ngIOS9UIWebViewPatch","angular-cache"]).config(["$routeProvider","CONFIG","$translateProvider","$translatePartialLoaderProvider",function(a,b,c,d){angular.forEach(b.VIEWS,function(b,c){angular.forEach(b.pages,function(b,c){a.when(b.path,{templateUrl:b.templateUrl,controller:b.controller})})}),a.otherwise({redirectTo:b.VIEWS.main.pages.home.path}),c.preferredLanguage("fr"),d.addPart("main"),c.useLoader("$translatePartialLoader",{urlTemplate:"i18n/{lang}-{part}.json"})}]),angular.module("maureillasApp").controller("FeedsCtrl",["$scope","$location","FeedList","CONFIG","messages",function(a,b,c,d,e){console.log("feedsCtrl"),a.feedList=c.get;var f=b.path().substring(1,b.path().length);if(console.log(f),!angular.isUndefined(f)){var g=f;a.title=d.VIEWS.feeds.pages[g].label,a.loading=!0;var h=c.fetchFeeds(g,10),i=function(b){a.loading=!1},j=function(b){a.loading=!1,e.setError("Erreur de communication réseau. Vérifiez votre connexion.")};h.then(i,j)}}]),angular.module("maureillasApp").controller("HomeCtrl",function(){}),angular.module("maureillasApp").controller("MainCtrl",["$scope","messages","$mdSidenav","CONFIG","menu",function(a,b,c,d,e){a.alert=b.getData(),a.toggleMenu=function(){c("right").toggle().then(function(){})},a.menus=[];for(var f in d.VIEWS){var g=d.VIEWS[f];for(var h in g.pages){var i=g.pages[h];i.hideMenu||a.menus.push({selected:!1,icon:i.icon,path:i.path,name:i.label,param:i.param})}}a.indexMenuSelected=0;var j=function(){c("right").close().then(function(){})},k=function(b){a.indexMenuSelected=b,a.menus.forEach(function(a){a.selected=!1}),a.menus[b].selected=!0};a.goTo=function(b){j(),k(b),l(a.menus[b])},a.quitApp=function(){document.addEventListener("deviceready",function(){navigator.app.exitApp()})};var l=function(a){e.go(a)}}]),angular.module("maureillasApp").controller("ParametersCtrl",["$rootScope","$scope","$push","users","messages","CONFIG",function(a,b,c,d,e,f){b.loading=!1,b.config=f,b.user=d.getUser,document.addEventListener("deviceready",function(){angular.isUndefined(b.user().info)&&(b.loading=!0,c.processPush(a).then(function(a){b.loading=!1},function(a){b.loading=!1}))}),b.update=function(){var a=d.update();a.then(function(){var a=e.newMessage();a.type=e.getTypesMessages().SUCCESS,a.textes=["Information mise à jour"],e.setMessage(a)},function(a){var b=e.newMessage();b.type=e.getTypesMessages().DANGER,b.textes=[a],e.setMessage(b)})}}]),angular.module("maureillasApp").controller("PushCtrl",["$rootScope","$scope","$push",function(a,b,c){document.addEventListener("deviceready",function(){c.processPush(a).then(function(a){},function(a){})})}]),angular.module("maureillasApp").filter("rssdate",function(){return function(a,b){var c=moment(a);return c.locale("fr").format("dddd D MMMM YYYY")}}),angular.module("ngIOS9UIWebViewPatch",["ng"]).config(["$provide",function(a){a.decorator("$browser",["$delegate","$window",function(a,b){function c(a){return/(iPhone|iPad|iPod).* OS 9_\d/.test(a)&&!/Version\/9\./.test(a)}function d(a){function b(){c=null}var c=null,d=a.url;return a.url=function(){return arguments.length?(c=arguments[0],d.apply(a,arguments)):c||d.apply(a,arguments)},window.addEventListener("popstate",b,!1),window.addEventListener("hashchange",b,!1),a}return c(b.navigator.userAgent)?d(a):a}])}]),angular.module("maureillasApp").factory("android",["CONFIG",function(a){var b={senderID:a.REMOTE.pushService.GCM.key},c=null,d=null;return{config:function(){return b},registeredSuccess:function(a){console.log(a)},setWhenRegistered:function(a){c=a},setWhenMessageReceived:function(a){d=a},notificationReceived:function(a,b){switch(b.event){case"registered":b.regid.length>0&&c(b.regid);break;case"message":d(b);break;case"error":alert("GCM error = "+b.msg);break;default:alert("An unknown GCM event has occurred")}}}}]),angular.module("maureillasApp").constant("CONFIG",{VIEWS:{main:{definition:{path:"main"},pages:{home:{label:"navigation.HOME",path:"/home",templateHtml:"home.html",controller:"HomeCtrl",icon:"images/ic_home_48px.svg"}}},feeds:{definition:{path:"feeds"},pages:{actus:{label:"navigation.NEWS",path:"/actus",templateHtml:"feeds.html",controller:"FeedsCtrl",icon:"images/ic_bookmark_48px.svg"},agenda:{label:"navigation.AGENDA",path:"/agenda",templateHtml:"agenda.html",controller:"FeedsCtrl",icon:"images/ic_bookmark_48px.svg"},practicalNews:{label:"navigation.PRACTICAL_NEWS",path:"/practicalNews",templateHtml:"direct.html",controller:"FeedsCtrl",icon:"images/ic_bookmark_48px.svg"},historicalPatrimony:{label:"navigation.HISTORICAL_PATRIMONY",path:"/historicalPatrimony",templateHtml:"direct.html",controller:"FeedsCtrl",icon:"images/ic_bookmark_48px.svg"},naturalHeritage:{label:"navigation.NATURAL_HERITAGE",path:"/naturalHeritage",templateHtml:"direct.html",controller:"FeedsCtrl",icon:"images/ic_bookmark_48px.svg"},accomodation:{label:"navigation.ACCOMMODATION",path:"/accomodation",templateHtml:"direct.html",controller:"FeedsCtrl",icon:"images/ic_bookmark_48px.svg"},restaurants:{label:"navigation.RESTAURANTS",path:"/restaurants",templateHtml:"direct.html",controller:"FeedsCtrl",icon:"images/ic_bookmark_48px.svg"},administrativeProcedures:{label:"navigation.ADMINISTRATIVE_PROCEDURES",path:"/administrativeProcedures",templateHtml:"direct.html",controller:"FeedsCtrl",icon:"images/ic_bookmark_48px.svg"}}},parameters:{definition:{path:"parameters"},pages:{parameters:{label:"Paramètres",path:"/parameters",templateUrl:"views/parameters.html",controller:"ParametersCtrl",icon:"images/ic_bookmark_48px.svg"}}}},FEEDS:{agenda:{url:"http://www.maureillas.fr/evenements/feed/"},actus:{url:"http://www.maureillas.fr/category/mobile/feed/"},practicalNews:{request:{url:"http://www.maureillas.fr/flux/",method:"GET",params:{id:"318"}}},historicalPatrimony:{request:{url:"http://www.maureillas.fr/flux/",method:"GET",params:{id:"110"}}},naturalHeritage:{request:{url:"http://www.maureillas.fr/flux/",method:"GET",params:{id:"116"}}},accomodation:{request:{url:"http://www.maureillas.fr/flux/",method:"GET",params:{id:"86"}}},restaurants:{request:{url:"http://www.maureillas.fr/flux/",method:"GET",params:{id:"88"}}},administrativeProcedures:{request:{url:"http://www.maureillas.fr/flux/",method:"GET",params:{id:"66"}}}},REMOTE:{googleFeedsService:{url:"http://ajax.googleapis.com/ajax/services/feed/load",method:"JSONP",params:{v:"1.0",callback:"JSON_CALLBACK"}},pushService:{GCM:{key:"904172923113"}},maureillasService:{users:{createUser:{url:"/v1/users",method:"PUT"},updateUser:{url:"/v1/users/{ID}",method:"POST"}},feeds:{getAll:{url:"/v1/feeds",method:"GET"}}}},URLS:{DEVELOPMENT:{urlBackend:"http://127.0.0.1:49166",security:"f4P8I3CcCYoT15j6V2V1vn4NCRDIc5Rb"},TEST:{urlBackend:"http://localhost:49156",security:"2LG5D0Ge0Lk31nrE3FN1J1EpqgzVpJzC"},PRODUCTION:{urlBackend:"http://maureillas.herokuapp.com",security:"dvZ3UA6BqgUsLrP82Kj5bDCu6jcsDZ35"}}}).constant("URLS",{urlBackend:"http://maureillas.herokuapp.com",security:"dvZ3UA6BqgUsLrP82Kj5bDCu6jcsDZ35"}),angular.module("maureillasApp").factory("$exceptionHandler",["messages",function(a){return function(b,c){console.log(b);var d=a.newMessage();d.textes=[b.message],d.type=a.getTypesMessages().DANGER,a.setMessage(d)}}]),angular.module("maureillasApp").factory("FeedList",["rest","CacheFactory","CONFIG",function(a,b,c){var d=function(){return b.get("feeds")||b.createCache("feeds",{storageMode:"localStorage"}),b.get("feeds")},e={},f=d(),g="",h=function(a){f.put(g,a)},i=function(){angular.isDefined(f.get(g))&&(e=f.get(g))},j=function(a,b){var d=c.REMOTE.googleFeedsService;return d.params.q=a.url,d.params.num=b,d},k=function(a){var b=a.request;return b},l=function(a){e=a.data.responseData.feed,h(e)},m=function(a){e=a.data,h(e)},n=function(b,d){g=b,i();var h=c.FEEDS[b],n={},o=null;angular.isUndefined(h.request)?(n=j(h,d),o=l):(n=k(h),o=m);var p=a.call(n);return p.then(o,function(){angular.isUndefined(f.get(g))&&(e={})})};return{get:function(){return e},fetchFeeds:function(a,b){return n(a,b)}}}]),angular.module("maureillasApp").factory("feeds",["rest","CONFIG",function(a,b){var c=function(){var c=b.REMOTE.maureillasService.feeds.getAll;c.backend=!0;var d=a.call(c);return d.then(function(a){return a}),d};return{getAll:function(){return c()}}}]),angular.module("maureillasApp").factory("ios",["$cordovaPush",function(a){var b={badge:!0,sound:!0,alert:!0},c=null,d=null;return{config:function(){return b},registeredSuccess:function(a){c(a)},setWhenRegistered:function(a){c=a},setWhenMessageReceived:function(a){d=a},notificationReceived:function(b,c){if(c.alert&&navigator.notification.alert(c.alert),c.sound){var e=new Media(b.sound);e.play()}c.badge&&a.setBadgeNumber(c.badge).then(function(a){},function(a){}),d(c)}}}]),angular.module("maureillasApp").factory("menu",["$location","_","CONFIG",function(a,b,c){return{go:function(b){a.url(a.path()),angular.isDefined(b.param)?a.path(b.path).search(b.param):a.path(b.path)},find:function(a){var b=c.VIEWS.feeds.pages.actualites;return b}}}]),angular.module("maureillasApp").factory("messages",["$injector",function(a){var b={PRIMARY:"alert-primary",SUCCESS:"alert-success",WARNING:"alert-warning",DANGER:"alert-danger"},c={message:{textes:void 0,type:b.PRIMARY,json:!1,timestamp:5e3}},d=function(d,e,f){c.message.type=d,c.message.textes=[e];var g=a.get("$timeout");g(function(){c.message.textes=void 0,c.message.type=b.PRIMARY,c.message.json=!1},c.message.timestamp)};return{newMessage:function(){return{textes:void 0,type:b.PRIMARY,json:!1,timestamp:5e3}},getTypesMessages:function(){return b},getData:function(){return c},setMessage:function(d){if(!angular.isUndefined(d)&&!angular.isUndefined(d.textes)){c.message.textes=d.textes,angular.isUndefined(d.type)||(c.message.type=d.type),angular.isUndefined(d.json)||(c.message.json=d.json),angular.isUndefined(d.timestamp)||(c.message.timestamp=d.timestamp);var e=a.get("$timeout");e(function(){c.message.textes=void 0,c.message.type=b.PRIMARY,c.message.json=!1},c.message.timestamp)}},setSuccess:function(a){d(b.SUCCESS,a,5e3)},setError:function(a){d(b.DANGER,a,5e3)}}}]),angular.module("maureillasApp").factory("platforms",["ios","android",function(a,b){var c=function(){return"android"===device.platform||"Android"===device.platform},d=function(){var d=a;return c()&&(d=b),d},e=function(){var a="";return a=c()?"GOOGLE":"IOS"};return{getPlatform:function(){return e()},getService:function(){return d()},isGoogle:function(){return"GOOGLE"===e()},isIos:function(){return"IOS"===e()}}}]),angular.module("maureillasApp").factory("$push",["$q","$cordovaPush","$cordovaDialogs","platforms","users","menu","messages",function(a,b,c,d,e,f,g){var h=function(g){var h=a.defer(),i=d.getService();return i.setWhenMessageReceived(function(a){c.confirm("Voulez-vous ouvrir la rubrique actualités ?","Nouvel article disponible",["Oui","Non"]).then(function(b){if(1===b){var c=a.payload.category,d=f.find(c);f.go(d)}})}),i.setWhenRegistered(function(a){e.register(a).then(function(a){h.resolve("registered OK")},function(a){h.reject(a)})}),b.register(i.config()).then(i.registeredSuccess,function(a){h.reject(a)}),g.$on("$cordovaPush:notificationReceived",i.notificationReceived),h.promise};return{processPush:function(a){return h(a)}}}]),angular.module("maureillasApp").factory("rest",["$q","$http","technicalException","URLS",function(a,b,c,d){var e=a.when("start"),f=function(a,b,c,d){return a},g=function(b,c,d,e){return a.reject()},h=function(a){var b=", attendu : config { url, method } voir https://docs.angularjs.org/api/ng/service/$http";angular.isUndefined(a)&&c["new"]("objet config pour un appel Rest : [undefined]"+b),angular.isUndefined(a.url)&&c["new"]("url dans config pour un appel Rest : [undefined]"+b),angular.isUndefined(a.method)&&c["new"]("method dans config pour un appel Rest : [undefined]"+b)},i=function(a){var b=a.url;return a.backend&&(b=d.urlBackend+a.url),{url:b,cache:!0,method:a.method,data:a.data||"",params:a.params||void 0,headers:{Authorization:"Basic key:"+d.security}}};return{call:function(a){h(a);var c=i(a),d=e.then(function(){return b(c).success(f).error(g)});return d}}}]),angular.module("maureillasApp").factory("technicalException",function(){return{"new":function(a){function b(a){this.name="TechnicalException",this.message=a}throw b.prototype=new Error,b.prototype.constructor=b,new b(a)}}}),angular.module("maureillasApp").factory("_",["$window",function(a){return a._}]),angular.module("maureillasApp").factory("users",["$q","rest","platforms","CONFIG",function(a,b,c,d){var e={registerID:void 0,info:void 0},f=0,g=function(h){if(f++,angular.isDefined(h)){e.registerID=h;var i=d.REMOTE.maureillasService.users.createUser;i.data={user:{id:h,platform:c.getPlatform()}},i.backend=!0;var j=b.call(i);return j.then(function(a){return f=0,e.info=a.data,e.info},function(a){11>f&&g(h)})}var k=a.defer();return k.reject("No Register ID"),k.promise},h=function(){var a=d.REMOTE.maureillasService.users.updateUser;return a.url=a.url.replace("{ID}",e.info._id),a.data={feeds:e.info.feeds},a.backend=!0,b.call(a)};return{register:function(a){return g(a)},update:function(){return h()},getRegisterID:function(){return e.registerID},setRegisterID:function(a){e.registerID=a},getUser:function(){return e}}}]),angular.module("maureillasAppTemplates",[]).run(["$templateCache",function(a){a.put("views/agenda.html",'<div layout="column" class="feeds"> <md-whiteframe class="md-whiteframe-z2 title-page" flex> <h1>{{title | translate}}</h1> </md-whiteframe> <div layout="row" flex layout-align="center center" ng-show="loading"> <div> <md-progress-circular md-mode="indeterminate" md-diameter="40"></md-progress-circular> </div> </div> <div layout="row" flex layout-align="center center" ng-show="feedList().entries.length == 0 && !loading"> <p>{{\'EMPTY\' | translate}}</p> </div> <md-whiteframe flex class="md-whiteframe-z2 feed" ng-repeat="feed in feedList().entries" ng-hide="loading"> <md-toolbar> <div class="md-toolbar-tools"> <h3 class="md-flex">{{feed.publishedDate |rssdate : \'medium\'}} - {{feed.title}}</h3> </div> </md-toolbar> <div class="feed-content" ng-bind-html="feed.content"></div> </md-whiteframe> </div>'),a.put("views/direct.html",'<div layout="column" class="feeds"> <md-whiteframe class="md-whiteframe-z2 title-page" flex> <h1>{{title | translate}}</h1> </md-whiteframe> <div layout="row" flex layout-align="center center" ng-show="loading"> <div> <md-progress-circular md-mode="indeterminate" md-diameter="40"></md-progress-circular> </div> </div> <md-whiteframe flex ng-hide="loading"> <div class="feed-content" ng-bind-html="feedList()"></div> </md-whiteframe> </div>'),a.put("views/feeds.html",'<div layout="column" class="feeds"> <md-whiteframe class="md-whiteframe-z2 title-page" flex> <h1>{{title | translate}}</h1> </md-whiteframe> <div layout="row" flex layout-align="center center" ng-show="loading"> <div> <md-progress-circular md-mode="indeterminate" md-diameter="40"></md-progress-circular> </div> </div> <md-whiteframe flex class="md-whiteframe-z2 feed" ng-repeat="feed in feedList().entries" ng-hide="loading"> <md-toolbar> <div class="md-toolbar-tools"> <h3 class="md-flex">{{feed.title}}</h3> </div> </md-toolbar> <div class="feed-content" ng-bind-html="feed.content"></div> </md-whiteframe> </div>'),a.put("views/home.html","<h1></h1>"),a.put("views/parameters.html",'<div class="parameters" layout="column" layout-fill> <md-whiteframe class="md-whiteframe-z2 title-page" flex> <h1>{{\'PARAMETERS.WantNotifs\' | translate}}</h1> </md-whiteframe> <div layout="row" flex layout-align="center center" ng-show="loading"> <div> <md-progress-circular md-mode="indeterminate" class="md-warn" md-diameter="40"></md-progress-circular> </div> </div> <md-list> <md-list-item class="md-whiteframe-z2 feed-subscription" layout="row" ng-repeat="feed in user().info.feeds" ng-hide="loading"> <div flex-sm="80" flex-gt-sm="90" align="left center"> {{feed.name | translate}} </div> <div flex="20" flex-gt-sm="10"> <md-switch ng-model="feed.suscriber" ng-change="update()" aria-label="{{feed.name}}"></md-switch> </div> </md-list-item> </md-list> </div>')}]);