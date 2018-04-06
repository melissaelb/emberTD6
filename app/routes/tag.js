import Route from '@ember/routing/route';
import RSVP from 'rsvp';



export default Route.extend({
  model(){
    return RSVP.hash({
      tag:this.get('store').findAll('tag'),
      fields:['title','color'],
      operations:[{icon:'remove red',link:'tag.delete'},{icon:'edit',link:'tag.update'}]

    });
  }
});
