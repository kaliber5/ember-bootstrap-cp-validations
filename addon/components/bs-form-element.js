import Ember from 'ember';
import BsFormElement from 'ember-bootstrap/components/bs-form-element';

const {
  computed,
  defineProperty
} = Ember;

export default BsFormElement.extend({
  _attrValidations: null,
  notValidating: computed.not('isValidating').readOnly(),
  notDisabled: computed.not('disabled').readOnly(),

  // Overwrite
  hasValidator: computed.notEmpty('_attrValidations').readOnly(),
  hasErrors: computed.and('_attrValidations.isInvalid', 'notValidating').readOnly(),
  isValidating: computed.readOnly('_attrValidations.isValidating'),
  // mark as required only if:
  // - field is not disabled,
  // - presence validator requires data presence
  // - presence validator is not disabled
  required: computed('_attrValidations.options.presence.presence', '_attrValidations.options.presence.disabled', 'notDisabled', function() {
     return this.get('notDisabled') && this.get('_attrValidations.options.presence.presence') && !this.get('_attrValidations.options.presence.disabled')
  }),

  setupValidations() {
    defineProperty(this, '_attrValidations', computed.readOnly(`model.validations.attrs.${this.get('property')}`));
    defineProperty(this, 'errors', computed.readOnly('_attrValidations.messages'));
    defineProperty(this, 'warnings', computed.readOnly('_attrValidations.warningMessages'));
  }
});
