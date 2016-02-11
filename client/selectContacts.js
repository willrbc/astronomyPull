Template.selectContacts.helpers({
  contacts: function(){
    return Contacts.find();
  }
});
Template.selectContacts.events({
  "click .newContact": function (e, tmpl) {
    var data = {
      contact: new Models.Contacts.Person(),
      isNew: true
    };
    Modal.show('editContact', data, {}, tmpl.view);
  },
  "click .editContact": function (e, tmpl) {
    var data = {
      contact: this,
      isNew: false
    };
    console.log(data.contact);
    Modal.show('editContact', data, {}, tmpl.view);
  }
});

Template.selectContacts.onRendered(function () {
  //this.subscribe("company", this.data.company._id);
});

Template.selectContacts.onCreated(function () {
  this.getContact = () => {
    return (Contacts.findOne());
  };
});
