const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const schema = require('./schema');
const mongoose = require('mongoose');

// The root provides a resolver function for each API endpoint
const root = {
    hello: () => {
        return 'Hello World!';
    },
};

const app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

app.listen(process.env.PORT || 3000, () => {
    console.log(`Listening on port: ${process.env.PORT || 3000}`);
});
