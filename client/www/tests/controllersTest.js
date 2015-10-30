
//enter "karma start unit-tests.conf.js" in tests folder to run this!

describe('app.preGameControllers', function() {
  var controller;

  xdescribe('welcomeCtrl', function() {

    beforeEach(module('app'));
    beforeEach(module('app.preGameControllers'));

    it('should have a function "create" which redirects when called', function() {
      inject(function($controller, _$rootScope_, $state) {
        var scope = _$rootScope_;
        $rootScope = scope;
        scope.create = function() {
          $rootScope.redirect('hunts.index');
        };
        var redirect = sinon.spy($rootScope, "redirect");

        controller = $controller('welcomeCtrl', {
          $scope : scope
        });

        scope.create()
        assert(redirect.calledOnce);
      });
    });

  });

  xdescribe('lobbyCtrl', function() {

    beforeEach(module('app'));
    beforeEach(module('app.services'));
    beforeEach(module('app.preGameControllers'));

    it('should have "startGame" funcion which calls GameService\'s startGame',
        function() {
        inject(function($controller, $rootScope, $state, GameService) {
          var scope = $rootScope.$new();
          controller = $controller('lobbyCtrl', {
            $scope : scope
        });

        var startSpy = sinon.spy(GameService, "startGame");

        scope.startGame();
        assert(startSpy.calledOnce);
      })
    });

    it('should have "isCreator" which calls LocalStorage and returns a boolean',
      function() {
        inject(function($controller, $rootScope, LocalStorageService) {
          var scope = $rootScope.$new();
          controller = $controller('lobbyCtrl', {
            $scope: scope
          });

        var storageSpy = sinon.spy(LocalStorageService, "get");

        assert.isBoolean(scope.isCreator());
        assert(storageSpy.calledOnce);
      });
    });

    it('should have gameCode on the local scope', function() {
        inject(function($controller, $rootScope, LocalStorageService) {
          LocalStorageService.set('gameCode', 'abcd');
          var scope = $rootScope.$new();
          controller = $controller('lobbyCtrl', {
            $scope: scope
        });

        assert.isString(scope.gameCode);
      });
    });

    it('should have an array called "teams" on the local scope', function(){
      inject(function($controller, $rootScope, $interval) {
        var scope = $rootScope.$new();
        controller = $controller('lobbyCtrl', {
          $scope: scope
        });

        $interval(function() {
          assert.isArray(scope.teams);
        }, 4000);
      })
    });
  });

  xdescribe('createTeamCtrl', function() {

    beforeEach(module('app'));
    beforeEach(module('app.preGameControllers'));

    it('sendTeam should add team to scope.data', function() {
      inject(function($controller, $rootScope, $interval, TeamService,
        LocalStorageService) {
          var scope = $rootScope.$new();
          controller = $controller('createTeamCtrl', {
            $scope : scope
      });

        scope.sendTeam("Fake Team");
        $interval(function() {
          assert.isString(scope.data.teamName);
        }, 10);
      });
    });

    it('should call team factory\'s make to add team', function() {
      inject(function($controller, $rootScope, TeamService, LocalStorageService) {
        var scope = $rootScope.$new();
        controller = $controller('createTeamCtrl', {
          $scope : scope
        });

        var startSpy = sinon.spy(TeamService, "makeTeam");

        scope.sendTeam("Fake Team");
        assert(startSpy.calledOnce);
      });
    });
  });
});

describe('app.inGameControllers', function() {

  describe('challengeCtrl', function() {

    beforeEach(module('app.inGameControllers'));

    it('should have a challenge and huntInformation on $scope', function() {
      inject(function($controller, $rootScope, LocalStorageService) {
        var scope = $rootScope.$new()
        controller = $controller('challengeCtrl', {
          $scope : scope
        });

        LocalStorageService.set("huntName", "testHuntName");
        LocalStorageService.set("gameCode", "abcd");
        LocalStorageService.set("teamIndex", "0");

        // console.log("huntName: ",scope.huntName);
        // (scope.huntName).should.be.a("string");
        // (scope.question).should.be.a("string");
        // (scope.description).should.be.a("string");
      })
    });

    it('should display to user whether answer is correct or incorrect', function() {
      //use ngClass to change background color
      //will have to write a directive test, I believe
    });

    it('should display photo from url', function() {
      //not sure how to test this yet. Maybe file type?
    });
  });

  xdescribe('endGameCtrl', function() {
    it('should be able to reroute to welcome page', function() {
      // need to find out how to test rerouting
    });
  });

  xdescribe('dashboardCtrl', function() {
    beforeEach(module('app.controllers'));
    beforeEach(module('app.services'));

    it('should have an teams array with teams and challenges', function() {
       inject(function($controller, $rootScope, $interval, $resource) {
        var scope = $rootScope.$new()
        controller = $controller('dashboardCtrl', {
          $scope : scope
        });

        expect(scope.teams[0]).to.have.property("name");
        expect(scope.teams[0]).to.have.property("currentChallenge");
      })
    });
  });
});