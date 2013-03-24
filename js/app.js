window.App = Ember.Application.create();

// Router
App.Router.map(function() {
  this.resource('counters', function() {
    this.resource('counter', { path: ':counter_id' });
    this.route('new');
  });
})

// Routes
App.CountersNewRoute = Ember.Route.extend({
  // tell the Router what model to use for the controller
  setupController: function(controller, counter) {
    controller.set('content', counter);
  }
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

// Controllers
App.CountersController = Ember.ArrayController.extend();

App.CountersNewController = Ember.ObjectController.extend({
  addCounter: function(newCounterName) {
      var ctr = App.Counter.createRecord({ count: 0, step: 1, isAscending: true, name: newCounterName });
      this.get('store').commit();
      this.transitionTo('counters');
  }
});


App.CounterController = Ember.ObjectController.extend({
    inc: function() {
      var step = this.get('step');
      var cur = this.get('count');
      this.set('count', cur + step);
      this.get('store').commit();
    },
    toggleAscending: function() {
        this.set('step', (-1) * this.get('step'));
        this.set('isAscending', !this.get('isAscending'));
        this.get('store').commit();
    }
});

// Models
App.Store = DS.Store.extend({
  revision: 11,
  //adapter: 'DS.FixtureAdapter'
  adapter: 'App.LSAdapter'
});

App.LSAdapter = DS.LSAdapter.extend({
  namespace: 'counter-app'
});

App.Counter = DS.Model.extend({
  name: DS.attr('string'),
  count: DS.attr('number'),
  step: DS.attr('number'),
  isAscending:  DS.attr('boolean')
});


// App.Counter.FIXTURES = [{
//   id: 1,
//   name: 'Green Sweater',
//   count: 0,
//   step: 1,
//   isAscending: true
// }, {
//   id: 2,
//   name: 'Red Hat',
//   count: 0,
//   step: 1,
//   isAscending: true
// }, {
//   id: 3,
//   name: 'Doctor Who Scarf',
//   count: 0,
//   step: 1,
//   isAscending: true
// }];

