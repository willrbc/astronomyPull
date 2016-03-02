Models = {
  Contacts: {}
};


Models.Contacts.Nested = Astro.Class({
  name: 'Models.Contacts.Nested',
  fields: {
    numberWithDefault: {
      type: 'number',
       default: 1
    },
    numberWithoutDefault: {
      type: 'number'
    }
  }
});

Contacts = new Meteor.Collection("contacts");

Models.Contacts.Person = Astro.Class({
  name: 'Models.Contacts.Person',
  behaviors: ['timestamp'],
  collection: Contacts,
  fields: {
    topLevelNumber: {
      type: 'number',
      default: 1
    },
    nestedNumbers: {
      type: 'array',
      nested: 'Models.Contacts.Nested',
      optional: true,
      default: function () {
        return [new Models.Contacts.Nested()];
      }
    }
  },
  validators: {
    emails: Validators.length(1),
    position: Validators.maxLength(100, 'This value is too long')
  }
});
