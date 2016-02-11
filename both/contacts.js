

Models = {
  Contacts: {}
};

Models.Contacts.Country = Astro.Class({
  name: 'Models.Contacts.Country',
  fields: {
    name: {
      type: 'string'
    },
    code: {
      type: 'string'

    }
  },
  validators: {
    code: Validators.regexp('/^[A-Z]{2}$/')
  }
});


Models.Contacts.PhoneNumber = Astro.Class({
  name: 'Models.Contacts.PhoneNumber',
  fields: {
    phoneNumberId: {
      type: 'string',
      immutable: true,
      default: function () {
        return Random.id();
      }
    },
    type: {
      type: 'string',
      allowedValues: Validators.choice(['Home', 'Office', 'Direct', 'Mobile', 'Work Mobile', 'Fax']),
      default: 'Office'
    },
    number: {
      type: 'string'
        // optional: Modules.Syncing.check
    }
  }
});

Models.Contacts.Name = Astro.Class({
  name: 'Models.Contacts.Name',
  fields: {
    title: {
      type: 'string',
      optional: true
    },
    first: {
      type: 'string'

    },
    last: {
      type: 'string'

    }
  },
  validators: {
    title: Validators.maxLength(8, "Title too long"),
    first: Validators.and([
      Validators.required('Please provide a first name'),
      Validators.maxLength(100, "First name too long")
    ]),
    last: Validators.and([
      Validators.required('Please provide a last name'),
      Validators.maxLength(100, "Last name too long")
    ]),
  },
  methods: {
    fullName: function () {
      if (this.first && this.last) {
        return this.first + ' ' + this.last;
      } else if (this.first) {
        return this.first;
      } else if (this.last) {
        return this.last;
      }
    },
    initials: function () {
      return this.fullName()
        .match(/\b(\w)/g)
        .join("");
    }
  }
});

Contacts = new Meteor.Collection("contacts");

Models.Contacts.Person = Astro.Class({
  name: 'Models.Contacts.Person',
  collection: Contacts,
  fields: {
    name: {
      type: 'object',
      nested: 'Models.Contacts.Name',
      default: function () {
        return new Models.Contacts.Name();
      }
    },
    position: {
      type: 'string',
      optional: true
    },
    telephone: {
      type: 'array',
      nested: 'Models.Contacts.PhoneNumber',
      validator: Validators.minLength(0),
      optional: true,
      default: function () {
        return [new Models.Contacts.PhoneNumber()];
      }
    }
  },
  validators: {
    emails: Validators.length(1),
    position: Validators.maxLength(100, 'This value is too long')
  }
});
