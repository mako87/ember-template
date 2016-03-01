import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const {inject: {service}, get, Route } = Ember;

export default Route.extend(AuthenticatedRouteMixin,{
    session: service("session"),
    actions: {
        invalidate(){
            get(this,"session").invalidate();
        }
    }
});
