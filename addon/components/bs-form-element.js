import Ember from 'ember';
import BsFormElement from 'ember-bootstrap/components/bs-form-element';

const {
  computed,
  defineProperty
} = Ember;

if (!String.prototype.startsWith) {
  String.prototype.startsWith = function(searchString, position) {
    position = position || 0;
    return this.substr(position, searchString.length) === searchString;
  };
}

export default BsFormElement.extend({
  _attrValidations: null,
  notValidating: computed.not('isValidating').readOnly(),
  notDisabled: computed.not('disabled').readOnly(),

  // Overwrite
  hasValidator: computed.notEmpty('_attrValidations').readOnly(),
  hasErrors: computed.and('_attrValidations.isInvalid', 'notValidating').readOnly(),
  isValidating: computed.readOnly('_attrValidations.isValidating'),
  required: computed.and('_attrValidations.options.presence.presence', 'notDisabled'),

  setupValidations() {
    let property = this.get('property');
    let hasRelatedTypes = this.get('model.constructor.relatedTypes.length');

    if (hasRelatedTypes) {
      this.get('model').eachRelationship((name) => {
        let relatedTarget = `${name}.`;
        if (property.startsWith(relatedTarget)) {
          let nestedProperty = property.replace(relatedTarget, '');
          defineProperty(this, '_attrValidations', computed.readOnly(`model.${name}.validations.attrs.${nestedProperty}`) );
        }
      });
    } else {
      defineProperty(this, '_attrValidations', computed.readOnly(`model.validations.attrs.${property}`));
    }

    defineProperty(this, 'errors', computed.readOnly(`_attrValidations.messages`));
  }
});
