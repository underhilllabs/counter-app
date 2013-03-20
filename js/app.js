window.App = Ember.Application.create();

// Router
App.Router.map(function() {
  this.resource('counters', function() {
    this.resource('counter', { path: ':counter_id' });
  });
});

App.IndexRoute = Ember.Route.extend({
    redirect: function() {
      this.transitionTo('counters');
    }
});

App.CountersRoute = Ember.Route.extend({
    model: function() {
      return App.Counter.find();
    }
});

App.CountersController = Ember.ArrayController.extend();

App.CounterController = Ember.ObjectController.extend({
    inc: function() {
      var cur = this.get('count');
      var step = 1;
      if (!this.get('isAscending')) {
          step = step * (-1);
      }
      this.set('count', cur + step);
    },
    toggleAscending: function() {
        this.set('isAscending', !this.get('isAscending'));
    }
});

// Models
App.Store = DS.Store.extend({
  revision: 11,
  adapter: 'DS.FixtureAdapter'
});

App.Counter = DS.Model.extend({
  name: DS.attr('string'),
  count: DS.attr('number'),
  isAscending:  DS.attr('boolean')
});


App.Counter.FIXTURES = [{
  id: 1,
  name: 'Green Sweater',
  count: 0,
  isAscending: true
}, {
  id: 2,
  name: 'Red Hat',
  count: 0,
  isAscending: true
}, {
  id: 3,
  name: 'Doctor Who Scarf',
  count: 0,
  isAscending: true
}];

