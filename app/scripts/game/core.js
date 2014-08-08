var CLASSWAR = (function (cw) {

  cw.state = {
    day: 0,
    activists: 5,
    money: 1000,
    stagedActions: [],
    status: "running"
  };

  var tic = function(g) {
    console.log("Day: " + g.day);

    // Run the actions and empty staging array
    while (g.stagedActions.length > 0) {
      g = g.stagedActions.shift().op(g);
    }

    g.day = g.day + 1;
    return g;
  }

  return cw;
}(CLASSWAR || {}));
