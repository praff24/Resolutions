Resolutions = new Mongo.Collection('resolutions');
Meteor.methods({
  addResolution: function(title){
    Resolutions.insert({
      title:title,
      createdAt: new Date(),
      owner: Meteor.userId()
    });
  },
  deleteResolution: function(id){
        var res = Resolutions.findOne(id);
        if(res.owner !==Meteor.userId()){
          throw new Meteor.Error('not authorized');
        }
    Resolutions.remove(id);
  },
  updateResolution: function (id, checked) {
    var res = Resolutions.findOne(id);
    if(res.owner !==Meteor.userId()){
      throw new Meteor.Error('not authorized');
    }
      Resolutions.update(id,{$set: {checked: checked}});
  },
  setPrivate: function (id,private) {
    var res = Resolutions.findOne(id);
    if(res.owner !==Meteor.userId()){
      throw new Meteor.Error('not authorized');
    }
      Resolutions.update(id,{$set: {private: private}});
  }
});
