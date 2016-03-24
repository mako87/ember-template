import DS from 'ember-data';

const {JSONSerializer} = DS;

export default JSONSerializer.extend({
    normalize(typeClass,hash){
        let obj = {};
        obj[typeClass.modelName] = hash;
        hash = obj;
        return this._super.apply(this, arguments);
    }
});
