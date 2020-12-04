import { not, notEmpty, and, readOnly } from '@ember/object/computed';
import { defineProperty } from '@ember/object';
import BsFormElement from 'ember-bootstrap/components/bs-form/element';

export default class ValidatedBsFormElement extends BsFormElement {
  '__ember-bootstrap_subclass' = true;

  // Overwrite
  @notEmpty('_attrValidations')
  hasValidator;

  @not('isValidating')
  notValidating;

  @and('_attrValidations.isInvalid', 'notValidating')
  hasErrors;

  @readOnly('_attrValidations.isValidating')
  isValidating;

  @readOnly('_attrValidations.messages')
  errors;

  @readOnly('_attrValidations.warningMessages')
  warnings;

  setupValidations() {
    defineProperty(this, '_attrValidations', readOnly(`args.model.validations.attrs.${this.args.property}`));
  }
}
