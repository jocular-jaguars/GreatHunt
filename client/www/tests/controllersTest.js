
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

  xdescribe('challengeCtrl', function() {
    beforeEach(module('app.inGameControllers'));
    //sample challege to add to scope
    var challenge = {
      description: "This is a fun challenge!",
      question: "What is Dave Grohl's name?",
      answers: ["Dave Grohl"]
    };
    var challenges = [challenge];

    it('should have a challenge and huntInformation on $scope', function() {
      inject(function($controller, $rootScope, LocalStorageService) {
        LocalStorageService.set("huntName", "testHuntName");
        LocalStorageService.set("gameCode", "abcd");
        LocalStorageService.set("teamIndex", 0);
        LocalStorageService.set("challenges", challenges);
        LocalStorageService.set("currentChallenge", 0);

        var scope = $rootScope.$new()
        controller = $controller('challengeCtrl', {
          $scope : scope
        });

        (scope.huntName).should.equal("testHuntName");
        (scope.gameCode).should.equal("abcd");
        (scope.teamIndex).should.equal(0);
        (scope.challenge.description).should.equal("This is a fun challenge!");
      })
    });

    it('should test to user whether answer is correct or incorrect', function() {
      inject(function($controller, $rootScope, LocalStorageService) {
        LocalStorageService.set("challenges", challenges);
        LocalStorageService.set("currentChallenge", 0);

        var scope = $rootScope.$new()
        controller = $controller('challengeCtrl', {
          $scope : scope
        });

        scope.user.answer = "Fresh Pots!";
        expect(scope.isWrong()).to.equal(true);
        scope.user.answer = "Dave Grohl";
        expect(scope.isWrong()).to.equal(false);
      });
    });
  });

  //not writing tests for endGameCtrl as there's no functions or scope storage

  describe('dashboardCtrl', function() {
    beforeEach(module('app'));
    beforeEach(module('app.inGameControllers'));

    xit ('should have a have a gameCode on local scope', function() {
      inject(function($controller, $rootScope, $state, LocalStorageService) {
        LocalStorageService.set('gameCode', 'abcd');

        var scope = $rootScope.$new();
        controller = $controller('dashboardCtrl', function() {
          $scope: scope
        });

        // expect(scope.gameCode).to.equal('abcd');
      });
    });

    it('stopGameUpdate should clear out LocalStorage', function() {
      inject(function($controller, $rootScope, $interval,
        LocalStorageService) {
          LocalStorageService.set('creator', true);
          LocalStorageService.set('gameCode', 'abcd');
          var scope = $rootScope.$new();
          controller = $controller('dashboardCtrl', {
            $scope : scope
          });

        var creator = LocalStorageService.get('creator');
        expect(creator).to.equal(true);
        scope.stopGameUpdate();
        creator = LocalStorageService.get('creator');
        expect(creator).to.equal(null)
      });
    });

    it('timer should regularly check for teams on the server', function() {
      this.timeout(5000);
      inject(function($controller, $rootScope, $interval, TeamService,
        GameService) {
          var scope = $rootScope.$new();
          controller = $controller('dashboardCtrl', {
            $scope : scope
          });

          GameService.postGame("Kristin's Real Hunt").then(function(gameCode) {
            scope.gameCode = gameCode;
          });

          TeamService.makeTeam("Fake Team", scope.gameCode);
          $interval(function() {
            expect(scope.teams.length).to.equal(1);
          },4000);
      });
    });
  });
});