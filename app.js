const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const schema = require('./schema');
const mongoose = require('mongoose');
require('dotenv').config();

const mongodbOptions = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
};

mongoose.connect(process.env.MONGO_URI || 'localhost:27017/test', mongodbOptions, (err) => {
    if (err) {
        console.error('Unable to connect to MongoDB');
    } else {
        console.log('Connected to MongoDB');
    }
});

const app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
}));

app.listen(process.env.PORT || 3000, () => {
    console.log(`Listening on port: ${process.env.PORT || 3000}`);
});
