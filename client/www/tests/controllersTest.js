
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
    // angular.mock.inject(function GetDependencies(welcomeCtrl) {
    //   $controller = welcomeCtrl;
    // });

    it('should be able to add two numbers', function(){
      expect(controller.add).to.be.instanceof(Function);
      expect(controller.add(2,3)).to.equal(5);
    });

  })

});

// describe('app.services', function() {

//   beforeEach(module('app.services'));

//   // Will $httpBackend to mock sample data

//   describe('game', function() {
//     var game;
//     // beforeEach(inject(function(_game_) {
//     //   game = _game_;
//     // }));

//     it('should create a new game', function(){
//       expect(true).to.be(true);
//     })

//   });
// });
