import EmberObject from '@ember/object';
import { setOwner, getOwner } from '@ember/application';
import { moduleForComponent, test } from 'ember-qunit';
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

moduleForComponent('bs-form-element', 'Integration | Component | bs form element', {
  integration: true
});

test('valid validation is supported as expected', function(assert) {
  let model = Model.create({
    test: '123'
  });
  setOwner(model, getOwner(this));

  this.set('model', model);
  this.on('submitAction', function() {
    assert.ok(true, 'submit action has been called.');
  });
  this.on('invalidAction', function() {
    assert.ok(false, 'Invalid action must not been called.');
  });

  this.render(hbs`
    {{#bs-form model=model onSubmit=(action "submitAction") onInvalid=(action "invalidAction") as |form|}}
      {{form.element label="test" property="test"}}
    {{/bs-form}}
  `);

  assert.expect(1);

  this.$('form').submit();
});

test('invalid validation is supported as expected', function(assert) {
  let model = Model.create();
  setOwner(model, getOwner(this));

  this.set('model', model);
  this.on('submitAction', function() {
    assert.ok(false, 'submit action must not been called.');
  });
  this.on('invalidAction', function() {
    assert.ok(true, 'Invalid action has been called.');
  });

  this.render(hbs`
    {{#bs-form model=model onSubmit=(action "submitAction") onInvalid=(action "invalidAction") as |form|}}
      {{form.element label="test" property="test"}}
    {{/bs-form}}
  `);

  assert.expect(2);

  this.$('form').submit();
  assert.ok(this.$('.form-group').hasClass('has-error'), 'form element group has error class');
});
