'use strict';

describe('Service: ServerStockService', function () {

	var userService,
		successCallback,
		errorCallback,
		restService,
		platformService,
		$q;

	beforeEach(module('maureillasApp.server'));

	beforeEach(inject( function(_$q_, _UserService_, RestService, PlatformService) {
		// set up services
		userService = _UserService_;
		restService = RestService;
		platformService = PlatformService;
		$q = _$q_;

		//init callback mocks 
        successCallback = jasmine.createSpy();
        errorCallback = jasmine.createSpy();		

	    spyOn(platformService, "getPlatform").and.callFake(function() {
	    	return 'GOOGLE';
	    });         

	    spyOn(restService, "call").and.callFake(function() {
	    	var deferred = $q.defer();
	    	deferred.resolve({ result : 'OK' });
	    	return deferred.promise;
	    });

	}))
   
	afterEach(function() {
	    
	});

	it('Should create a new user with ID from system messaging', function() {

	    userService.register('ID_TO_REGISTER');
	    
	    expect(restService.call).toHaveBeenCalledWith({
	    	url : '/v1/users/ID_TO_REGISTER/GOOGLE',
	    	method : 'PUT'
	    });
        expect(errorCallback).not.toHaveBeenCalled();
	});
});
