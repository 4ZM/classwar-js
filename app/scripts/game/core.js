var CLASSWAR = (function (cw) {

  cw.state = {
    day: 0,
    activists: 5,
    money: 1000,
    stagedActions: [],
    runningActions: [],
    status: "running"
  };

  cw.tic = function(g) {
    console.log("Day: " + g.day);

    // Commit the staged actions
    while (g.stagedActions.length > 0) {
      a = g.stagedActions.shift();
      a.startDay = g.day;
      g.money -= a.cost;
      g.runningActions.push(a);
    }

    // Run the actions
    for (i = 0; i < g.runningActions.length; ++i) {
      g.runningActions[i].op(g);
    }

    // Remove expired actions
    var keep = [];
    while (g.runningActions.length > 0) {
      a = g.runningActions.shift();
      if (g.day < (a.startDay + (a.duration || 1) - 1))
        keep.push(a);
    }
    g.runningActions = keep;

    // Advance day
    g.day = g.day + 1;
    return g;
  }

  return cw;
}(CLASSWAR || {}));
