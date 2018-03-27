import EmberObject from '@ember/object';
import { setOwner } from '@ember/application';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  test: [
    validator('presence', true)
  ]
});
const Model = EmberObject.extend(Validations, {
  test: null
});

module('Integration | Component | bs form element', function(hooks) {
  setupRenderingTest(hooks);

  test('valid validation is supported as expected', async function(assert) {
    let model = Model.create({
      test: '123'
    });
    setOwner(model, this.owner);

    this.set('model', model);
    this.submitAction = function() {
      assert.ok(true, 'submit action has been called.');
    };
    this.invalidAction = function() {
      assert.ok(false, 'Invalid action must not been called.');
    };

    await render(hbs`
      {{#bs-form model=model onSubmit=(action submitAction) onInvalid=(action invalidAction) as |form|}}
        {{form.element label="test" property="test"}}
      {{/bs-form}}
    `);

    assert.expect(1);

    await triggerEvent('form', 'submit');
  });

  test('invalid validation is supported as expected', async function(assert) {
    let model = Model.create();
    setOwner(model, this.owner);

    this.set('model', model);
    this.submitAction = function() {
      assert.ok(false, 'submit action must not been called.');
    };
    this.invalidAction = function() {
      assert.ok(true, 'Invalid action has been called.');
    };

    await render(hbs`
      {{#bs-form model=model onSubmit=(action submitAction) onInvalid=(action invalidAction) as |form|}}
        {{form.element label="test" property="test"}}
      {{/bs-form}}
    `);

    assert.expect(2);

    await triggerEvent('form', 'submit');
    assert.ok(find('.form-group').classList.contains('has-error'), 'form element group has error class');
  });
});
