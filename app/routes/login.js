import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

const {inject: {service}, get, Route} = Ember;

export default Route.extend(UnauthenticatedRouteMixin,{
});
