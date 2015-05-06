"use strict";angular.module("maureillasApp").config(["$httpProvider","$routeProvider","$locationProvider","$translateProvider","$translatePartialLoaderProvider","VIEWS",function(a,b,c,d,e,f){a.defaults.withCredentials=!0,angular.forEach(f,function(a,c){angular.forEach(a.pages,function(a,d){b.when(a.path,{templateUrl:"modules/"+c+"/views/"+a.templateHtml,controller:a.controller,resolve:{network:["$location","NetworkService","DeviceService",function(b,c,d){return a.label!=f.main.pages.networkError.label&&d.isMobile()&&!c.networkConnectionExist()?(b.path(f.main.pages.networkError.path),!1):!0}]}})})}),b.otherwise({redirectTo:f.main.pages.home.path}),e.addPart("main"),d.useLoader("$translatePartialLoader",{urlTemplate:"modules/{part}/i18n/{lang}.json"}),d.preferredLanguage("fr")}]),angular.module("maureillasApp.main",["maureillasApp.common"]),angular.module("maureillasApp.main").controller("HomeCtrl",["$scope","RegisterService",function(a,b){b.registerAndStore().then(function(b){a.user=b},function(a){alert(a)})}]),angular.module("maureillasApp.main").controller("NavigationCtrl",["$scope","MessageService","$location",function(a,b,c){function d(){c.path(VIEWS.main.pages.networkError.path)}function e(){b.newMessage();$translate("navigation.NETWORK_OK").then(function(a){var c=b.newMessage();c.textes=[a],b.setMessage(c)}),c.path(VIEWS.main.pages.home.path)}a.data=b.getData(),document.addEventListener("offline",d,!1),document.addEventListener("online",e,!1)}]),angular.module("maureillasApp.main").controller("NetworkErrorCtrl",["$scope",function(a){}]),angular.module("maureillasApp.common",[]),angular.module("maureillasApp.common").factory("RestService",["$q","$http","TechnicalExceptionService","URLS",function(a,b,c,d){var e=a.when("start"),f=function(a,b,c,d){return a},g=function(b,c,d,e){return a.reject()},h=function(a){var b=", attendu : config { url, method } voir https://docs.angularjs.org/api/ng/service/$http";angular.isUndefined(a)&&c["new"]("objet config pour un appel Rest : [undefined]"+b),angular.isUndefined(a.url)&&c["new"]("url dans config pour un appel Rest : [undefined]"+b),angular.isUndefined(a.method)&&c["new"]("method dans config pour un appel Rest : [undefined]"+b)},i=function(a){var b=a.url;return a.backend&&(b=d.urlBackend+a.url),{url:b,method:a.method,data:a.data||"",params:a.params||void 0}};return{call:function(a){h(a);var c=i(a),d=e.then(function(){return b(c).success(f).error(g)});return d}}}]),angular.module("maureillasApp.common").factory("DeviceService",function(){var a=function(){return navigator.userAgent.match(/Android/i)},b=function(){return navigator.userAgent.match(/BlackBerry/i)},c=function(){return navigator.userAgent.match(/iPhone|iPad|iPod/i)},d=function(){return navigator.userAgent.match(/Opera Mini/i)},e=function(){return navigator.userAgent.match(/IEMobile/i)},f=function(){return a()||b()||c()||d()||e()};return{isMobile:function(){return f()}}}),angular.module("maureillasApp.common").factory("NetworkService",function(){return{networkConnectionExist:function(){var a=navigator.connection.type;return a!=Connection.NONE}}}),angular.module("maureillasApp.common").factory("TechnicalExceptionService",function(){return{"new":function(a){function b(a){this.name="TechnicalException",this.message=a}throw b.prototype=new Error,b.prototype.constructor=b,new b(a)}}}),angular.module("maureillasApp.common").factory("$exceptionHandler",["MessageService",function(a){return function(a,b){alert(a)}}]),angular.module("maureillasApp.common").constant("VIEWS",{feeds:{definition:{path:"feeds"},pages:{agenda:{label:"navigation.AGENDA",path:"/feeds",templateHtml:"feeds.html",controller:"FeedsCtrl"},annonces:{label:"navigation.ANNONCES",path:"/feeds",templateHtml:"feeds.html",controller:"FeedsCtrl"}}},subscription:{definition:{path:"subscription"},pages:{subscription:{label:"navigation.SUBSCRIPTION",path:"/subscription",templateHtml:"subscription.html",controller:"SubscriptionCtrl"}}},main:{definition:{path:"main"},pages:{home:{label:"navigation.HOME",path:"/home",templateHtml:"home.html",controller:"HomeCtrl"},networkError:{label:"navigation.NETWORK_ERROR",path:"/networkError",templateHtml:"networkError.html",controller:"NetworkErrorCtrl"}}}}).constant("FEEDS",{agenda:{url:"http://maureillas.surikwat.com/evenements/feed/"},annonces:{url:"http://maureillas.surikwat.com/category/annonces/feed/"}}).constant("REMOTE",{googleFeedsService:{url:"http://ajax.googleapis.com/ajax/services/feed/load",method:"JSONP",params:{v:"1.0",callback:"JSON_CALLBACK"}},pushService:{GCM:{key:"904172923113"}},maureillasService:{users:{createUser:{url:"/v1/users/{ID}/{PLATFORM}",method:"PUT"},deleteUser:{url:"/v1/users/{ID}",method:"DELETE"},getUser:{url:"/v1/users/{ID}",method:"GET"},updateUser:{url:"/v1/users/{ID}",method:"POST"}},feeds:{getAll:{url:"/v1/feeds",method:"GET"}}}}).constant("URLS",{urlBackend:"http://maureillas.herokuapp.com"}),angular.module("maureillasApp.common").factory("MessageService",["$injector",function(a){var b={PRIMARY:"alert-primary",SUCCESS:"alert-success",WARNING:"alert-warning",DANGER:"alert-danger",BOUYGUES:"alert-bouygues"},c={message:{textes:void 0,type:b.PRIMARY,json:!1,timestamp:5e3}};return{newMessage:function(){return{textes:void 0,type:b.PRIMARY,json:!1,timestamp:5e3}},getTypesMessages:function(){return b},getData:function(){return c},setMessage:function(d){if(!angular.isUndefined(d)&&!angular.isUndefined(d.textes)){c.message.textes=d.textes,angular.isUndefined(d.type)||(c.message.type=d.type),angular.isUndefined(d.json)||(c.message.json=d.json),angular.isUndefined(d.timestamp)||(c.message.timestamp=d.timestamp);var e=a.get("$timeout");e(function(){c.message.textes=void 0,c.message.type=b.PRIMARY,c.message.json=!1},c.message.timestamp)}}}}]),angular.module("maureillasApp.feeds",["maureillasApp.common"]).config(["$translatePartialLoaderProvider","VIEWS",function(a,b){a.addPart(b.feeds.definition.path)}]),angular.module("maureillasApp.feeds").factory("FeedListService",["RestService","REMOTE",function(a,b){var c={feeds:{}},d=function(a){console.log(a),c.feeds=a.data.responseData.feed},e=function(c,e){var f=b.googleFeedsService;f.params.q=c,f.params.num=e;var g=a.call(f);g.then(d)};return{get:c,fetchFeeds:function(a,b){e(a,b)}}}]),angular.module("maureillasApp.feeds").controller("FeedsCtrl",["$scope","$location","FeedListService","FEEDS",function(a,b,c,d){a.feedList=c.get;var e=b.search();if(!angular.isUndefined(e.feed)){var f=e.feed;c.fetchFeeds(d[f].url,10)}}]),angular.module("maureillasApp.subscription",["maureillasApp.common","maureillasApp.server"]).config(["$translatePartialLoaderProvider","VIEWS",function(a,b){a.addPart(b.subscription.definition.path)}]),angular.module("maureillasApp.subscription").controller("SubscriptionCtrl",["$scope","RegisterService","UserService","MessageService","$translate","$location","VIEWS",function(a,b,c,d,e,f,g){a.available=!1,b.registerAndStore().then(function(b){a.available=!0,a.user=b}),a.update=function(){var a=c.update();a.then(function(){e("subscription.UPDATE_OK").then(function(a){var b=d.newMessage();b.textes=[a],d.setMessage(b)})},function(a){var b=d.newMessage();b.textes=[a],d.setMessage(b)})}}]),angular.module("maureillasApp.push",["maureillasApp.common","maureillasApp.server"]).config(["$translatePartialLoaderProvider",function(a){a.addPart("push")}]),angular.module("maureillasApp.push").factory("PushService",["$q","$window","REMOTE","$cookies","DeviceService",function(a,b,c,d,e){var f={};return e.isMobile()&&(f="android"==device.platform||"Android"==device.platform?{senderID:c.pushService.GCM.key,ecb:"onNotificationGCM"}:{badge:"true",sound:"true",alert:"true",ecb:"onNotificationAPN"}),b.onNotificationGCM=function(a){switch(a.event){case"registered":a.regid.length>0&&(d.registerID=a.regid,alert(a.regid));break;case"message":if(a.foreground){console.log("INLINE NOTIFICATION");var b=new Media("/android_asset/www/"+a.soundname);b.play()}else console.log(a.coldstart?"COLDSTART NOTIFICATION":"BACKGROUND NOTIFICATION");navigator.notification.alert(a.payload.message),console.log("MESSAGE -> MSG: "+a.payload.message),console.log("MESSAGE -> MSGCNT: "+a.payload.msgcnt),console.log("MESSAGE -> TIME: "+a.payload.timeStamp);break;case"error":console.log("ERROR -> MSG:"+a.msg);break;default:console.log("EVENT -> Unknown, an event was received and we do not know what it is")}},b.successIosHandler=function(a){console.log("result = "+a)},b.onNotificationAPN=function(a){if(a.alert&&(console.log("push-notification: "+a.alert),navigator.notification.alert(a.alert)),a.sound){var b=new Media(a.sound);b.play()}a.badge&&pushNotification.setApplicationIconBadgeNumber("successIosHandler",a.badge)},{register:function(){var b=a.defer();return e.isMobile()?window.plugins.pushNotification.register(function(a){b.resolve(a)},function(a){b.reject(a)},f):b.reject("not on mobile device"),b.promise}}}]),angular.module("maureillasApp.server",["maureillasApp.common","ngCookies"]),angular.module("maureillasApp.server").factory("UserService",["$q","RestService","REMOTE","PlatformService","$cookies",function(a,b,c,d,e){var f={info:void 0},g=function(a){var f=c.maureillasService.users.createUser;f.url=f.url.replace("{ID}",a),f.url=f.url.replace("{PLATFORM}",d.getPlatform()),f.backend=!0;var g=b.call(f);return g.then(function(b){return e.registerID=a,h()})},h=function(){var d=a.defer();if(angular.isDefined(f.info))return d.resolve(f),d.promise;var g=e.registerID,h=c.maureillasService.users.getUser;h.url=h.url.replace("{ID}",g),h.backend=!0;var i=b.call(h);return i.then(function(a){return f.info=a.data,f})},i=function(){{var a=c.maureillasService.users.updateUser;e.registerID}return a.url=a.url.replace("{ID}",f.info._id),a.data={feeds:f.info.feeds},a.backend=!0,b.call(a)};return{register:function(a){return g(a)},get:function(){return h()},update:function(){return i()},findOrCreate:function(){var a=h();return a.then(function(a){return a},function(a,b){if("404"==b){var c=e.registerID;return g(c)}})}}}]),angular.module("maureillasApp.server").factory("RegisterService",["$q","$cookies","UserService","PushService","DeviceService",function(a,b,c,d,e){var f=function(a){return a},g=function(){var a=(b.registerID,c.get());return a.then(f,function(a){return alert(a),g()})},h=function(){return c.findOrCreate().then(f,function(a){return alert(a),h()})},i=function(a){return h()},j=function(){return d.register().then(i,function(a){return alert(a),j()})};return{registerAndStore:function(){if(e.isMobile()){alert("mobile");var c=b.registerID;return angular.isDefined(c)?(alert("defined ID : "+c),g()):(alert("push Register"),j())}alert("Not mobile");var d=a.defer();return d.resolve("Not on mobile device"),console.log("not mobile device"),d.promise}}}]),angular.module("maureillasApp.server").factory("PlatformService",function(){var a=function(){var a="";return a="android"==device.platform||"Android"==device.platform?"GOOGLE":"IOS"};return{getPlatform:function(){return a()}}});