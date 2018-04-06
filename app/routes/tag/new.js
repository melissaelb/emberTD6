import Route from '@ember/routing/route';
import EmberObject from '@ember/object';
import RSVP from 'rsvp';
import Ember from 'ember';


export default Route.extend({
  model(){
    return RSVP.hash({
      tag: EmberObject.create({color:'red'}),
      idTags:[],
      tags: this.get('store').findAll('tag'),
      colors:['black','blue','green','orange','pink','purple','red','teal','yellow','positive','negative'],
    });
  },

  actions:{
    save:function(oldValue,newValue){
      let model = this.modelFor(this.routeName);
      let tag=this.get('store').createRecord('tag',JSON.parse(JSON.stringify(newValue)));
      let idTags=Ember.get(model,'idTags');
      let tags=Ember.get(model,'tags').filter((item, index, self) => idTags.includes(item.id));
      tag.set('tags',tags);
      tag.save().then(()=>{this.transitionTo("tag");}).
      catch((error)=>console.log(error));
    },
    cancel(){
      this.transitionTo("tag");
    }
  }
});
