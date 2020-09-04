ember-bootstrap-cp-validations
==============================================================================

[![npm version](https://badge.fury.io/js/ember-bootstrap-cp-validations.svg)](http://badge.fury.io/js/ember-bootstrap-cp-validations)

This Ember addon adds support for validations based on [Ember CP Validations](https://github.com/offirgolan/ember-cp-validations) to [ember-bootstrap](https://www.ember-bootstrap.com) forms.
This way your forms are only submitted when the underlying data is valid, otherwise the appropriate bootstrap error
markup will be applied. See the [FormElement documentation](https://www.ember-bootstrap.com/api/classes/Components.FormElement.html) for
further details.

Compatibility
------------------------------------------------------------------------------

* Ember Bootstrap v3
* Ember CP Validations v3
* Ember.js v3.12 or above
* Ember CLI v2.13 or above
* Node.js v10 or above


Installation
------------------------------------------------------------------------------

```
ember install ember-bootstrap-cp-validations
```

You should have installed the ember-bootstrap and ember-cp-validations addons already. If not install them:

```
ember install ember-bootstrap
ember install ember-cp-validations
```

Usage
------------------------------------------------------------------------------

Define your model and its validations as described in [Ember CP Validations](https://github.com/offirgolan/ember-cp-validations).
Then assign the model to your form:

```hbs
<BsForm @model={{changeset this.user this.userValidations}} as |form|>
  <form.element @label="Username" @controlType="text" @property="username" />
  <form.element @label="Email" @controlType="email" @property="email" />
  <form.element @label="Password" @controlType="password" @property="password" />
  <form.submitButton>Submit</form.submitButton>
</BsForm>
```

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
