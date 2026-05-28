const { GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLList, GraphQLInt, GraphQLID } = require('graphql');

const Review = new GraphQLObjectType({
    name: 'Review',
    fields: {
        rating: {
            type: GraphQLInt,
            required: true,
        },
        comment: {
            type: GraphQLString
        }
    }
});

const Product = new GraphQLObjectType({
    name: 'Product',
    fields: {
        id: {
            type: GraphQLID,
            required: true
        },
        description: {
            type: GraphQLString,
            required: true,
        },
        reviews: {
            type: new GraphQLList(Review),
        },
        price: {
            type: GraphQLFloat,
            required: true,
        },
    }
});

module.exports = {
    Review,
    Product
}