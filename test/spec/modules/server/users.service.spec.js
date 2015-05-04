'use strict';

describe('Service: UserService', function () {

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
	}))
   
	afterEach(function() {
	    
	});

	it('Should create a new user with ID from system messaging', function() {
	    spyOn(restService, "call").and.callFake(function() {
	    	var deferred = $q.defer();
	    	deferred.resolve({ result : 'OK' });
	    	return deferred.promise;
	    });

	    userService.register('ID_TO_REGISTER');
	    
	    expect(restService.call).toHaveBeenCalledWith({
	    	url : '/v1/users/ID_TO_REGISTER/GOOGLE',
	    	method : 'PUT',
	    	backend : true
	    });
        expect(errorCallback).not.toHaveBeenCalled();
	});

	it('Should get a user by ID', function() {		
	    spyOn(restService, "call").and.callFake(function() {
	    	var deferred = $q.defer();
	    	deferred.resolve({ 
	    		'active' : true,  
	    		'feeds' : [
	    			{'agenda' : true}
	    		]
	    	});
	    	return deferred.promise;
	    });

	    var promiseGetUser = userService.get('ID_TO_REGISTER');
	    promiseGetUser.then(function(result){
	    	expect.exist(result.info);
	    	expect(result.info.active).toBeEqual(true);
	    })
	    
	    expect(restService.call).toHaveBeenCalledWith({
	    	url : '/v1/users/ID_TO_REGISTER',
	    	method : 'GET',
	    	backend : true
	    });
        expect(errorCallback).not.toHaveBeenCalled();


	});

});
