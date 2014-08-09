var CLASSWAR = (function (cw) {
  var ACTIONS = (function (cwa) {

    var flyers = {
      name: "Flyers",
      effort: 2,
      cost: 10,
        op: function(g) {
            console.log("Running Flyers action");
            return g;
        }
    }

    var stickers = {
      name: "Stickers",
      effort: 2,
      duration: 2,
      cost: 10,
        op: function(g) {
            console.log("Stickers running");
            return g;
        }
    }

    var demo = {
        name: "Demo",
        effort: 20,
        op: function(g) {
            console.log("Running Demo action");
            return g;
        }
    }

    cwa.isStaged = function(g, a) {
        return g.stagedActions.indexOf(a) > -1;
    }

    cwa.stagedActions = function(g) {
        return g.stagedActions;
    }

    cwa.unstagedActions = function(g) {
        var unstaged = [];
        var all = cwa.allActions();
        for (var i = 0; i < all.length; ++i) {
            if (!cwa.isStaged(g, all[i])) {
                unstaged.push(all[i]);
            }
        }
        return unstaged;
    }

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

    cwa.allActions = function() {
        return [flyers,
                stickers,
                demo];
    };

    return cwa;
  }(ACTIONS || {}));
  cw.ACTIONS = ACTIONS;
  return cw;
}(CLASSWAR || {}));
