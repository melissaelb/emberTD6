import Route from '@ember/routing/route';
import EmberObject from '@ember/object';
import RSVP from 'rsvp';

export default Route.extend({
  model(params){
    return new RSVP.hash({
      step: this.get('store').findRecord('step',params.step_id)
    });
  },
  afterModel(model){
    Ember.set(model,'data',EmberObject.create(JSON.parse(JSON.stringify(model.step))));
  },
  actions:{
    save(step,data){
      Ember.set(step,'title',data.title);
      step.save().then(()=>{
        this.transitionTo("step");
      })
    },
    cancel(){
      this.transitionTo("step");
    }
  }
});
