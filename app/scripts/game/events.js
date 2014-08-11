'use strict';

var CLASSWAR = (function (cw) {
  var EVENTS = (function (cwe) {

    cwe.allEvents = [];

    cwe.allEvents.push({
      id : 'fascists-flyers',
      desc: 'Fascists handout flyers',
      prob: function(g) {
        return Math.min(0.5, cw.fascistActivity(g));
      },
      op: function(g, e) {
        g.digest.push('Fascists handout flyers');
        g.fascists.power = cw.capLevel(g.fascists.power + 0.01);
        return g;
      }
    });

    cwe.getEvent = function(id) {
      var ae = cwe.allEvents;
      for (var i = 0; i < ae.length; ++i) {
        if (ae[i].id === id) {
          return ae[i];
        }
      }
    };

    return cwe;
  }(EVENTS || {}));
  cw.EVENTS = EVENTS;
  return cw;
}(CLASSWAR || {}));
