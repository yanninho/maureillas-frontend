'use strict';

describe('Service: RestService', function () {

	var $httpBackend, 
	    restService, 
	    successCallback, 
	    errorCallback,
	    urls;

	beforeEach(module('maureillasApp.common'));	

	beforeEach(inject( function(_$httpBackend_, _RestService_, URLS) {
		//mock $http
		$httpBackend = _$httpBackend_;
        
	    //http callback
        successCallback = jasmine.createSpy();
        errorCallback = jasmine.createSpy();
	    
	    // instance 
	    urls = URLS;
		restService = _RestService_;
	}));	

   afterEach(function() {
     $httpBackend.verifyNoOutstandingExpectation();
     $httpBackend.verifyNoOutstandingRequest();
   });

	it('Should throw exception : config paramter undefined', function() {
		expect(restService.call).toThrow();		
	});

	it('Le paramètre "config.url" indéfini doit lever une exception', function() {
		var config = {
			method : 'GET'
		}
		expect(function() {
      		restService.call(config)
    		}).toThrow();		
	});

	it('Should throw exception : method of config parameter undefined', function() {
		var config = {
			url : '/test'
		}
		expect(function() {
      		restService.call(config)
    		}).toThrow();		
	});


	it('Should check GET http request', function() {
		$httpBackend.whenGET(urls.urlBackend  + '/test').respond(200, 'OK');
		
		var promiseTest  = restService.call({url : '/test', method : 'GET'});
		promiseTest.then(successCallback, errorCallback);
        
        $httpBackend.flush();
        
        expect(successCallback).toHaveBeenCalled();
        expect(errorCallback).not.toHaveBeenCalled();
	});

	it('Should check POST http request with data', function() {
		$httpBackend.whenPOST(urls.urlBackend  + '/test', 
		  {
				nameData : 'value'
		  }
     	  ).respond(200, 'OK');
		
		var promiseTest  = restService.call({
			url : '/test', 
			method : 'POST',
			data : {
				nameData : 'value'
			}
		});
		promiseTest.then(successCallback, errorCallback);
        
        $httpBackend.flush();
        
        expect(successCallback).toHaveBeenCalled();
        expect(errorCallback).not.toHaveBeenCalled();
	});


	it('Should throw a http exception', function() {
		$httpBackend.whenGET(urls.urlBackend  + '/test'
     	).respond(408, 'Oh no!!');
		
		var promiseTest  = restService.call({
			url : '/test', 
			method : 'GET'
		});
		promiseTest.then(successCallback, errorCallback);
        
        $httpBackend.flush();
        
        expect(successCallback).not.toHaveBeenCalled();
        expect(errorCallback).toHaveBeenCalled();
	});

	it('Should return reject promise', function() {
		$httpBackend.whenGET(urls.urlBackend  + '/test'
     	).respond(500, 'Internal server error');

     	var promiseTest  = restService.call({
			url : '/test', 
			method : 'GET'
		});
		promiseTest.then(successCallback, errorCallback);
        
        $httpBackend.flush();
        
        expect(successCallback).not.toHaveBeenCalled();
        expect(errorCallback).toHaveBeenCalled();
	});
});