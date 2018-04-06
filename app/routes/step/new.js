import Route from '@ember/routing/route';
import EmberObject from '@ember/object';
import RSVP from 'rsvp';
import Ember from 'ember';


export default Route.extend({
  model(){
    return RSVP.hash({
      step: EmberObject.create({})
    });
  },

  actions:{
    save:function(oldValue,newValue){
      let step=this.get('store').createRecord('step',JSON.parse(JSON.stringify(newValue)));
      step.save().then(()=>{this.transitionTo("step");}).
      catch((error)=>console.log(error));
    },
    cancel(){
      this.transitionTo("step");
    }
  }
});
