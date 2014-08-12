'use strict';

angular.module('game.engine', ['game.state', 'game.actions', 'game.events'])
  .factory('GameEngineService', function(GameStateService, ActionService, EventService) {
      var cws = GameStateService; // Short alias

      return {
        tic: function(g) {
          var a;

          // Clear earlier messages
          g.digest = [];

          console.log('Day: ' + g.day);

          // Commit the staged actions
          while (g.stagedActions.length > 0) {
            a = g.stagedActions.shift();
            a.startDay = g.day;
            g.money -= a.cost || 0;
            g.runningActions.push(a);
          }

          // Run the actions
          for (var i = 0; i < g.runningActions.length; ++i) {
            a = g.runningActions[i];
            a.op(g, a);
          }

          // Remove expired actions
          var keep = [];
          while (g.runningActions.length > 0) {
            a = g.runningActions.shift();
            if (g.day < ActionService.endDay(a)) {
              keep.push(a);
            }
          }
          g.runningActions = keep;

          // Collect moneyz
          g.money += 5 * g.activists;

          // Recruit activists
          var space = cws.activistCapacity(g) - g.activists;
          var recruit = Math.min(space, g.recruitable); // Recruit as many as possible
          g.activists += recruit;
          g.recruitable -= recruit;
          g.recruitable *= 0.8; // Remove some recruitable if they aren't recruited

          // Update opponent power
          g.fascists.power = cws.capLevel(g.fascists.power + cws.fascistActivity(g) * 0.02);
          g.fascists.activity = cws.capLevel(g.fascists.activity - 0.005);
          g.capitalists.power = cws.capLevel(g.capitalists.power + cws.capitalistActivity(g) * 0.02);

          // Update game status
          if (g.fascists.power >= 1.0) {
            g.status = 'fascist won';
          }
          else if (g.capitalists.power >= 1.0) {
             g.status = 'capitalists won';
          }

          // Advance day
          g.day = g.day + 1;
          return g;
        }

      };
  });