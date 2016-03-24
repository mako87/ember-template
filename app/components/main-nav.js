import Ember from 'ember';

const {inject: {service}, Component, get} = Ember;

export default Component.extend({
    session: service('session'),
    actions: {
        invalidate(){
            get(this,'session').invalidate();
        }
    }
});
