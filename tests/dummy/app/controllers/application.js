import Controller from '@ember/controller';

export default class ApplicationController extends Controller {
  submit() {
    window.alert('Form submitted!');
  }
}
