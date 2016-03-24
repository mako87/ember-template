import Ember from 'ember';

const {inject : {service}, get, set, Service, observer, Logger} = Ember;

export default Service.extend({

    session: service('session'),
    store: service('store'),

    init: function(){
        this._super(...arguments);
        this._subscribers = {};
        get(this,'session');
    },

    setup(token){
        const socket = window.io.connect('ws://',{
            'forceNew':true,
            'query': 'token='+token
        });
        socket.on("connect",()=> this.connectHandler());
        socket.on('error',()=>this.errorHandler());
        socket.on('disconnect',()=>this.disconnectHandler());
        set(this,'socket',socket);
    },

    connectHandler(){
        set(this,"connected",true);
    },

    errorHandler(e){
        Logger.error(e);
    },

    disconnectHandler(){
        get(this,'session').invalidate();
    },

    observesToken: observer('session.session.content.authenticated.token', function(){
        const token = get(this,'session.session.content.authenticated.token');
        if (token){
            Ember.run(()=>{ this.setup(token); });
        }
    }),

    observesUser: observer('session.session.content.authenticated.user',function(){
        const user = get(this,'session.session.content.authenticated.user');
        const store = get(this,'store');
        if (user){
            Ember.run(()=>{
                set(this,'session.user',store.push(store.normalize('user',user)));
            });
        }
    })
});
