import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    submit() {
      window.alert('Form submitted!');
    }
  }
});
