const userResolvers = require('./user');
const shopResolvers = require('./shop');
const productResolvers = require('./product');
const cartResolvers = require('./cart');
const orderResolvers = require('./order');

module.exports = {
    Query: {
        ...userResolvers.Query,
        ...shopResolvers.Query,
        ...productResolvers.Query,
        ...cartResolvers.Query,
        ...orderResolvers.Query,
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...shopResolvers.Mutation,
        ...productResolvers.Mutation,
        ...cartResolvers.Mutation,
        ...orderResolvers.Mutation,
    },

};