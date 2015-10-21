
//enter "karma start unit-tests.conf.js" in tests folder to run this!

describe('app.controllers', function() {
  var controller;

  beforeEach(module('app.controllers'));
  beforeEach(inject(function($controller, $rootScope) {
    controller = $controller('welcomeCtrl', {
      $scope : $rootScope.$new()
    });
    console.log('The controller is', controller);
  }));

  describe('welcomeCtrl', function() {

    //this was when I made an add function in the welcomeCtrl
    // it('should be able to add two numbers', function(){
    //   expect(controller.add).to.be.instanceof(Function);
    //   expect(controller.add(2,3)).to.equal(5);
    // });

  })
});