'use strict';

var CLASSWAR = (function (cw) {

  cw.state = {
    day: 0,
    activists: 5,
    money: 1000,
    stagedActions: [],
    runningActions: [],
    status: 'running'
  };

  cw.tic = function(g) {
    var a;

    console.log('Day: ' + g.day);

    // Commit the staged actions
    while (g.stagedActions.length > 0) {
      a = g.stagedActions.shift();
      a.startDay = g.day;
      g.money -= a.cost;
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
      if (g.day < cw.ACTIONS.endDay(a)) {
        keep.push(a);
      }
    }
    g.runningActions = keep;

    // Advance day
    g.day = g.day + 1;
    return g;
  };

  return cw;
}(CLASSWAR || {}));
