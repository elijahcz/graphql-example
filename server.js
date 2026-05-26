const express = require('express');
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLFloat } = require('graphql');
const { createHandler } = require('graphql-http/lib/use/express');
const { ruruHTML } = require('ruru/server');

// TEST BY SENDING POST REQUEST FROM POSTMAN WITH BODY: 
// { "query": "{ description }" }

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            description: {
                type: GraphQLString,
                resolve: () => 'Red Show'
            },
            price: {
                type: GraphQLFloat,
                resolve: () => 42.04
            }
        }
    }),
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