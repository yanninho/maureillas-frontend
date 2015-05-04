'use strict';

describe('Service: FeedService', function () {

	var feedService,
		successCallback,
		errorCallback,
		restService,
		$q;

	beforeEach(module('maureillasApp.server'));

	beforeEach(inject( function(_$q_, _FeedService_, RestService) {
		// set up services
		feedService = _FeedService_;
		restService = RestService;
		$q = _$q_;

		//init callback mocks 
        successCallback = jasmine.createSpy();
        errorCallback = jasmine.createSpy();		
     
	}))
   
	afterEach(function() {
	    
	});

	it('Should get list of feeds from server', function() {		
	    spyOn(restService, "call").and.callFake(function() {
	    	var deferred = $q.defer();
	    	deferred.resolve([
	    		{ name : 'agenda'},
	    		{ name : 'news'},
	    		]);
	    	return deferred.promise;
	    });

	    var promiseGetFeed = feedService.getAll();
	    promiseGetFeed.then(function(result){
	    	expect.exist(result.list);
	    	expect(result.list[0].name).toBeEqual('agenda');
	    })
	    
	    expect(restService.call).toHaveBeenCalledWith({
	    	url : '/v1/feeds',
	    	method : 'GET',
	    	backend : true
	    });
        expect(errorCallback).not.toHaveBeenCalled();
	});

});
