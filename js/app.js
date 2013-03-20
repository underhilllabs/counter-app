
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
      cur = this.get('count');
      this.set('count', cur + 1);
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
  //asc:  DS.attr('boolean')
});


App.Counter.FIXTURES = [{
  id: 1,
  name: 'Green Sweater',
  count: 0
  //asc: true
}, {
  id: 2,
  name: 'red hat',
  count: 0
  //asc: true
}, {
  id: 3,
  name: 'Doctor Who Scarf',
  count: 0
  //asc: true
}];

