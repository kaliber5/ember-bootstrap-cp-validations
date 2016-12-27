import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    submit() {
      window.alert('Form submitted!');
    }
  }
});
