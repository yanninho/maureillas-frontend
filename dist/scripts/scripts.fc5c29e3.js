"use strict";angular.module("maureillasApp").config(["$httpProvider","$routeProvider","$locationProvider","$translateProvider","$translatePartialLoaderProvider","VIEWS",function(a,b,c,d,e,f){c.html5Mode(!0),a.defaults.withCredentials=!0,angular.forEach(f,function(a,c){angular.forEach(a.pages,function(a,d){b.when(a.path,{templateUrl:"modules/"+c+"/views/"+a.templateHtml,controller:a.controller,resolve:{network:["$location","NetworkService","DeviceService",function(b,c,d){return a.label!=f.main.pages.networkError.label&&d.isMobile()&&!c.networkConnectionExist()?(b.path(f.main.pages.networkError.path),!1):!0}]}})})}),b.otherwise({redirectTo:f.main.pages.home.path}),e.addPart("main"),d.useLoader("$translatePartialLoader",{urlTemplate:"modules/{part}/i18n/{lang}.json"}),d.preferredLanguage("fr")}]),angular.module("maureillasApp.main",["maureillasApp.common"]),angular.module("maureillasApp.main").controller("HomeCtrl",["$scope","RegisterService",function(a,b){b.register().then(function(b){a.user=b},function(a){})}]),angular.module("maureillasApp.main").controller("MainCtrl",["$scope","MessageService","$location","$mdSidenav","$mdUtil",function(a,b,c,d,e){function f(){c.path(VIEWS.main.pages.networkError.path)}function g(){b.newMessage();$translate("navigation.NETWORK_OK").then(function(a){var c=b.newMessage();c.textes=[a],b.setMessage(c)}),c.path(VIEWS.main.pages.home.path)}function h(a){var b=e.debounce(function(){d(a).toggle().then(function(){})},300);return b}a.alert=b.getData(),document.addEventListener("offline",f,!1),document.addEventListener("online",g,!1),a.toggleLeft=h("left"),a.toggleRight=h("right"),a.menus=[{name:"navigation.HOME",link:"home",icon:"images/ic_home_48px.svg",selected:!1},{name:"navigation.NEWS",link:"feeds?feed=agenda",icon:"images/ic_bookmark_48px.svg",selected:!1},{name:"navigation.EVENTS",link:"feeds?feed=annonces",icon:"images/ic_bookmark_48px.svg",selected:!1},{name:"navigation.NOTIFICATIONS",link:"subscription",icon:"images/ic_notifications_48px.svg",selected:!1}],a.indexMenuSelected=0;var i=function(){d("right").close().then(function(){})},j=function(b){a.indexMenuSelected=b,a.menus.forEach(function(a){a.selected=!1}),a.menus[b].selected=!0};a.goTo=function(a){i(),j(a)}}]),angular.module("maureillasApp.main").controller("NetworkErrorCtrl",["$scope",function(a){}]),angular.module("maureillasApp.common",[]),angular.module("maureillasApp.common").factory("RestService",["$q","$http","TechnicalExceptionService","URLS",function(a,b,c,d){var e=a.when("start"),f=function(a,b,c,d){return a},g=function(b,c,d,e){return a.reject()},h=function(a){var b=", attendu : config { url, method } voir https://docs.angularjs.org/api/ng/service/$http";angular.isUndefined(a)&&c["new"]("objet config pour un appel Rest : [undefined]"+b),angular.isUndefined(a.url)&&c["new"]("url dans config pour un appel Rest : [undefined]"+b),angular.isUndefined(a.method)&&c["new"]("method dans config pour un appel Rest : [undefined]"+b)},i=function(a){var b=a.url;return a.backend&&(b=d.urlBackend+a.url),{url:b,method:a.method,data:a.data||"",params:a.params||void 0}};return{call:function(a){h(a);var c=i(a),d=e.then(function(){return b(c).success(f).error(g)});return d}}}]),angular.module("maureillasApp.common").factory("DeviceService",function(){var a=function(){return navigator.userAgent.match(/Android/i)},b=function(){return navigator.userAgent.match(/BlackBerry/i)},c=function(){return navigator.userAgent.match(/iPhone|iPad|iPod/i)},d=function(){return navigator.userAgent.match(/Opera Mini/i)},e=function(){return navigator.userAgent.match(/IEMobile/i)},f=function(){return a()||b()||c()||d()||e()};return{isMobile:function(){return f()}}}),angular.module("maureillasApp.common").factory("NetworkService",function(){return{networkConnectionExist:function(){var a=navigator.connection.type;return a!=Connection.NONE}}}),angular.module("maureillasApp.common").factory("TechnicalExceptionService",function(){return{"new":function(a){function b(a){this.name="TechnicalException",this.message=a}throw b.prototype=new Error,b.prototype.constructor=b,new b(a)}}}),angular.module("maureillasApp.common").factory("$exceptionHandler",["MessageService",function(a){return function(b,c){console.log(b);var d=a.newMessage();d.textes=[b.message],d.type=a.getTypesMessages().DANGER,a.setMessage(d)}}]),angular.module("maureillasApp.common").constant("VIEWS",{feeds:{definition:{path:"feeds"},pages:{agenda:{label:"navigation.AGENDA",path:"/feeds",templateHtml:"feeds.html",controller:"FeedsCtrl"},annonces:{label:"navigation.ANNONCES",path:"/feeds",templateHtml:"feeds.html",controller:"FeedsCtrl"}}},subscription:{definition:{path:"subscription"},pages:{subscription:{label:"navigation.SUBSCRIPTION",path:"/subscription",templateHtml:"subscription.html",controller:"SubscriptionCtrl"}}},main:{definition:{path:"main"},pages:{home:{label:"navigation.HOME",path:"/home",templateHtml:"home.html",controller:"HomeCtrl"},networkError:{label:"navigation.NETWORK_ERROR",path:"/networkError",templateHtml:"networkError.html",controller:"NetworkErrorCtrl"}}}}).constant("FEEDS",{agenda:{url:"http://maureillas.surikwat.com/evenements/feed/"},annonces:{url:"http://maureillas.surikwat.com/category/annonces/feed/"}}).constant("REMOTE",{googleFeedsService:{url:"http://ajax.googleapis.com/ajax/services/feed/load",method:"JSONP",params:{v:"1.0",callback:"JSON_CALLBACK"}},pushService:{GCM:{key:"904172923113"}},maureillasService:{users:{createUser:{url:"/v1/users/{ID}/{PLATFORM}",method:"PUT"},updateUser:{url:"/v1/users/{ID}",method:"POST"}},feeds:{getAll:{url:"/v1/feeds",method:"GET"}}}}).constant("URLS",{urlBackend:"http://maureillas.herokuapp.com"}),angular.module("maureillasApp.common").factory("MessageService",["$injector",function(a){var b={PRIMARY:"alert-primary",SUCCESS:"alert-success",WARNING:"alert-warning",DANGER:"alert-danger"},c={message:{textes:void 0,type:b.PRIMARY,json:!1,timestamp:5e3}};return{newMessage:function(){return{textes:void 0,type:b.PRIMARY,json:!1,timestamp:5e3}},getTypesMessages:function(){return b},getData:function(){return c},setMessage:function(d){if(!angular.isUndefined(d)&&!angular.isUndefined(d.textes)){c.message.textes=d.textes,angular.isUndefined(d.type)||(c.message.type=d.type),angular.isUndefined(d.json)||(c.message.json=d.json),angular.isUndefined(d.timestamp)||(c.message.timestamp=d.timestamp);var e=a.get("$timeout");e(function(){c.message.textes=void 0,c.message.type=b.PRIMARY,c.message.json=!1},c.message.timestamp)}}}}]),angular.module("maureillasApp.feeds",["maureillasApp.common"]).config(["$translatePartialLoaderProvider","VIEWS",function(a,b){a.addPart(b.feeds.definition.path)}]),angular.module("maureillasApp.feeds").factory("FeedListService",["RestService","REMOTE",function(a,b){var c={feeds:{}},d=function(a){console.log(a),c.feeds=a.data.responseData.feed},e=function(e,f){c.feeds={};var g=b.googleFeedsService;g.params.q=e,g.params.num=f;var h=a.call(g);return h.then(d)};return{get:c,fetchFeeds:function(a,b){return e(a,b)}}}]),angular.module("maureillasApp.feeds").controller("FeedsCtrl",["$scope","$location","FeedListService","FEEDS",function(a,b,c,d){a.feedList=c.get;var e=b.search();if(!angular.isUndefined(e.feed)){var f=e.feed;a.loading=!0;var g=c.fetchFeeds(d[f].url,10),h=function(b){a.loading=!1};g.then(h,h)}}]),angular.module("maureillasApp.subscription",["maureillasApp.common","maureillasApp.server"]).config(["$translatePartialLoaderProvider","VIEWS",function(a,b){a.addPart(b.subscription.definition.path)}]),angular.module("maureillasApp.subscription").controller("SubscriptionCtrl",["$scope","RegisterService","UserService","MessageService","$translate","$location","VIEWS",function(a,b,c,d,e,f,g){a.available=!1,a.user=c.getUser(),angular.isUndefined(a.user.info)?b.register().then(function(b){a.available=!0,a.user=b}):a.available=!0,a.update=function(){var a=c.update();a.then(function(){e("subscription.UPDATE_OK").then(function(a){var b=d.newMessage();b.type=d.getTypesMessages().SUCCESS,b.textes=[a],d.setMessage(b)})},function(a){var b=d.newMessage();b.type=d.getTypesMessages().DANGER,b.textes=[a],d.setMessage(b)})}}]),angular.module("maureillasApp.push",["maureillasApp.common","maureillasApp.server"]).config(["$translatePartialLoaderProvider",function(a){a.addPart("push")}]),angular.module("maureillasApp.push").factory("PushService",["$q","$window","REMOTE","UserService","DeviceService",function(a,b,c,d,e){var f={};return e.isMobile()&&(f="android"==device.platform||"Android"==device.platform?{senderID:c.pushService.GCM.key,ecb:"onNotificationGCM"}:{badge:"true",sound:"true",alert:"true",ecb:"onNotificationAPN"}),b.onNotificationGCM=function(a){switch(a.event){case"registered":a.regid.length>0&&d.setRegisterID(a.regid);break;case"message":if(a.foreground){console.log("INLINE NOTIFICATION");var b=new Media("/android_asset/www/"+a.soundname);b.play()}else console.log(a.coldstart?"COLDSTART NOTIFICATION":"BACKGROUND NOTIFICATION");navigator.notification.alert(a.payload.message),console.log("MESSAGE -> MSG: "+a.payload.message),console.log("MESSAGE -> MSGCNT: "+a.payload.msgcnt),console.log("MESSAGE -> TIME: "+a.payload.timeStamp);break;case"error":console.log("ERROR -> MSG:"+a.msg);break;default:console.log("EVENT -> Unknown, an event was received and we do not know what it is")}},b.successIosHandler=function(a){console.log("result = "+a)},b.onNotificationAPN=function(a){if(a.alert&&(console.log("push-notification: "+a.alert),navigator.notification.alert(a.alert)),a.sound){var b=new Media(a.sound);b.play()}a.badge&&pushNotification.setApplicationIconBadgeNumber("successIosHandler",a.badge)},{register:function(){var b=a.defer();return e.isMobile()?angular.isDefined(window.plugins)&&window.plugins.pushNotification.register(function(a){b.resolve(a)},function(a){b.reject(a)},f):b.reject("not on mobile device"),b.promise}}}]),angular.module("maureillasApp.server",["maureillasApp.common"]),angular.module("maureillasApp.server").factory("UserService",["$q","RestService","REMOTE","PlatformService",function(a,b,c,d){var e={registerID:void 0,info:void 0},f=function(){var f=e.registerID;if(angular.isDefined(f)){var g=c.maureillasService.users.createUser;g.url=g.url.replace("{ID}",f),g.url=g.url.replace("{PLATFORM}",d.getPlatform()),g.backend=!0;var h=b.call(g);return h.then(function(a){return a})}var i=a.defer();return i.reject("No Register ID"),i.promise},g=function(){{var a=c.maureillasService.users.updateUser;e.registerID}return a.url=a.url.replace("{ID}",e.info._id),a.data={feeds:e.info.feeds},a.backend=!0,b.call(a)};return{register:function(){return f()},update:function(){return g()},getRegisterID:function(){return e.registerID},setRegisterID:function(a){e.registerID=a},getUser:function(){return e}}}]),angular.module("maureillasApp.server").factory("RegisterService",["$q","UserService","PushService","DeviceService","NetworkService",function(a,b,c,d,e){var f=function(a){return a},g=function(){return b.register().then(f,function(c){if(!e.networkConnectionExist()){var d=a.defer();return d.reject("No network connection")}return angular.isUndefined(b.getRegisterID())?i():g()})},h=function(){return angular.isUndefined(b.getRegisterID())?i():g()},i=function(){if(angular.isDefined(c))return c.register().then(h,function(b){if(!e.networkConnectionExist()){var c=a.defer();c.reject("No network connection")}return i()});var b=a.defer();b.reject("No Push service")};return{register:function(){if(d.isMobile())return i();var b=a.defer();return b.resolve("Not on mobile device"),console.log("not mobile device"),b.promise}}}]),angular.module("maureillasApp.server").factory("PlatformService",function(){var a=function(){var a="";return a="android"==device.platform||"Android"==device.platform?"GOOGLE":"IOS"};return{getPlatform:function(){return a()}}});