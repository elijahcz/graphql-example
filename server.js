const express = require('express');
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLList, GraphQLInt, GraphQLID } = require('graphql');
const { createHandler } = require('graphql-http/lib/use/express');
const { ruruHTML } = require('ruru/server');

// TEST BY SENDING POST REQUEST FROM POSTMAN WITH BODY: 
// { "query": "{ description }" }
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

const productsList = [
    {
        id: 1,
        description: 'Red Shoe',
        price: 8.80,
    },
    {
        id: 2,
        description: 'Blue Jeans',
        price: 19.90
    }
];

const ordersList = [
    {
        date: "2026-05-01",
        subtotal: 48.60,
        items: [
            {
                product: {
                    id: 1,
                    description: 'Red Shoe',
                    price: 8.80,                
                }, 
                quantity: 1
            },
            {
                product: {
                    id: 2,
                    description: 'Blue Jeans',
                    price: 19.90
                }, 
                quantity: 2
            }
        ]
    }
];


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


const schema = new GraphQLSchema({
    query: RootQuery
});


const app = express();  

app.use('/graphql', createHandler({ schema }));

// 4. Serve GraphiQL IDE (using ruru)
app.get('/', (_req, res) => {
  res.type('html');
  res.end(ruruHTML({ endpoint: '/graphql' }));
});


const PORT = 4000;

app.listen(PORT, () => {
    console.log(`Running our GraphQL Server on PORT ${PORT}`);
});