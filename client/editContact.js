var contact;

Template.editContact.helpers({
  getContact() {
    return contact.get();
  }
});

Template.editContact.events({
  "submit .editContact": function (e, tmpl) {
    e.preventDefault();
    // console.log(tmpl.data.contact);
    var p = contact.get();

    if (p.validate()) {
      p.save();
      // if (tmpl.data.isNew) {
      // } else {
      //   company.save();
      // }
      Modal.hide('editContact');
    }

  },
  'click .deleteContact': function (e, tmpl) {
    e.stopPropagation();
    var p = contact.get();
    p.remove();
    Modal.hide('editContact');
  },
  "click .cancel": function (e, tmpl) {
    Modal.hide('editContact');
  },
  'click .addTelephone': function (e, tmpl) {
    // console.log('addTelephone');
    var p = contact.get();
    p.push('telephone', new Models.Contacts.PhoneNumber());
    contact.set(p);
  },

  'click .deleteTelephone': function (e, tmpl) {
    e.stopPropagation();
    var p = contact.get();
    console.log("using 2nd in index for comparison.  Delete 2nd telephone number to return true", p.telephone[1] === this.doc, p.telephone[1], this.doc); //Compare telephone find it is the same
    p.pull('telephone', this.doc);
    // console.log(p.telephone[1], this.doc);
    contact.set(p);
  },
  'click .selectType li a': function (e, tmpl) {
    e.stopPropagation();
    e.preventDefault();
    // console.log(e.currentTarget.text);
    this.set('type', e.currentTarget.text);
    $(e.currentTarget)
      .parent()
      .parent()
      .siblings('button.selectType')
      .text(e.currentTarget.text);
    // this.doc.set('type', this)
  }
});

Template.editContact.onCreated(function () {
  // console.log(this);
  // this.$('#addContact').modal('show');
  contact = new ReactiveVar(this.data.contact);
});

Template.editContact.onDestroyed(function () {
  // console.log(this);
  // this.$('#addContact').modal('hide');
});
