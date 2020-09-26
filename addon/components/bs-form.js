import ObjectProxy from '@ember/object/proxy';
import BsForm from 'ember-bootstrap/components/bs-form';

export default class ValidatedBsFrom extends BsForm {
  // Silence subclassing warning, as we need to extend for our current validations API. This means we need to treat
  // this addon as a "privileged" one, and guarantee that we will account for possible changes that would things break
  // due to us extending from the base class (e.g. when refactoring bs-form components to Glimmer.Component)
  '__ember-bootstrap_subclass' = true;

  get hasValidator() {
    return !!this.model?.validate;
  }

  async validate(model) {
    let m = model;

    if (model instanceof ObjectProxy && model.get('content') && typeof model.get('content').validate === 'function') {
      m = model.get('content');
    }

    await m.validate()
    if (!model.validations.isTruelyValid) {
      throw new Error();
    }
  }
}
