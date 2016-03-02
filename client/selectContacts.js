Template.selectContacts.helpers({
  contacts: function(){
    return Contacts.find();
  }
});
Template.selectContacts.events({
  "click .newContact": function (e, tmpl) {
    var c = new Models.Contacts.Person();
    c.save();
  },
  "click .newNested": function (e, tmpl) {
    
    this.push("nestedNumbers", new Models.Contacts.Nested());
    this.save();
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
