const express = require('express');
const path = require('path');

const { createHandler } = require('graphql-http/lib/use/express');
const { ruruHTML } = require('ruru/server');

const { loadFilesSync } = require('@graphql-tools/load-files');
const { makeExecutableSchema } = require('@graphql-tools/schema');

// const typesArray = loadFilesSync(path.join(__dirname, "**/*.graphql"));
const typesArray = loadFilesSync(["./products/products.graphql", "./orders/orders.graphql"]);

const schema = makeExecutableSchema({
    typeDefs: typesArray
});

const root = {
    products: require('./products/products.model'),
    orders: require('./orders/orders.model')
};

const app = express();

app.use('/graphql', createHandler({schema: schema, rootValue: root }));

app.get('/', (_req, res) => {
    res.type('html');
    res.end(ruruHTML({ endpoint: '/graphql' }));
});

const PORT = 4000;

app.listen(PORT, () => {
    console.log(`Running our GraphQL Server on PORT ${PORT}`);
});