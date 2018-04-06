import Route from '@ember/routing/route';
import RSVP from 'rsvp';



export default Route.extend({
  model(){
    return RSVP.hash({
      step:this.get('store').findAll('step'),
      fields:['title'],
      operations:[{icon:'red remove',link:'step.delete'},{icon:'edit',link:'step.update'}]
    });
  }
});
