
import Ember from 'ember';
import DS from "ember-data";

const {inject : {service}, get, run} = Ember;

export default DS.Adapter.extend({

    websocket: service("websocket"),

    init: function() {
        this._super(...arguments);
    },

    makeSocketRequest : function (store, request) {

        return new Ember.RSVP.Promise((resolve, reject) => {
            get(this,"websocket").socket.emit('ember-request', request, function (err,data) {
                if (err) {run(null, reject, err);}
                else {run(null, resolve, data);}
            });
        });
    },

    createRecord: function(store, type, snapshot) {
        var data = this.serialize(snapshot, { includeId: true });
        return this.makeSocketRequest(store, {
            cmd: 'create',
            params: [type.modelName, data]
        });
    },

    findRecord: function (store, type, id) {
        return this.makeSocketRequest( store, {
            cmd: 'find',
            params: [type.modelName, id]
        });
    },

    findMany: function(store, type, ids) {
        return this.makeSocketRequest(store, {
            cmd: 'findAll',
            params : [type.modelName,{ where : {id :{'in': ids }}}]
        });
    },

    findAll: function(store, type ) {
        return this.makeSocketRequest(store, {
            cmd: 'findAll',
            params : [type.modelName]
        });
    },

    query: function(store, type, query) {
        return this.makeSocketRequest(store, {
            cmd: 'findAll',
            params : [type.modelName,query]
        });
    },

    updateRecord: function(store, type, snapshot) {
        var data = this.serialize(snapshot);
        return this.makeSocketRequest(store, {
            cmd: 'update',
            params : [type.modelName,snapshot.id,data]
        });
    },

    deleteRecord: function(store, type, snapshot) {
        var id = snapshot.id;
        return this.makeSocketRequest(store, {
            cmd: 'destroy',
            params : [type.modelName,id]
        });
    }

});
