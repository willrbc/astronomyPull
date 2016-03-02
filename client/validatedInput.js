Template.validatedInput.helpers({
  value: function () {
    return Template.instance()
      .data.context[Template.instance()
        .data.fieldName];
  }
});

Template.validatedInput.events({
  "change input": function (e, tmpl) {
    var context = this.context; // Instance of User, Phone or Address class.
    var input = e.currentTarget;
    // Set a value of a field in an instance of User, Phone or Address class.
    context.set(input.id, input.value);
    // Validate given field.
    tmpl.state.set('valid', context.validate(input.id) ? true : false);
    tmpl.state.set('set', (input.value !== "") ? true : false);
    tmpl.state.set('validNotEmpty', (input.value !== "" && context.validate(input.id)) ? true : false);
    if (tmpl.data.autoSave){
      tmpl.data.doc.save();
    }

    // console.log(input.id, context, Template.parentData(1), Template.parentData(2), context.validate(input.id));
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
