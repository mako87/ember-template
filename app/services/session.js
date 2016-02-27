import Ember from 'ember';

export default Ember.Service.extend({

    url: '/session-auth',
    token: null,
    user: null,

    authenticate(credentials){
        return new Ember.RSVP.Promise(function(resolve,reject){
            Ember.$.post({
                url:         this.url,
                data:        JSON.stringify({ username: credentials.username, password: credentials.password}),
                dataType:    "json"
            }).then(function(response) {
                if (response) {
                    this.token = response.token;
                    this.set('user',this.store.push(this.store.normalize('user',response.user)));
                } else {
                    reject("Authentication failed");
                }
            }.bind(this)).fail(function(e){
                reject(e);
            });
        }.bind(this));
    }
});
