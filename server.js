const express = require('express');
const path = require('path');

const { createHandler } = require('graphql-http/lib/use/express');
const { ruruHTML } = require('ruru/server');

const { loadFilesSync } = require('@graphql-tools/load-files');
const { makeExecutableSchema } = require('@graphql-tools/schema');

const typesArray = loadFilesSync(["./products/products.graphql", "./orders/orders.graphql"]);
const resolversArray = loadFilesSync(["./products/products.resolvers.js", "./orders/orders.resolvers.js"]);

const schema = makeExecutableSchema({
    typeDefs: typesArray,
    resolvers: resolversArray
});

const app = express();

app.use('/graphql', createHandler({ schema: schema }));

app.get('/', (_req, res) => {
    res.type('html');
    res.end(ruruHTML({ endpoint: '/graphql' }));
});

const PORT = 4000;

app.listen(PORT, () => {
    console.log(`Running our GraphQL Server on PORT ${PORT}`);
});