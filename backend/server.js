const { ApolloServer, gql } = require('apollo-server');
const jwt = require('jsonwebtoken');
const { auth } = require("./config/auth");
const typeDefs = require('./src/graphql/typeDefs'); // The GraphQL schema

const resolvers = require('./src/graphql/resolvers'); //// A map of functions which return data for the schema.
var db = require('./config/db.config');
auth();


const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req }),
});



server.listen({ port: 4001 }).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});