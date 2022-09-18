const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull }   = require('graphql');
const { project }   = require('../models/project');
const { client  }   = require('../models/client');


// Client Collection Type
const ClientType    = new GraphQLObjectType({
    name : 'client',
    fields:() => ({
        _id     : { type: GraphQLID },
        name    : { type: GraphQLString },
        email   : { type: GraphQLString },
        phone   : { type: GraphQLString }
    })
});

// Project Collection Type
const ProjectType   = new GraphQLObjectType({
    name : 'project',
    fields:() =>({
        _id         :   { type: GraphQLID },
        clientId    :   { type: GraphQLID },
        name        :   { type: GraphQLString },
        description :   { type: GraphQLString },
        status      :   { type: GraphQLString },
        client      :   {
            type    :   ClientType,
            async resolve(parent, args){
                return await client.findById(parent.clientId);
            }
        }
    })
});

// GraphQL Queries
const RootQuery = new GraphQLObjectType({
    name  : 'RootQueryType',
    fields  : {
        projects :{
            type : new GraphQLList(ProjectType),
            async resolve(parent, args){
                return await project.find();
            }
        },
        project :{
            type : ProjectType,
            args: {id: {type : GraphQLID}},
            async resolve(parent, args){
                return await project.findById(args.id);
            }
        },
        clients : {
            type : new GraphQLList(ClientType),
            async resolve(parent, args){
                return await client.find({}); 
            }
        },
        client : {
            type : ClientType,
            args : {id: { type: GraphQLID }},
            async resolve(parent, args){
                return await client.findById(args.id);
            }
        }
    }
});
// Add Mutation
const mutation  = new GraphQLObjectType({
    name : 'Mutation',
    fields : {
        addClient : {
            type : ClientType,
            args : {
                name  : {type : GraphQLNonNull(GraphQLString)},
                email : {type : GraphQLNonNull(GraphQLString)},
                phone : {type : GraphQLNonNull(GraphQLString)}
            },
            async resolve(parent, args){
                const clientObject = new client({
                    name  : args.name,
                    email : args.email,
                    phone : args.phone
                });
                return await clientObject.save();                
            }
        },
        updateClient : {
            type : ClientType,
            description : 'Updadate client By clientId',
            args : {
                id    : { type : GraphQLNonNull(GraphQLID) },
                name  : { type : GraphQLNonNull(GraphQLString)},
                email : { type : GraphQLNonNull(GraphQLString)},
                phone : { type : GraphQLNonNull(GraphQLString)}
            },
            async resolve(parent, args){
                return await client.findByIdAndUpdate( args.id,{$set:{...args},}, {new : true} );
            }
        },
        deleteClient : {
            type : ClientType,
            args : {id : {type : GraphQLNonNull(GraphQLID)}},
            async resolve(parent, args){
               return await client.findByIdAndRemove(args.id);                
            }
        },
        addProject : {
            type : ProjectType,
            args : {
                clientId    : {type : GraphQLNonNull(GraphQLID)},
                name        : {type : GraphQLNonNull(GraphQLString)},
                description : {type : GraphQLNonNull(GraphQLString)},
                status      : {type : GraphQLNonNull(GraphQLString)}
            },
            async resolve(parent, args){
                const projectObject = new project({
                    clientId    : args.clientId,
                    name        : args.name,
                    description : args.description,
                    status      : args.status
                });
                return await project.save();
            }
        },
        updateProject :{
            type : ProjectType,
            args :{
                id          : { type : GraphQLNonNull(GraphQLID) },
                name        : { type : GraphQLNonNull(GraphQLString)},
                description : { type : GraphQLNonNull(GraphQLString)},
                status      : { type : GraphQLNonNull(GraphQLString)},
            },
            async resolve(parent, args){
                return await project.findByIdAndUpdate(args.id,{ $set : {...args}}, {new : true});
            }
        },
        deleteProject : {
            type : ProjectType,
            args : {id : { type : GraphQLNonNull(GraphQLID)}},
            async resolve(parent, args){
                return project.findByIdAndRemove(args.id);
            }
        }
    }
});
// Exporting Modules & Mutations
module.exports  =   new GraphQLSchema({
    query    : RootQuery,
    mutation
});


