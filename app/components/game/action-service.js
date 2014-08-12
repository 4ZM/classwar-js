

angular.module('game.actions', ['game.state'])
  .factory('ActionService', function(GameStateService) {
    var cws = GameStateService; // Short alias


      var endDay = function(a) {
        return a.startDay + (a.duration || 1) - 1;
      };

    var allActions = [];

    allActions.push({
      id : 'flyers',
      name: 'Flyers',
      effort: 2,
      cost: 10,
      op: function(g, a) {
        console.log('Running Flyers action');
        return g;
      }
    });

    allActions.push({
      id : 'stickers',
      name: 'Stickers',
      effort: 2,
      duration: 3,
      cost: 10,
      op: function(g, a) {
        if (g.day === a.startDay) {
          console.log('First day');
        }
        console.log('Stickers running : everyday');
        if (g.day === endDay(a)) {
          console.log('Last day');
        }
        return g; 
      }
    });

    allActions.push({
      id : 'antifa-demo',
      name : 'Anti-Fascist Manifestation',
      effort: 5,
      op: function(g, a) {
        g.recruitable += 3.0;
        g.fascists.power = cws.capLevel(g.fascists.power - 0.02);
        g.fascists.conflict = cws.capLevel(g.fascists.conflict + 0.01);
        g.fascists.morale = cws.capLevel(g.fascists.morale - 0.01);
        return g;
      }
    });

    allActions.push({
      id : 'anticap-demo',
      name: 'Anti-Capitalist Protest',
      effort: 5,
      op: function(g, a) {
        g.recruitable += 3.0;
        g.capitalists.power = cws.capLevel(g.capitalists.power - 0.02);
        g.climate = cws.capLevel(g.climate + 0.01);
        return g;
      }
    });

    allActions.push({
      id : 'antifa-online',
      name: 'Online Anti-Fascist Campaign',
      effort: 2,
      cost: 500,
      duration: 5,
      op: function(g, a) {
        // First day
        if (g.day === a.startDay) {
          g.digest.push('The online antifa campaign starts');
          g.fascists.conflict = cws.capLevel(g.fascists.conflict + 0.01);
        }

        // Every day
        g.digest.push('The online antifa campaign is running');
        g.recruitable += 1.0;
        g.fascists.power = cws.capLevel(g.fascists.power - 0.005);
        return g;
      }
    });

    allActions.push({
      id : 'support-party',
      name: 'Support Party',
      effort: 5,
      cost: 1000,
      op: function(g, a) {
        g.recruitable += 1.0;
        g.money += 5000;
        g.digest.push('Your support party was awesome and earned you $' + 5000);
        return g;
      }
    });

    return {
      endDay: endDay,

      isStaged: function(g, a) {
        return g.stagedActions.indexOf(a) > -1;
      },

      stagedActions: function(g) {
        return g.stagedActions;
      },

      unstagedActions: function(g) {
        var unstaged = [];
        var all = allActions;
        for (var i = 0; i < all.length; ++i) {
          if (!this.isStaged(g, all[i])) {
            unstaged.push(all[i]);
          }
        }
        return unstaged;
      },

      stageAction: function(g, a) {
        if (!this.isStaged(g, a)) {
          g.stagedActions.push(a);
        }
        return g;
      },

      unstageAction: function(g, a) {
        var index = g.stagedActions.indexOf(a);
        if (index > -1) {
          g.stagedActions.splice(index, 1);
        }
        return g;
      },

      stagedCost: function(g) {
        var acc = 0;
        for (var i = 0; i < g.stagedActions.length; ++i) {
          acc += g.stagedActions[i].cost || 0;
        }
        return acc;
      },

      stagedEffort: function(g) {
        var acc = 0;
        for (var i = 0; i < g.stagedActions.length; ++i) {
          acc += g.stagedActions[i].effort || 0;
        }
        return acc;
      },

      getAction: function(id) {
        var aa = allActions;
        for (var i = 0; i < aa.length; ++i) {
          if (aa[i].id === id) {
            return aa[i];
          }
        }
      }
    };
  });