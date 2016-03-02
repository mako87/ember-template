import Ember from 'ember';

const {inject : {service}, get, set, Service, observer} = Ember;

export default Service.extend({

    session: service("session"),

    init: function(){
        this._super(...arguments);
        this._subscribers = {};
        get(this,"session");
    },

    setup(token){
        const socket = window.io.connect('ws://localhost:4000',{
            "forceNew":true,
            "query": "token="+token
        });
        socket.on("connect",this.connectHandler);
        socket.on('error',this.errorHandler);
        set(this,'socket',socket);
    },

    connectHandler(){
        console.log("Socket connected");
    },

    errorHandler(e){
        console.log(e);
    },

    observesAuth: observer('session.session.content.authenticated.token', function(){
        const token = get(this,'session.session.content.authenticated.token');
        if (token){
            Ember.run(()=>{ this.setup(token); });
        }
    })
});
