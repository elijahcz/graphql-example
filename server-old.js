const express = require('express');
const { buildSchema } = require('graphql');
const { graphqlHTTP } = require('graphql-http');

const schema = buildSchema(`
    type Query {
        description: String
        price: Float
    }
`);

const root = {
    description: 'Red Shoe',
    price: 42.12
}

const app = express();  

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root
}));

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Running our GraphQL Server on PORT ${PORT}`);
});

