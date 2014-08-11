'use strict';

var CLASSWAR = (function (cw) {

  cw.state = {
    day:                0,

    activists:          5, // Number of
    recruitable:     0.00, // Number of possible recruits

    money:           1000, // $

    union:           0.00, // % Organized workers

    fascists: {
      morale:         0.2, // %
      conflict:      0.00, // %
      power:         0.05  // %
    },

    capitalists: {
      power:         0.90  // %
    },

    repression:      0.00, // % Police repression

    climate:         0.50, // Political climate, % red (0 = deep blue)

    digest:            [], // Messages for the day

    stagedActions:     [],
    runningActions:    [],

    status:      'running'
  };

  cw.tic = function(g) {
    var a;

    // Clear earlier messages
    g.digest = [];

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

    // Collect moneyz
    g.money += 5 * g.activists;

    // Recruit activists
    var space = cw.activistCapacity(g) - g.activists;
    var recruit = Math.min(space, g.recruitable); // Recruit as many as possible
    g.activists += recruit;
    g.recruitable -= recruit;
    g.recruitable *= 0.8; // Remove some recruitable if they aren't recruited

    // Update opponent power
    g.fascists.power = cw.ACTIONS.capLevel(g.fascists.power + fascistActivity(g) * 0.02);
    g.fascists.activity = cw.ACTIONS.capLevel(g.fascists.activity - 0.005);
    g.capitalists.power = cw.ACTIONS.capLevel(g.capitalists.power + capitalistActivity(g) * 0.02);

    // Advance day
    g.day = g.day + 1;
    return g;
  };

  var fascistActivity = function(g) {

    var FASCIST_CYCLIC_PERIOD = 100;
    var phase = - Math.PI / 2.0; // Start at 0 and rising
    var harmonic = Math.sin((2.0 * Math.PI * g.day) / FASCIST_CYCLIC_PERIOD + phase);
    var cyclic = (harmonic + 1.0) / 2.0;

    var CUTOFF = 0.7;
    var powClimate = Math.pow((CUTOFF - g.climate) / CUTOFF, 2.0);
    var climate = g.climate < CUTOFF ? powClimate : 0.0;

    var conflict = g.fascists.conflict;
    var morale = g.fascists.morale;

    return 0.2 * cyclic + 0.2 * climate + 0.2 * conflict + 0.2 * morale;
  };

  var capitalistActivity = function(g) {
    var CUTOFF = 0.3;
    var powClimate = Math.pow((CUTOFF - g.climate) / (1.0 - CUTOFF), 2.0);
    var climate = g.climate > CUTOFF ? powClimate : 0.0;

    var invPower = 1.0 - g.capitalists.power;
    return 0.5 * climate + 0.5 * invPower;
  };


  cw.activistCapacity = function(g) {
    return 10;
  };

  return cw;
}(CLASSWAR || {}));
