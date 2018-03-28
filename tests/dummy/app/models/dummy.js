import EmberObject from '@ember/object';
import { validator, buildValidations } from 'ember-cp-validations';

var Validations = buildValidations({
  username: validator('length', {
    debounce: 2000,
    min: 4,
    max: 8
  }),
  password: [
    validator('presence', true),
    validator('length', {
      min: 4,
      max: 8
    })
  ],
  email: [
    validator('presence', true),
    validator('format', { type: 'email' })
  ],
  emailConfirmation: [
    validator('presence', true),
    validator('confirmation', {
      on: 'email',
      description: 'Email addresses'
    })
  ]
});

export default EmberObject.extend(Validations, {
  username: '',
  password: '',
  email: ''
});
