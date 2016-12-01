'use strict';

describe('Service: firebaseServices', function () {

  // load the service's module
  beforeEach(module('umanisPlanningV10App'));

  // instantiate service
  var firebaseServices;
  beforeEach(inject(function (_firebaseServices_) {
    firebaseServices = _firebaseServices_;
  }));

  it('should do something', function () {
    expect(!!firebaseServices).toBe(true);
  });

});
