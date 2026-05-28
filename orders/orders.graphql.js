const { GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLList, GraphQLInt } = require('graphql');
const { Product } = require('../products/products.graphql');

const OrderItem = new GraphQLObjectType({
    name: 'OrderItem',
    fields: {
        product: {
            type: Product,
            required: true,
        },
        quantity: {
            type: GraphQLInt,
            required: true,
        }
    }
});

const Order = new GraphQLObjectType({
    name: 'Order',
    fields: {
        date: {
            type: GraphQLString,
            required: true,
        },
        subtotal: {
            type: GraphQLFloat,
            required: true,
            
        },
        items: {
            type: new GraphQLList(OrderItem),
        }
    }
});

module.exports = {
    Order,
    OrderItem
};