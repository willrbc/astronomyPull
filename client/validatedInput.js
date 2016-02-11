Template.validatedInput.helpers({
  value: function () {
    return Template.instance()
      .data.doc[Template.instance()
        .data.fieldName];
  }
});

Template.validatedInput.events({
  "blur input": function (e, tmpl) {
    var doc = this.doc; // Instance of User, Phone or Address class.
    var input = e.currentTarget;
    // Set a value of a field in an instance of User, Phone or Address class.
    doc.set(input.id, input.value);
    // Validate given field.
    tmpl.state.set('valid', doc.validate(input.id) ? true : false);
    tmpl.state.set('set', (input.value !== "") ? true : false);
    tmpl.state.set('validNotEmpty', (input.value !== "" && doc.validate(input.id)) ? true : false);
    // console.log(input.id, doc, Template.parentData(1), Template.parentData(2), doc.validate(input.id));
  },
  'focus input': function (e) {
    $(e.currentTarget)
      .select();
  }
});

Template.validatedInput.onCreated(function () {
  this.state = new ReactiveDict();
  this.state.setDefault({
    valid: false,
    set: false,
    validNotEmpty: false
  });
});
