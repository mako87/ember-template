import Ember from "ember";

const {inject : {service}, Controller, get } = Ember;

export default Controller.extend({

    session: service("session"),

    actions:{
        authenticate(username,password){
            return get(this,"session").authenticate('authenticator:jwt',{identification:username,password:password})
                .catch((reason)=>{
                    console.log(reason);
                    this.set('errorMessage',reason);
                });
        }
    }
});
