const { GraphQLObjectType, GraphQLList } = require('graphql');
const { Product } = require('./products/products.graphql');
const { productsList } = require('./products/products.model');
const { Order } = require('./products/products.graphql');
const { ordersList } = require('./products/orders.model');

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        products: {
            type: new GraphQLList(Product),
            async resolve(res, args) {
                return productsList;
            }
        },
        orders: {
            type: new GraphQLList(Order),
            async resolve(res, args) {
                return ordersList;
            }
        }
    }
});

const Schema = new GraphQLSchema({
    query: RootQuery
});

module.exports = {
    RootQuery,
    Schema
}