'use strict';

angular.module('game.events', ['game.state'])
  .factory('EventService', function(GameStateService) {
    var cws = GameStateService; // Short alias

    var allEvents = [];

    allEvents.push({
      id : 'fascists-flyers',
      desc: 'Fascists handout flyers',
      prob: function(g) {
        return Math.min(0.5, cws.fascistActivity(g));
      },
      op: function(g, e) {
        g.digest.push('Fascists handout flyers');
        g.fascists.power = cws.capLevel(g.fascists.power + 0.01);
        return g;
      }
    });

    return {
      allEvents: allEvents,

      getEvent: function(id) {
        var ae = cwe.allEvents;
        for (var i = 0; i < ae.length; ++i) {
          if (ae[i].id === id) {
            return ae[i];
          }
        }
      }
    };
  });
