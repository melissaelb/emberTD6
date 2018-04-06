import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import EmberObject from '@ember/object';

export default Route.extend({
  model(params){
    return new RSVP.hash({
      tag: this.get('store').findRecord('tag',params.tag_id),
      idTags:[],
      tags: this.get('store').findAll('tag'),
      colors:['black','blue','green','orange','pink','purple','red','teal','yellow','positive','negative'],
    });
  },
  afterModel(model){
    Ember.set(model,'data',EmberObject.create(JSON.parse(JSON.stringify(model.tag))));
  },
  actions:{
    save(tag,data){
     let model = this.modelFor(this.routeName);
     let idTags=Ember.get(model,'idTags');
      let tags=Ember.get(model,'tags').filter((item, index, self) => idTags.includes(item.id));
      tag.set('tags',tag);
      Ember.set(tag,'title',data.title);
      Ember.set(tag,'color',data.color);
      tag.save().then(()=>{
        this.transitionTo("tag");
      })
    },
    cancel(){
      this.transitionTo("tag");
    }
  }
});
