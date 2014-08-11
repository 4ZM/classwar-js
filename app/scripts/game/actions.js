'use strict';

var CLASSWAR = (function (cw) {
  var ACTIONS = (function (cwa) {

    cwa.allActions = [];

    cwa.allActions.push({
      id : 'flyers',
      name: 'Flyers',
      effort: 2,
      cost: 10,
      op: function(g, a) {
        console.log('Running Flyers action');
        return g;
      }
    });

    cwa.allActions.push({
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
        if (g.day === cwa.endDay(a)) {
          console.log('Last day');
        }
        return g;
      }
    });

    cwa.allActions.push({
      id : 'antifa-demo',
      name : 'Anti-Fascist Manifestation',
      effort: 5,
      op: function(g, a) {
        g.recruitable += 3.0;
        g.fascists.power = cwa.capLevel(g.fascists.power - 0.02);
        g.fascists.conflict = cwa.capLevel(g.fascists.conflict + 0.01);
        g.fascists.morale = cwa.capLevel(g.fascists.morale - 0.01);
        return g;
      }
    });

    cwa.allActions.push({
      id : 'anticap-demo',
      name: 'Anti-Capitalist Protest',
      effort: 5,
      op: function(g, a) {
        g.recruitable += 3.0;
        g.capitalists.power = cwa.capLevel(g.capitalists.power - 0.02);
        g.climate = cwa.capLevel(g.climate + 0.01);
        return g;
      }
    });

    cwa.allActions.push({
      id : 'antifa-online',
      name: 'Online Anti-Fascist Campaign',
      effort: 2,
      cost: 500,
      duration: 5,
      op: function(g, a) {
        // First day
        if (g.day === a.startDay) {
          g.fascists.conflict = cwa.capLevel(g.fascists.conflict + 0.01);
        }

        // Every day
        g.recruitable += 1.0;
        g.fascists.power = cwa.capLevel(g.fascists.power - 0.005);
        return g;
      }
    });

    cwa.allActions.push({
      id : 'support-party',
      name: 'Support Party',
      effort: 5,
      cost: 1000,
      op: function(g, a) {
        g.recruitable += 1.0;
        g.money += 5000;
        return g;
      }
    });

    cwa.capLevel = function(v) {
      return Math.max(0.0, Math.min(1.0, v));
    };

    cwa.endDay = function(a) {
      return a.startDay + (a.duration || 1) - 1;
    };

    cwa.isStaged = function(g, a) {
      return g.stagedActions.indexOf(a) > -1;
    };

    cwa.stagedActions = function(g) {
      return g.stagedActions;
    };

    cwa.unstagedActions = function(g) {
      var unstaged = [];
      var all = cwa.allActions;
      for (var i = 0; i < all.length; ++i) {
        if (!cwa.isStaged(g, all[i])) {
          unstaged.push(all[i]);
        }
      }
      return unstaged;
    };

    cwa.stageAction = function(g, a) {
      if (!cwa.isStaged(g, a)) {
        g.stagedActions.push(a);
      }
      return g;
    };

    cwa.unstageAction = function(g, a) {
      var index = g.stagedActions.indexOf(a);
      if (index > -1) {
        g.stagedActions.splice(index, 1);
      }
      return g;
    };

    cwa.stagedCost = function(g) {
      var acc = 0;
      for (var i = 0; i < g.stagedActions.length; ++i) {
        acc += g.stagedActions[i].cost || 0;
      }
      return acc;
    };

    cwa.stagedEffort = function(g) {
      var acc = 0;
      for (var i = 0; i < g.stagedActions.length; ++i) {
        acc += g.stagedActions[i].effort || 0;
      }
      return acc;
    };

    cwa.getAction = function(id) {
      var aa = cwa.allActions;
      for (var i = 0; i < aa.length; ++i) {
        if (aa[i].id === id) {
          return aa[i];
        }
      }
    };

    return cwa;
  }(ACTIONS || {}));
  cw.ACTIONS = ACTIONS;
  return cw;
}(CLASSWAR || {}));
