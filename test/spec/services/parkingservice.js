'use strict';

describe('Service: parkingService', function () {

  // load the service's module
  beforeEach(module('parkingApiApp'));

  // instantiate service
  var parkingService;
  beforeEach(inject(function (_parkingService_) {
    parkingService = _parkingService_;
  }));

  it('should do something', function () {
    expect(!!parkingService).toBe(true);
  });

});
