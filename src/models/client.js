const mongoose  =   require('mongoose');

const clientSchema  =  new mongoose.Schema({
    name : {
        type : String
    },
    email : {
        type : String
    },
    phone : {
        type : String
    }
},{collection:'client'})

const client  =   mongoose.model('client', clientSchema);

module.exports  = { client }