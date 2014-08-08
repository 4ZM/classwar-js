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

    var demo = {
        name: "Demo",
        effort: 20,
        //cost: 10,
        op: function(g) {
            console.log("Running Demo action");
            return g;
        }
    }

    // Module exports
    cwa.all = function() {
        return [flyers,
                demo];
    };

    return cwa;
  }(ACTIONS || {}));
  cw.ACTIONS = ACTIONS;
  return cw;
}(CLASSWAR || {}));
