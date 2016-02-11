
Template.registerHelper('getState', (key) => {
  //  console.log(Template.instance(), key);
  return Template.instance().state.get(key);
});
