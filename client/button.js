Template.button.onRendered(function(){
  if(this.data.tooltip){
    Template.instance().$('button').tooltip();
  }
});

Template.button.onCreated(function(){
  if (this.data.confirm){
    this.state = new ReactiveDict();
    this.state.setDefault({
      clicked:false
    });
  }
});


Template.button.events({
  'click button': function(e, tmpl){
    $(e.currentTarget).tooltip('hide');
    if(tmpl.data.confirm && !tmpl.state.get('clicked')){
      e.stopPropagation();
      e.preventDefault();
      tmpl.state.set('clicked', true);
    }
  }
});

Template.tooltip.events({
  'click button': function(e, tmpl){
    $(e.currentTarget).tooltip('hide');
  }
});

Template.tooltip.onRendered(function(){
  if(this.data.tooltip){
    Template.instance().$('span').tooltip();
  }
});
