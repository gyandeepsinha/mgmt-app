const mongoose  =   require('mongoose');

const projectSchema =   new mongoose.Schema({
    name : {
        type : String
    },
    description : {
        type : String
    },
    status : {
        type : String,
        enum : ['Not Started', 'In Progress', 'Completed']
    },
    clientId : {
        type : mongoose.Schema.Types.ObjectId,
        ref  : 'client'
    }
},{collection:'project'})

const project  =   mongoose.model('project', projectSchema);

module.exports = { project };
