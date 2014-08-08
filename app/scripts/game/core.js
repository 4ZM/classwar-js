var CLASSWAR = (function (cw) {

  var state = {
    day: 0,
    activists: 5,
    money: 1000,
    stagedActions: [],
    status: "running"
  };

  var tic = function(g) {
    console.log("Day: " + g.day);
    if (g.day === 10) {
      g.status = "game over";
    }

    g.day = g.day + 1;
    return g;
  }

  var play = function() {
    while(state.status === "running") {
      state = tic(state);
    }
  }

  // Module exports
  cw.tic = tic;
  cw.play = play;
  cw.state = state;
  return cw;
}(CLASSWAR || {}));
