
//enter "karma start unit-tests.conf.js" in tests folder to run this!

describe('app.services', function() {

  beforeEach(module('app.services'));

  describe('game', function() {
    var game;
    // beforeEach(inject(function(_game_) {
    //   game = _game_;
    // }));

    it('should create a new game', function(){
      expect(true).toBe(true);
    })

  });


});
