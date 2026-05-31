const path = require('path');

const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@as-integrations/express5');
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');

const http = require('http');
const express = require('express');

const { loadFilesSync } = require('@graphql-tools/load-files');
const { makeExecutableSchema } = require('@graphql-tools/schema');

const typesArray = loadFilesSync(["./products/products.graphql", "./orders/orders.graphql"]);
const resolversArray = loadFilesSync(["./products/products.resolvers.js", "./orders/orders.resolvers.js"]);

async function startApolloServer() {
    const PORT = 4000;    
    const app = express();

    // BUILD GRAPHQL SERVER
    const httpServer = http.createServer(app);

    const schema = makeExecutableSchema({
        typeDefs: typesArray,
        resolvers: resolversArray
    });

    const server = new ApolloServer({
        schema: schema,
        plugins: [ApolloServerPluginDrainHttpServer({httpServer})],
    });

    // START GRAPHQL SERVER
    await server.start();

    // ADD SERVER TO EXPRESS MIDDLEWARE
    app.use('/graphql',
        express.json(),
        expressMiddleware(server),
    );
    
    // SET UP SERVER
    httpServer.listen(PORT, () => {
        console.log(`Running our GraphQL Server on PORT ${PORT}`);
    });
}

startApolloServer();


