import EmberObject from '@ember/object';
import ObjectProxy from '@ember/object/proxy';
import { setOwner } from '@ember/application';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, triggerEvent, blur, fillIn, focus } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { buildValidations, validator } from 'ember-cp-validations';

const Validations = buildValidations({
  test: [
    validator('presence', true)
  ]
});
const Model = EmberObject.extend(Validations, {
  test: null
});
const BufferedModel = ObjectProxy.extend(Validations, {
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
      <BsForm @model={{this.model}} @onSubmit={{this.submitAction}} @onInvalid={{this.invalidAction}} as |form|>
        <form.element @label="test" @property="test" />
      </BsForm>
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
      <BsForm @model={{this.model}} @onSubmit={{this.submitAction}} @onInvalid={{this.invalidAction}} as |form|>
        <form.element @label="test" @property="test" />
      </BsForm>
    `);

    assert.expect(2);

    await triggerEvent('form', 'submit');
    assert.dom('input').hasClass('is-invalid', 'input has error class');
  });

  test('validations are reactive', async function(assert) {
    let model = Model.create({
    });
    setOwner(model, this.owner);

    this.set('model', model);

    await render(hbs`
      <BsForm @model={{this.model}} as |form|>
        <form.element @label="test" @property="test" />
      </BsForm>
    `);

    await focus('input');
    await blur('input');
    assert.dom('input').hasClass('is-invalid', 'input has error class');

    await fillIn('input', 'xxx');
    await blur('input');

    assert.dom('input').hasNoClass('is-invalid', 'input has no error class');
  });

  test('valid validation is supported as expected when working with an ember-buffered-proxy model', async function(assert) {
    let proxiedModel = EmberObject.create();
    setOwner(proxiedModel, this.owner);

    let model = BufferedModel.create({
      content: proxiedModel,
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
      <BsForm @model={{this.model}} @onSubmit={{this.submitAction}} @onInvalid={{this.invalidAction}} as |form|>
        <form.element @label="test" @property="test" />
      </BsForm>
    `);

    assert.expect(1);

    await triggerEvent('form', 'submit');
  });

  test('invalid validation is supported as expected when working with an ember-buffered-proxy model', async function(assert) {
    let proxiedModel = EmberObject.create();
    setOwner(proxiedModel, this.owner);

    let model = BufferedModel.create({
      content: proxiedModel
    });
    setOwner(model, this.owner);

    this.set('model', model);
    this.submitAction = function() {
      assert.ok(false, 'submit action must not been called.');
    };
    this.invalidAction = function() {
      assert.ok(true, 'Invalid action has been called.');
    };

    await render(hbs`
      <BsForm @model={{this.model}} @onSubmit={{this.submitAction}} @onInvalid={{this.invalidAction}} as |form|>
        <form.element @label="test" @property="test" />
      </BsForm>
    `);

    assert.expect(1);

    await triggerEvent('form', 'submit');
  });

  test('error is not generated when a model is not supplied when component.formElements are not used ', async function(assert) {
    let name;
    this.set('name', name);
    
    this.submitAction = function() {
      assert.ok(true, 'submit action called.');
    };
    this.invalidAction = function() {
      assert.ok(true, 'Invalid action has been called.');
    };

    await render(hbs`
      <BsForm @onSubmit={{this.submitAction}} @onInvalid={{this.invalidAction}}>
        <Input @type="text" @value={{this.name}} />
      </BsForm>
    `);

    assert.expect(1);

    await triggerEvent('form', 'submit');
  });
});
