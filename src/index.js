require('dotenv').config()
const express           =   require('express');
const { graphqlHTTP }   =   require('express-graphql');
const schema            =   require('./schema/schema');
const dbConnection      =   require('../src/config/db');


const PORT      =    process.env.PORT || 7070;
dbConnection();

const app       = express();
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql : true
}));

app.listen(PORT, (error) =>{
    if(error) console.log('error :'+error)
    console.log('The Server Is Running On Port: '+ PORT);
})